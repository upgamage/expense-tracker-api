import app from "./app.js";

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Expense Tracker API running on port ${PORT}`);
});