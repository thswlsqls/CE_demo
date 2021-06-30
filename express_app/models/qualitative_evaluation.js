const mongoose = require('mongoose');
const types = mongoose.Schema.Types;

const qualEvalSchema = mongoose.Schema({

    qualEvalCodeId: {
        type:types.ObjectId
    },
    qualEvalCode:{
        type:types.String
    },
    companyId: {
        type:types.ObjectId
    },
    companyCode:{
        type:types.String
    },
    writerId: {
        type:types.ObjectId
    },
    date: {
        type: types.Date
    },
    companyName: {
        type:types.String
    },
    history: {
        type: types.String,
        maxlength: 40
    },
    details: {
        type: types.String,
        maxlength: 255
    },
    writer:{
        type: types.String,
        maxlength: 40
    },
    createDate: {
        type: types.Date
    }
    
}, {timestamps: true})

const QualEval = mongoose.model('QualEval', qualEvalSchema);
module.exports = {QualEval}
