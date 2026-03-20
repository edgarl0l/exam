import React, { useState } from "react";

const API = "http://localhost:5000";

function Reports() {
    const [token, setToken] = useState("");
    const [sheetId, setSheetId] = useState("");
    const [range, setRange] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [result, setResult] = useState("");

    const generate = async () => {
        const r = await fetch(`${API}/api/reports/daily`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, sheetId, range, title, date })
        });
        const data = await r.json();
        setResult(data.id);
    };

    return (
        <div>
            <h2>Создание отчёта</h2>

            <div className="form">
                <input
                    placeholder="Google Access Token"
                    value={token}
                    onChange={e => setToken(e.target.value)}
                />
                <input
                    placeholder="ID Google Sheets"
                    value={sheetId}
                    onChange={e => setSheetId(e.target.value)}
                />
                <input
                    placeholder="Диапазон (например: Лист1!A1:D100)"
                    value={range}
                    onChange={e => setRange(e.target.value)}
                />
                <input
                    placeholder="Название отчёта"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <input
                    placeholder="Дата (YYYY-MM-DD)"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
                <button onClick={generate}>Сформировать отчёт</button>
            </div>

            {result && (
                <div>
                    <h3>Отчёт создан</h3>
                    <p>ID документа: {result}</p>
                </div>
            )}
        </div>
    );
}

export default Reports;
