import prisma from "../lib/client.js";

export const getExpenses = async (req, res) => {
    try {
        const { category, minAmount, maxAmount } = req.query;

        const where = {};

        // Filter by category
        if (category) {
            where.category = category;
        }

        // Filter by minimum amount
        if (minAmount !== undefined) {
            where.amount = {
                ...(where.amount || {}),
                gte: Number(minAmount)
            };
        }

        // Filter by maximum amount
        if (maxAmount !== undefined) {
            where.amount = {
                ...(where.amount || {}),
                lte: Number(maxAmount)
            };
        }

        const expenses = await prisma.expense.findMany({
            where,
            orderBy: {
                date: "desc"
            }
        });

        res.status(200).json(expenses);

    } catch (error) {
        console.error("Error fetching expenses:", error);

        res.status(500).json({
            error: "Failed to fetch expenses"
        });
    }
};

export const getExpenseById = async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id)) {
                return res.status(400).json({
                    error: "Invalid expense ID"
                });
}

        


        const expense = await prisma.expense.findUnique({
            where: {
                id: id
            }
        });

        if (!expense) {
            return res.status(404).json({
                error: "Expense not found"
            });
        }

        res.json(expense);
    } catch (error) {
        console.error("Error fetching expense:", error);

        res.status(500).json({
            error: "Failed to fetch expense"
        });
    }
};

export const createExpense = async (req, res) => {
    try {
        const { amount, category, description, date } = req.body;

        // Validate amount
        if (amount === undefined || amount === null || Number(amount) <= 0) {
            return res.status(400).json({
                error: "Amount must be greater than 0"
            });
        }

        // Validate category
        if (!category || category.trim() === "") {
            return res.status(400).json({
                error: "Category is required"
            });
        }

        // Validate date
        const expenseDate = new Date(date);

        if (!date || isNaN(expenseDate.getTime())) {
            return res.status(400).json({
                error: "A valid date is required"
            });
        }

        const expense = await prisma.expense.create({
            data: {
                amount: Number(amount),
                category: category.trim(),
                description,
                date: expenseDate
            }
        });

        res.status(201).json(expense);

    } catch (error) {
        console.error("Error creating expense:", error);

        res.status(500).json({
            error: "Failed to create expense"
        });
    }
};


export const updateExpense = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const { amount, category, description, date } = req.body;

        // Validate ID
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: "Invalid expense ID"
            });
        }

        // Validate amount
        if (amount === undefined || amount === null || Number(amount) <= 0) {
            return res.status(400).json({
                error: "Amount must be greater than 0"
            });
        }

        // Validate category
        if (!category || category.trim() === "") {
            return res.status(400).json({
                error: "Category is required"
            });
        }

        // Validate date
        const expenseDate = new Date(date);

        if (!date || isNaN(expenseDate.getTime())) {
            return res.status(400).json({
                error: "A valid date is required"
            });
        }

        const expense = await prisma.expense.update({
            where: {
                id
            },
            data: {
                amount: Number(amount),
                category: category.trim(),
                description,
                date: expenseDate
            }
        });

        res.status(200).json(expense);

    } catch (error) {
        console.error("Error updating expense:", error);

        if (error.code === "P2025") {
            return res.status(404).json({
                error: "Expense not found"
            });
        }

        res.status(500).json({
            error: "Failed to update expense"
        });
    }
};


export const deleteExpense = async (req, res) => {
    try {
        const id = Number(req.params.id);

        await prisma.expense.delete({
            where: {
                id: id
            }
        });

        res.json({
            message: "Expense deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting expense:", error);

        res.status(500).json({
            error: "Failed to delete expense"
        });
    }
};


export const getExpenseSummary = async (req, res) => {
    try {
        const result = await prisma.expense.aggregate({
            _count: {
                id: true
            },
            _sum: {
                amount: true
            }
        });

        res.status(200).json({
            totalExpenses: result._count.id,
            totalAmount: result._sum.amount || 0
        });

    } catch (error) {
        console.error("Error fetching expense summary:", error);

        res.status(500).json({
            error: "Failed to fetch expense summary"
        });
    }
};