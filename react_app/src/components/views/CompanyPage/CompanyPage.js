import React, {  useState, useEffect } from 'react'
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

import * as dateFns from 'date-fns'
import ko from "date-fns/locale/ko"

import CompanyDataGrid from './Data-grid/CompanyDataGrid'

import PostAddIcon from '@material-ui/icons/PostAdd';

import companyInfo from './Data/company'
import qualEvalInfo from './Data/qual_eval_code'
import companyMembers from './Data/company_member'

import Axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(3),
      minWidth: 120,
      width:'60%'
    },
    dialog:{
        display: 'flex',
        flexDirection: 'column',
        alignItems:'center'
    },
    button: {
        margin: theme.spacing(1),
      },
  }));

function CompanyPage() {
    const classes = useStyles();
    registerLocale("ko", ko);

    const [qualEvalCompanyCode, setqualEvalCompanyCode] = useState("")
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date())
    const [open, setOpen] = React.useState(true);
    const [createQualEvalDialogOpen, setcreateQualEvalDialogOpen] = React.useState(false);
    
    const [saveDate, setsaveDate] = React.useState(new Date())
    const [saveCompanyCode, setsaveCompanyCode] = React.useState("")
    const [saveQualEvalCode, setsaveQualEvalCode] = React.useState("")
    const [saveDetails, setsaveDetails] = React.useState("")
    const [saveWriterNo, setsaveWriterNo] = useState("")

    const [companyMemberList, setcompanyMemberList] = useState([])
    const [companyList, setcompanyList] = useState([])
    const [qualEvalCodeList, setqualEvalCodeList] = useState([])
    const [qualEvalList, setqualEvalList] = useState([])

    useEffect(() => {

        Axios.get('/api/qualEval/getMemberList')
        .then(response => {
            if(response.data.success){
                alert('?????? ????????? ???????????????.')
                console.log(`?????? ????????? ??????????????? : ${response.data}`)
                console.log(response.data)
                setcompanyMemberList(response.data.memberList);
            }else{
                alert("?????? ?????? ??????????????? ?????????????????????.")
            }
        });

        Axios.get('/api/qualEval/getCompanyList')
        .then(response => {
            if(response.data.success){
                alert('????????? ????????? ???????????????.')
                console.log(`????????? ????????? ??????????????? : ${response.data}`)
                console.log(response.data)
                setcompanyList(response.data.companyList);
            }else{
                alert("????????? ?????? ??????????????? ?????????????????????.")
            }
        });

        Axios.get('/api/qualEval/getQualEvalCodeList')
        .then(response => {
            if(response.data.success){
                alert('?????????????????? ????????? ???????????????.')
                console.log(`?????????????????? ????????? ??????????????? : ${response.data}`)
                console.log(response.data)
                setqualEvalCodeList(response.data.qualEvalCodeList);
            }else{
                alert("?????????????????? ?????? ??????????????? ?????????????????????.")
            }
        });

        Axios.get('/api/qualEval/getQualEvalList')
        .then(response => {
            if(response.data.success){
                alert('???????????? ????????? ???????????????.')
                console.log(`???????????? ????????? ??????????????? : ${response.data}`)
                console.log(response.data)
                setqualEvalList(response.data.qualEvalList);
            }else{
                alert("???????????? ?????? ??????????????? ?????????????????????.")
            }
        });

    }, [])


    const onChangeDateRange = (dates) => {

        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

      };
    
    const companyToQualEvalHandleChange = (event) => {

        setqualEvalCompanyCode(String(event.target.value) || '')        
    };  

    const saveCompanyCodeHandleChange = (event) => {
        setsaveCompanyCode(String(event.target.value) || '');
    };  

    const saveHistoryHandleChange = (event) => {
        setsaveQualEvalCode(String(event.target.value) || '');
     }

    const saveWriterHandleChange = (event) => {
        setsaveWriterNo(String(event.target.value) || '');
    }

    const saveDetailsHandleChange = (event) => {
        setsaveDetails(String(event.target.value) || '');
    }

    const handleClose = () => {
      setOpen(false);
    };

    const handleSearch = () => {
     
        const variables = {
            companyId : companyList.find((company, index) => company.code === qualEvalCompanyCode)._id,
            startDate : startDate,
            endDate : endDate
        }

        Axios.post('/api/qualEval/getSearchedQualEval', variables)
        .then(response => {
            if(response.data.success){
                alert('??????????????? ??????????????? ??????????????????.')
                setqualEvalList(response.data.searchedQualEvalDoc);
                console.log(response.data);
            }else{
                alert('???????????? ????????? ??????????????????.')
                console.log(response.data.err);
            }
        })

    }
    
    const onCreateQualEvalClicked = () => {
        setcreateQualEvalDialogOpen(true);
    }

    const createQualEvalDialogHandleClose = () => {
        setcreateQualEvalDialogOpen(false);
    }

    const createQualEvalDialogHandleSave = () => {
        const variables = {
            qualEvalCodeId: qualEvalCodeList.find((qualEvalCode,index) => qualEvalCode.code === saveQualEvalCode)._id,
            qualEvalCode: saveQualEvalCode,
            companyId: companyList.find((company, index) => company.code === saveCompanyCode)._id,
            companyCode : saveCompanyCode,
            writerId: companyMemberList.find((member, index)=> member.no === saveWriterNo)._id,
            date : saveDate,
            companyName: companyList.find((company,index) => company.code === saveCompanyCode).name,
            history: qualEvalCodeList.find((qualEval,index) => qualEval.code === saveQualEvalCode).history,
            details: saveDetails,
            writer: companyMembers.find((member, index) => member.no === saveWriterNo).name
        }

        // \n?????? : ${variables.date}
        // alert(`???????????? ??????
        //     \n??????????????????????????? : ${variables.qualEvalCodeId}
        //     \n?????????????????? : ${variables.qualEvalCode}
        //     \n?????????????????? : ${variables.companyId}
        //     \n??????????????? : ${variables.companyCode}
        //     \n?????????????????? : ${variables.writerId}
        //     \n?????? : ${dateFns.format(saveDate, "yyyy??? MM??? dd???")}
        //     \n?????? : ${saveDate},
        //     \n??????????????? : ${variables.companyCode}
        //     \n??????????????? : ${variables.companyName}
        //     \n??????(??????) : ${variables.history}
        //     \n???????????? : ${variables.details}
        //     \n????????? : ${variables.writer}`)

        Axios.post('/api/qualEval/createQualEval', variables)
        .then(response => {
            if(response.data.success){
                alert('??????????????? ??????????????? ??????????????????.')
                console.log(response.data);
            }else{
                alert('???????????? ????????? ??????????????????.')
                console.log(response.data.err);
            }
        })
        
        console.log(dateFns.format(saveDate, "yyyy??? MM??? dd???"))
    }

    const renderSearchCompanyMenuItem = companyInfo.map((company, index) => {
        return (
            <MenuItem value={company.code}>{`${company.code} : ${company.name}`}</MenuItem>
        )
    })

    const renderCompanyMenuItem = companyInfo.map((company, index) => {
        return (
            <MenuItem value={company.code}>{`${company.code} : ${company.name}`}</MenuItem>
        )
    })

    const renderQualEvalInfoMenuItem = qualEvalInfo.map((qualEval, index) =>{
        return (
            <MenuItem value={qualEval.code}>{`${qualEval.code} : ${qualEval.history}`}</MenuItem>
        )
    })

    const renderCompanyMemberMenuItem = companyMembers.map((member, index) =>{
        return (
            <MenuItem value={member.no}>{`${member.no} : ${member.name}`}</MenuItem>
        )
    })

    return (
        <div>
            <Dialog  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">?????? ??????</DialogTitle>
                <DialogContent >
                <DialogContentText>
                    ???????????? ???????????? ????????? ?????? ????????? ??????????????????.
                </DialogContentText>
                <div className={classes.dialog}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-dialog-select-label">?????????</InputLabel>
                        <Select
                            labelId="demo-dialog-select-label"
                            id="demo-dialog-select"
                            value={qualEvalCompanyCode}
                            onChange={companyToQualEvalHandleChange}
                            input={<Input />}
                        >
                            <MenuItem value="">
                            <em>????????? ??????</em>
                            </MenuItem>

                            {renderSearchCompanyMenuItem}
                            
                        </Select>
                    </FormControl>
                    <DatePicker    
                        locale="ko"
                        selected={startDate}
                        onChange={onChangeDateRange}
                        startDate={startDate}
                        endDate={endDate}
                        useWeekdaysShort={true}
                        selectsRange
                        inline
                />
                </div>
                </DialogContent>  
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSearch} color="primary">
                    Search
                </Button>
                </DialogActions>
            </Dialog>

            <div id="flexCol_Container_CompanyDataGrid_And_Buttons" style={{display:'flex', flexDirection:'column'}}>
                <CompanyDataGrid qualEvalList={qualEvalList}/>
                <div id="flexRow_Container_Buttons_inline" style={{display:'flex', flexDirection:'row', justifyContent:'center'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<PostAddIcon />}
                        onClick={()=>onCreateQualEvalClicked()}
                    >
                        ?????? ???????????? ????????????
                    </Button>

                    {
                        createQualEvalDialogOpen === true && 
                        <Dialog open={createQualEvalDialogOpen} onClose={createQualEvalDialogHandleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">?????? ???????????? ??????</DialogTitle>
                            <DialogContent>
                            <DialogContentText>
                                ???????????? ??????????????? ??????, ?????????, ??????(??????), ???????????? ???????????? ??????????????? ??????????????????. 
                            </DialogContentText>
                            <div className={classes.dialog}>
                                <DatePicker    
                                        locale="ko"
                                        selected={saveDate}
                                        onChange={(date)=> setsaveDate(date)}
                                        useWeekdaysShort={true}
                                        inline
                                />
                                <FormControl className={classes.formControl}>
                                    <InputLabel style={{position:"relative", marginTop:"8px"}} id="companyCode">?????????</InputLabel>
                                    <Select
                                        labelId="demo-dialog-select-label"
                                        id="demo-dialog-select"
                                        value={saveCompanyCode}
                                        onChange={saveCompanyCodeHandleChange}
                                        input={<Input />}
                                    >
                                        <MenuItem value="">
                                        <em>company</em>
                                        </MenuItem>

                                        {renderCompanyMenuItem}
                                            
                                        </Select>
                                        <InputLabel style={{position:"relative", marginTop:"8px"}} id="history">??????(??????)</InputLabel>
                                        <Select
                                            labelId="demo-dialog-select-label"
                                            id="demo-dialog-select"
                                            value={saveQualEvalCode}
                                            onChange={saveHistoryHandleChange}
                                            input={<Input />}
                                        >
                                            <MenuItem value="">
                                            <em>history</em>
                                            </MenuItem>

                                            {renderQualEvalInfoMenuItem}
                                            
                                        </Select>
                                        <InputLabel style={{position:"relative", marginTop:"8px"}} id="writer">?????????</InputLabel>
                                        <Select
                                            labelId="demo-dialog-select-label"
                                            id="demo-dialog-select"
                                            value={saveWriterNo}
                                            onChange={saveWriterHandleChange}
                                            input={<Input />}
                                        >
                                            <MenuItem value="">
                                            <em>writer</em>
                                            </MenuItem>

                                            {renderCompanyMemberMenuItem}
                                            
                                        </Select>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="details"
                                            label="?????? ??????"
                                            type="text"
                                            fullWidth
                                            multiline="true"
                                            value={saveDetails}
                                            onChange={saveDetailsHandleChange}
                                        />
                                    </FormControl>
                                </div>
                            </DialogContent>
                            <DialogActions>
                            <Button onClick={createQualEvalDialogHandleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={createQualEvalDialogHandleSave} color="primary">
                                Save
                            </Button>
                            </DialogActions>
                        </Dialog>
                    }
                </div>
            </div>
        </div>
    )
}

export default withRouter(CompanyPage)
