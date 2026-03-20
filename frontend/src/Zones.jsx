import React, { useEffect, useState } from "react";

const API = "http://localhost:5000";

function Zones() {
    const [zones, setZones] = useState([]);
    const [name, setName] = useState("");
    const [polygon, setPolygon] = useState("");

    const load = async () => {
        const r = await fetch(`${API}/api/zones`);
        const data = await r.json();
        setZones(data);
    };

    const create = async () => {
        await fetch(`${API}/api/zones`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                polygon
            })
        });
        setName("");
        setPolygon("");
        load();
    };

    const remove = async id => {
        await fetch(`${API}/api/zones/${id}`, {
            method: "DELETE"
        });
        load();
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <div>
            <h2>Зоны</h2>

            <div className="form">
                <input
                    placeholder="Название зоны"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <textarea
                    placeholder='Polygon в формате GeoJSON, например: {"type":"Polygon","coordinates":[[[30.1,55.2],[30.2,55.3],[30.3,55.2],[30.1,55.2]]]}'
                    value={polygon}
                    onChange={e => setPolygon(e.target.value)}
                />
                <button onClick={create}>Создать</button>
            </div>

            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Полигон</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {zones.map(z => (
                    <tr key={z.Id}>
                        <td>{z.Id}</td>
                        <td>{z.Name}</td>
                        <td>{z.Polygon}</td>
                        <td>
                            <button onClick={() => remove(z.Id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Zones;
