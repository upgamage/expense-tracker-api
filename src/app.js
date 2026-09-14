import express from "express";
import cors from "cors";
import expenseRouter from "./routes/expense.routes.js";

const app = express();

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Request logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Root route
app.get("/", (req, res) => {
    res.json({
        message: "Expense Tracker API is running"
    });
});

// Expense routes
app.use("/api/expenses", expenseRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        error: "Internal server error"
    });
});

export default app;