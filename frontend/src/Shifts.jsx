import React, { useEffect, useState } from "react";

const API = "http://localhost:5000";

function Shifts() {
    const [shifts, setShifts] = useState([]);
    const [userId, setUserId] = useState("");
    const [zoneId, setZoneId] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const load = async () => {
        const r = await fetch(`${API}/api/shifts`);
        const data = await r.json();
        setShifts(data);
    };

    const create = async () => {
        await fetch(`${API}/api/shifts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, zoneId, start, end })
        });
        setUserId("");
        setZoneId("");
        setStart("");
        setEnd("");
        load();
    };

    const remove = async id => {
        await fetch(`${API}/api/shifts/${id}`, { method: "DELETE" });
        load();
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <div>
            <h2>Дежурства</h2>

            <div className="form">
                <input
                    placeholder="ID пользователя"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                />
                <input
                    placeholder="ID зоны"
                    value={zoneId}
                    onChange={e => setZoneId(e.target.value)}
                />
                <input
                    placeholder="Начало (ISO)"
                    value={start}
                    onChange={e => setStart(e.target.value)}
                />
                <input
                    placeholder="Конец (ISO)"
                    value={end}
                    onChange={e => setEnd(e.target.value)}
                />
                <button onClick={create}>Создать дежурство</button>
            </div>

            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>UserId</th>
                    <th>ZoneId</th>
                    <th>Начало</th>
                    <th>Конец</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {shifts.map(s => (
                    <tr key={s.Id}>
                        <td>{s.Id}</td>
                        <td>{s.UserId}</td>
                        <td>{s.ZoneId}</td>
                        <td>{s.StartTime}</td>
                        <td>{s.EndTime}</td>
                        <td>
                            <button onClick={() => remove(s.Id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Shifts;
