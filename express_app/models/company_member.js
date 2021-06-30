const mongoose = require('mongoose');
const types = mongoose.Schema.Types;

const companyMemberSchema = mongoose.Schema({
    no: {
        type: types.String,
        maxlength: 20
    },
    name: {
        type: types.String,
        maxlength:40
    }
})

const CompanyMember = mongoose.model('CompanyMember', companyMemberSchema);
module.exports = {CompanyMember}
