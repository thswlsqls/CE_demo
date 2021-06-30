const mongoose = require('mongoose');
const types = mongoose.Schema.Types;

const expenseSchema = mongoose.Schema({

    companyId: {
        type:types.ObjectId
    },
    expenseId: {
        type:types.ObjectId
    },
    code: {
        type: types.String,
        maxlength:40
    },
    month: {
        type: types.String,
        maxlength: 20
    },
    day: {
        type: types.String,
        maxlength: 20
    },
    history: {
        type: types.String,
        maxlength:255
    },
    price: {
        type: types.Number
    },
    createDate: {
        type: types.Date
    }
    
}, {timestamps: true})

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = {Expense}
