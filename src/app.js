import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Expense Tracker API is running"
    });
});


app.get("/api/health", (req, res) => {
    res.json({
        status: "ok"
    });
});


export default app;