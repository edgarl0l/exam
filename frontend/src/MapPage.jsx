import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
const API = "http://localhost:5000";
mapboxgl.accessToken = "ТВОЙ_MAPBOX_TOKEN";
useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [30.2, 55.2],
        zoom: 10
    });

    const draw = new MapboxDraw({
        displayControlsDefault: false,
        controls: { polygon: true, trash: true }
    });

    map.current.addControl(draw);

    map.current.on("draw.create", e => {
        const poly = e.features[0].geometry;
        addZone(poly);
    });

    map.current.on("load", loadZones);
}, []);
function MapPage() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zones, setZones] = useState([]);

    const loadZones = async () => {
        const r = await fetch(`${API}/api/map/zones`);
        const data = await r.json();
        setZones(data.features || []);
    };

    const removeZone = async id => {
        await fetch(`${API}/api/map/zones/${id}`, { method: "DELETE" });
        loadZones();
    };

    const addZone = async polygon => {
        await fetch(`${API}/api/map/zones`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: "Новая зона",
                geometry: polygon
            })
        });
        loadZones();
    };

    useEffect(() => {
        if (map.current) return;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [30.2, 55.2],
            zoom: 10
        });

        map.current.on("load", () => {
            loadZones();
        });

        map.current.on("click", e => {
            const coords = e.lngLat;
            const polygon = {
                type: "Polygon",
                coordinates: [[[coords.lng, coords.lat], [coords.lng + 0.01, coords.lat], [coords.lng, coords.lat + 0.01], [coords.lng, coords.lat]]]
            };
            addZone(polygon);
        });
    }, []);

    useEffect(() => {
        if (!map.current) return;

        if (map.current.getSource("zones")) {
            map.current.getSource("zones").setData({
                type: "FeatureCollection",
                features: zones
            });
        } else {
            map.current.addSource("zones", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: zones
                }
            });

            map.current.addLayer({
                id: "zones-fill",
                type: "fill",
                source: "zones",
                paint: {
                    "fill-color": "#088",
                    "fill-opacity": 0.4
                }
            });

            map.current.addLayer({
                id: "zones-outline",
                type: "line",
                source: "zones",
                paint: {
                    "line-color": "#000",
                    "line-width": 2
                }
            });
        }
    }, [zones]);

    return (
        <div>
            <h2>Карта зон</h2>
            <p>Клик по карте — создать новую зону. Нажми на зону — удалить.</p>

            <div
                ref={mapContainer}
                style={{ width: "100%", height: "600px", borderRadius: "8px" }}
            ></div>
        </div>
    );
}

export default MapPage;
