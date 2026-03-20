import React, { useEffect, useState } from "react";

const API = "http://localhost:5000";

function Tracks() {
    const [tracks, setTracks] = useState([]);
    const [date, setDate] = useState("");
    const [zoneId, setZoneId] = useState("");
    const [animal, setAnimal] = useState("");
    const [count, setCount] = useState("");

    const load = async () => {
        const r = await fetch(`${API}/api/tracks`);
        const data = await r.json();
        setTracks(data);
    };

    const create = async () => {
        await fetch(`${API}/api/tracks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ date, zoneId, animal, count })
        });
        setDate("");
        setZoneId("");
        setAnimal("");
        setCount("");
        load();
    };

    const remove = async id => {
        await fetch(`${API}/api/tracks/${id}`, { method: "DELETE" });
        load();
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <div>
            <h2>Следы животных</h2>

            <div className="form">
                <input
                    placeholder="Дата (YYYY-MM-DD)"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
                <input
                    placeholder="ID зоны"
                    value={zoneId}
                    onChange={e => setZoneId(e.target.value)}
                />
                <input
                    placeholder="Животное"
                    value={animal}
                    onChange={e => setAnimal(e.target.value)}
                />
                <input
                    placeholder="Количество следов"
                    value={count}
                    onChange={e => setCount(e.target.value)}
                />
                <button onClick={create}>Добавить</button>
            </div>

            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Дата</th>
                    <th>Зона</th>
                    <th>Животное</th>
                    <th>Кол-во</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {tracks.map(t => (
                    <tr key={t.Id}>
                        <td>{t.Id}</td>
                        <td>{t.Date}</td>
                        <td>{t.ZoneId}</td>
                        <td>{t.Animal}</td>
                        <td>{t.Count}</td>
                        <td>
                            <button onClick={() => remove(t.Id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Tracks;
