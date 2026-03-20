import React, { useEffect, useState } from "react";

const API = "http://localhost:5000";

function PendingUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const load = async () => {
        setLoading(true);
        const r = await fetch(`${API}/api/users/pending`);
        const data = await r.json();
        setUsers(data);
        setLoading(false);
    };

    const confirm = async id => {
        await fetch(`${API}/api/users/confirm/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: "{}"
        });
        load();
    };

    const remove = async id => {
        await fetch(`${API}/api/users/${id}`, {
            method: "DELETE"
        });
        load();
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <div>
            <h2>Ожидающие подтверждения</h2>

            {loading && <p>Загрузка...</p>}

            {!loading && users.length === 0 && (
                <p>Нет пользователей в ожидании.</p>
            )}

            {!loading && users.length > 0 && (
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Имя</th>
                        <th>Подтверждён</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(u => (
                        <tr key={u.Id}>
                            <td>{u.Id}</td>
                            <td>{u.Email}</td>
                            <td>{u.Name}</td>
                            <td>{u.IsConfirmed ? "Да" : "Нет"}</td>
                            <td>
                                <button onClick={() => confirm(u.Id)}>Подтвердить</button>
                                <button onClick={() => remove(u.Id)}>Удалить</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default PendingUsers;
