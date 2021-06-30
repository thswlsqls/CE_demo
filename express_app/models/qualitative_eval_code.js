const mongoose = require('mongoose');
const types = mongoose.Schema.Types;

const qualEvalCodeSchema = mongoose.Schema({
    
    code: {
        type:types.String,
        maxlength:40
    },
    history: {
        type: types.String,
        maxlength:255
    }
    
})

const QualEvalCode = mongoose.model('QualEvalCode', qualEvalCodeSchema);
module.exports = {QualEvalCode}

