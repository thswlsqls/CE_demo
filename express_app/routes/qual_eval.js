const express = require('express')
const router = express.Router();
const startOfDay = require('date-fns/startOfDay')
const endOfDay = require('date-fns/endOfDay')

const { QualEval } = require("../models/qualitative_evaluation");
const { CompanyMember } = require("../models/company_member")
const { Company } = require("../models/company")
const { QualEvalCode } = require("../models/qualitative_eval_code")

const mongoose = require('mongoose')

// companyMember
router.get('/getMemberList', (req, res) =>{

    CompanyMember.find()
        .exec((err, memberList)=>{
            if(err) return res.status(400).send(err);
            res.status(200).json({ success:true, memberList : memberList})
        })
        
})

router.post('/createCompanyMember', (req, res) =>{

    const companyMember = new  CompanyMember(req.body);

    companyMember.save((err, companyMemberDoc) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true, companyMemberDoc: companyMemberDoc })
    });    
})

// company
router.get('/getCompanyList', (req, res) =>{

    Company.find()
        .exec((err, companyList)=>{
            if(err) return res.status(400).send(err);
            res.status(200).json({ success:true, companyList : companyList})
        })
        
})

router.post('/createCompany', (req, res) =>{

    const company = new  Company(req.body);

    company.save((err, companyDoc) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true, companyDoc: companyDoc })
    });    
})

// qualEvalCode
router.get('/getQualEvalCodeList', (req, res) =>{

    QualEvalCode.find()
        .exec((err, qualEvalCodeList)=>{
            if(err) return res.status(400).send(err);
            res.status(200).json({ success:true, qualEvalCodeList : qualEvalCodeList})
        })
        
})

router.post('/createQualEvalCode', (req, res) =>{

    const qualEvalCode = new  QualEvalCode(req.body);

    qualEvalCode.save((err, qualEvalCodeDoc) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true, qualEvalCodeDoc: qualEvalCodeDoc })
    });    
    
})

// qualEval
router.post('/createQualEval', (req, res) =>{

    const qualEval = new  QualEval(req.body);

    qualEval.save((err, qualEvalDoc) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true, qualEvalDoc: qualEvalDoc })
    });    
    
})

router.get('/getQualEvalList', (req, res) =>{

    QualEval.find()
        .exec((err, qualEvalList)=>{
            if(err) return res.status(400).send(err);
            res.status(200).json({ success:true, qualEvalList : qualEvalList})
        })
        
})


router.post('/getSearchedQualEval', (req, res) =>{

    console.log(req.body);
    const companyId = mongoose.Types.ObjectId(req.body.companyId)

    QualEval.find({
        $and: [ { 
                      "date": 
                            {
                            $gte : startOfDay(new Date(req.body.startDate)),
                            $lte: endOfDay(new Date(req.body.endDate))
                            }
                      }, 
                      {
                        "companyId" : companyId
                      } ]
    })
        .exec((err, searchedQualEvalDoc) => {
        if(err) return res.json({ success: false, err })
        return res.status(200).json({ success: true, searchedQualEvalDoc: searchedQualEvalDoc })
    });    
    
})

router.post('/updateQualEval', (req, res) =>{

    QualEval.findByIdAndUpdate(req.body._id, {$set: req.body}, {new: true},  (err, doc) => {
        if(err) return res.json({ success: false, err: err })
        return res.status(200).json({ success: true, doc: doc })
    });    
})

router.post('/deleteQualEval', (req, res) =>{

    QualEval.findByIdAndDelete(req.body._id, {$set: req.body}, (err, doc) => {
        if(err) return res.json({ success: false, err: err })
        return res.status(200).json({ success: true, doc: doc })
    });    
})



module.exports = router;