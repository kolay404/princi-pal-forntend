import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import RecordsRow from './RecordsRow';
import TableHeader from './TableHeader';
import { RecordsProvider } from '../../Context/RecordsProvider'

function RecordsTable(props) {
  /*const [rows, setRows] = useState([
    {
      id: 1,
      date: 'oten',
      details_code: 'testing',
      details: 'testing',
      lastUpdated: 'testing',
      hours: 'testing',
      amount: 100
    },
    {
      id: 2,
      date: 'oten',
      details_code: 'boto',
      details: 'testing',
      lastUpdated: 'testing',
      hours: 'testing',
      amount: 150
    }
  ]);

  const appendRow = (newRow) => {
    setRows(prevRows => [...prevRows, newRow]);
  };
  
  let rows = [
    {
      id: 1,
      date: 'oten',
      details_code: 'testing',
      details: 'testing',
      lastUpdated: 'testing',
      hours: 'testing',
      amount: 100
    },
    {
      id: 2,
      date: 'oten',
      details_code: 'boto',
      details: 'testing',
      lastUpdated: 'testing',
      hours: 'testing',
      amount: 150
    }
  ]*/

  const columns = [
    { id: 'id', label: 'Id', minWidth: 50, maxWidth: 50 },
    {
      id: 'date',
      label: 'Date',
      minWidth: 70,
      maxWidth: 70,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'details_code',
      label: 'Details Code',
      minWidth: 150,
      maxWidth: 150,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'details',
      label: 'Details',
      minWidth: 200,
      maxWidth: 200,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'amount',
      label: 'Amount',
      minWidth: 150,
      maxWidth: 150,
      align: 'left',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];

  const handleChangePage = (event, newPage) => {
    console.log('wahaha')
  };

  const handleChangeRowsPerPage = (event) => {
    console.log('wahaha')
  };

  return (
    <RecordsProvider>
      <Paper sx={styles.container}>
        <TableHeader />
        <TableContainer sx={styles.tableContainer}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      ...styles.column,
                      minWidth: column.minWidth,
                      maxWidth: column.maxWidth,
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <RecordsRow
                page={0}
                rowsPerPage={4}
                columns={columns}
                text={""} />
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[4, 10, 25, 100]}
          component="div"
          count={1} //to edit
          rowsPerPage={1}
          page={0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </RecordsProvider>
  );
}

const styles = {
  container: {
    width: '70%',
    overflow: 'hidden',
    padding: "10px",
    paddingTop: "20px"
  },
  tableContainer: {
    maxHeight: 440,
    fontFamily: "Mulish-Regular"
  },
  column: {
    fontFamily: "Mulish-Regular",
    fontWeight: "bold",
    color: "#9FA2B4"
  },
  fontStyling: {
    fontFamily: "Mulish-Regular",
    fontWeight: "bold",
    color: "#808080",
    float: "left",
    fontSize: "16.5px",
    paddingTop: "3px"
  },
  inputStyling: {
    fontFamily: "Mulish-Regular",
    float: "left",
    fontWeight: "bold",
    fontSize: "18px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "transparent",
    outline: "none",
    height: "30px",
    width: "316px",
    padding: "5px",
    marginLeft: "20px",
    marginBottom: "7px"
  }
}

export default RecordsTable;