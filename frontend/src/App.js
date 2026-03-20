import React, { useState } from "react";
import PendingUsers from "./PendingUsers";
import Zones from "./Zones";
import Shifts from "./Shifts";
import Tracks from "./Tracks";
import Reports from "./Reports";
import MapPage from "./MapPage";
import "./App.css";

function App() {
    const [page, setPage] = useState("pending");

    return (
        <div className="app">
            <header className="header">
                <h1>Панель управления</h1>
                <nav className="nav">
                    <button onClick={() => setPage("pending")}>Ожидающие пользователи</button>
                    <button onClick={() => setPage("zones")}>Зоны</button>
                    <button onClick={() => setPage("shifts")}>Дежурства</button>
                    <button onClick={() => setPage("tracks")}>Следы</button>
                    <button onClick={() => setPage("reports")}>Отчёты</button>
                    <button onClick={() => setPage("map")}>Карта</button>
                </nav>
            </header>

            <main className="content">
                {page === "pending" && <PendingUsers />}
                {page === "zones" && <Zones />}
                {page === "shifts" && <Shifts />}
                {page === "tracks" && <Tracks />}
                {page === "reports" && <Reports />}
                {page === "map" && <MapPage />}
            </main>
        </div>
    );
}

export default App;
