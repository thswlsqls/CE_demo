import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';

import * as dateFns from 'date-fns'

import Axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';

import DeleteIcon from '@material-ui/icons/Delete';
// import SaveIcon from '@material-ui/icons/Save';

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

export default function DataGridDemo(props) {

  const classes = useStyles();
const [selectedRows, setselectedRows] = useState([])

    const rowsFromData = props.qualEvalList.map((row, index)=> {
        return {
            id: row._id,
            date: dateFns.format(new Date(row.date), "yyyy년 MM월 dd일"),
            companyCode: row.companyCode, 
            companyName: row.companyName, 
            history: row.history, 
            details: row.details, 
            writer:row.writer 
        }
    })

  const columns = [
    { 
       field: 'date', 
       headerName: '일자', 
       width:150, 
     },
    {
      field: 'companyCode',
      headerName: '사업장 코드',
      width:180,
      editable: true,
    },
    {
      field: 'companyName',
      headerName: '사업장 이름',
      width:180,
      editable: true,
    },
    {
      field: 'history',
      headerName: '구분',
      type: 'string',
      width:180,
      editable: true,
    },
    {
      field: 'details',
      headerName: '세부내역',
      type: 'string',
      width:300,
      editable: true,
    },
    {
      field: 'writer',
      headerName: '작성자',
      type: 'string',
      width:120,
      editable: true,
    },
  ];
  
  // const rows = [
  //   { id: 1, date: "date", code: '01', companyName: "삼성", history:"납기지연", details:"발주 누락에 따른 생산계획 변경", writer:"홍길동" },
  //   { id: 2, date: "vDate", code: '02', companyName: "한화", history:"품질불량", details:"마감 처리 미흡 및 일부 파손", writer:"홍길동" },
  //   { id: 3, date: '2021년 06월 23일', code: '03', companyName: "한화", history:"대응불량", details:"고객 대기시간 증가하여 조치 필요", writer:"남혁우" },
  //   { id: 4, date: '2021년 06월 23일', code: '02', companyName: "농심", history:"품질불량", details:"불량률이 기준치 초과하여 주의 요함", writer:"남혁우" },
  // ];

  const onDeleteQualEvalClicked = () => {

    console.log(selectedRows)
    selectedRows.forEach((selectedRowId, index) => {

          const variables = {
            _id : selectedRowId
          }

          Axios.post('/api/qualEval/deleteQualEval', variables)
          .then(response => {
              if(response.data.success){
                  alert('정성평가를 성공적으로 삭제했습니다.')
                  console.log(response.data);
              }else{
                  alert('정성평가 삭제에 실패했습니다.')
                  console.log(response.data.err);
              }
          })
    })
  }

  const onUpdateQualEvalClicked = () => {

    console.log(selectedRows)
    selectedRows.forEach((selectedRowId, index) => {

          const variables = {
            _id : selectedRowId
          }

          Axios.post('/api/qualEval/updateQualEval', variables)
          .then(response => {
              if(response.data.success){
                  alert('정성평가를 성공적으로 수정했습니다.')
                  console.log(response.data);
              }else{
                  alert('정성평가 수정에 실패했습니다.')
                  console.log(response.data.err);
              }
          })
    })

  }

  return (
    <div style={{ overflow: 'scroll', height: 400, width: '100%' }}>
      <DataGrid
        rows={rowsFromData}
        columns={columns}
        pdetailsSize={5}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(e)=>setselectedRows(e.selectionModel)}
        // onSelectionModelChange={(e)=>console.log(e.selectionModel)}
     
      />

        <Button
            variant="outlined"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={()=>onDeleteQualEvalClicked()}
        >
            행 삭제
        </Button>
        {/* <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<SaveIcon />}
            onclick={()=>onUpdateQualEvalClicked()}
            // 선택한 행, 혹은 전체 행의 모든 속성을 포함하는 Object를 어떻게 얻는가?
        >
            저장하기
        </Button>  */}
    </div>
  );
}
