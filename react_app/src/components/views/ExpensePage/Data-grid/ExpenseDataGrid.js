import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

import expense from '../Data/expense'


export default function DataGridDemo() {

  const [date, setdate] = React.useState("2021년 06월 30일")
  const vDate = "2021년 06월 28일"  
  
  const rowsFromData = expense.map((row, index)=> {
    return {
        id: row._id,
        code: row.code, 
        month: row.month, 
        day: row.day, 
        history: row.history, 
        price: row.price
    }
})

  const columns = [
    { 
       field: 'day', 
       headerName: '일자', 
       width:180, 
     },
    {
      field: 'history',
      headerName: '내역',
      width:180,
      editable: true,
    },
    {
      field: 'price',
      headerName: '금액',
      width:180,
      editable: true,
    }
  ];
  
//   const rows = [
//     { id: 1, date: date, code: '01', companyName: "삼성", history:"납기지연", details:"발주 누락에 따른 생산계획 변경", writer:"홍길동" },
//     { id: 2, date: vDate, code: '02', companyName: "한화", history:"품질불량", details:"마감 처리 미흡 및 일부 파손", writer:"홍길동" },
//     { id: 3, date: '2021년 06월 23일', code: '03', companyName: "한화", history:"대응불량", details:"고객 대기시간 증가하여 조치 필요", writer:"남혁우" },
//     { id: 4, date: '2021년 06월 23일', code: '02', companyName: "농심", history:"품질불량", details:"불량률이 기준치 초과하여 주의 요함", writer:"남혁우" },
//   ];

  return (
    <div style={{ overflow: 'scroll', height: 400, width: '100%' }}>
      <DataGrid
        rows={rowsFromData}
        columns={columns}
        pdetailsSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
