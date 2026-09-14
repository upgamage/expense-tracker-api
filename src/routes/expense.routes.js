import express from "express";
import {
    getExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense,
    getExpenseSummary
} from "../controllers/expense.controller.js";

const router = express.Router();

router.get("/", getExpenses);
router.get("/summary", getExpenseSummary);
router.get("/:id", getExpenseById);
router.post("/", createExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

export default router;