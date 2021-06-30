const mongoose = require('mongoose');
const types = mongoose.Schema.Types;

const companySchema = mongoose.Schema({

    code: {
        type: types.String,
        maxlength: 50
    },
    name: {
        type: types.String,
        maxlength:40
    }
    
})

const Company = mongoose.model('Company', companySchema);
module.exports = {Company}
