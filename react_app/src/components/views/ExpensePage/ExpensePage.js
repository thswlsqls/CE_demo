import React from 'react'
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import Select from '@material-ui/core/Select';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import ko from "date-fns/locale/ko"

import moment from 'moment'

import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import PostAddIcon from '@material-ui/icons/PostAdd';
import GridOnIcon from '@material-ui/icons/GridOn';

import { makeStyles } from '@material-ui/core/styles';

import companyInfo from '../CompanyPage/Data/company'
import ExpenseDataGrid from './Data-grid/ExpenseDataGrid'

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
    margin: {
        margin: theme.spacing(1),
      },
  }));

function ExpensePage() {
    const classes = useStyles();
    registerLocale("ko", ko);

    const [company, setCompany] = React.useState('업체명')
    const [startDate, setStartDate] = React.useState(new Date());
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (event) => {
        setCompany(String(event.target.value) || '');
    };  

    const handleSearch = () => {
        alert(`업체명 : ${company}\n적용 월 : ${moment(startDate).format('YYYY년 MM월')}`)
    }

    const renderMenuItem = companyInfo.map((company, index) => {
        return (
            <MenuItem value={company.name}>{company.name}</MenuItem>
        )
    })

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">경비 관리</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    조회하실 사업장의 이름과 적용 월을 선택해주세요.
                </DialogContentText>
                <div className={classes.dialog}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-dialog-select-label">사업장</InputLabel>
                        <Select
                            labelId="demo-dialog-select-label"
                            id="demo-dialog-select"
                            value={company}
                            onChange={handleChange}
                            input={<Input />}
                        >
                            <MenuItem value="">
                            <em>사업장 이름</em>
                            </MenuItem>

                            {renderMenuItem}
                            
                        </Select>
                    </FormControl>
                    <DatePicker    
                        locale="ko"
                        dateFormat="yyyy.MM"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        useWeekdaysShort={true}
                        showMonthYearPicker
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
            <div id="flexCol_Container_FixedSizeGrid_And_Buttons" style={{display:'flex', flexDirection:'column'}}>
                <ExpenseDataGrid/>
                <div id="flexRow_Container_ExcelUpload_and_Buttons_inline" style={{display:'flex', flexDirection:'row', justifyContent:'flex-start'}}>
                    <Button 
                        style={{margin:'8px', minWidth:'135px', height:'36px', backgroundColor:'#4caf50', color:'white', }}
                        variant="contained" 
                        color="primary" 
                        className={classes.margin}
                        startIcon={<GridOnIcon />}
                    >
                    엑셀 업로드
                    </Button>
                    <div id="flexRow_Container_Buttons_inline" style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'flex-end'}}>
                        <Button
                            style={{margin:'8px', height:'36px', minWidth:'105px'}}
                            variant="outlined"
                            color="primary"
                            className={classes.button}
                            startIcon={<PostAddIcon />}
                        >
                            행 추가
                        </Button>
                        <Button
                            style={{margin:'8px', height:'36px', minWidth:'105px'}}
                            variant="outlined"
                            color="secondary"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                        >
                            행 삭제
                        </Button>
                        <Button
                            style={{margin:'8px', height:'36px', minWidth:'115px'}}
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                        >
                            저장하기
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(ExpensePage)
