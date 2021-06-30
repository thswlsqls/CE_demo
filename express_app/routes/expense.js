const express = require('express')
const router = express.Router();
const { Expense } = require("../models/Expense");

router.post('/saveExpense', (req, res) =>{

    const expense = new  Expense(req.body);

    expense.save((err, expense) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true, expense: expense })
    });    
})


module.exports = router;