exports.getTracksFromSheet = async (req, res) => {

    const mockRows = [
        ["2025-03-20", "Лесной участок 1", "Лиса", "3 следа"],
        ["2025-03-20", "Лесной участок 2", "Кабан", "5 следов"]
    ];

    res.json({
        success: true,
        message: "Tracks loaded from Google Sheets (mock)",
        rows: mockRows
    });
};