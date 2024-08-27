import React from 'react';
import {
    Box,
    TextField,
    Typography,
    Button,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Select,
    FormControl,
    MenuItem,
} from '@mui/material';

import { useSchoolContext } from '../../Context/SchoolProvider';
// import { useNavigationContext } from '../../Context/NavigationProvider';

import RestService from '../../Services/RestService';

const columns = [
    {
        id: 'status',
        label: 'Status',
        minWidth: 60,
        maxWidth: 60,
        align: "center",
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'month',
        label: 'Month',
        minWidth: 60,
        maxWidth: 60,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'budget',
        label: 'Budget',
        minWidth: 60,
        maxWidth: 60,
        fontWeight: "bold",
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    }
];

export default function AnnualTab() {
    const { months, year, currentSchool, currentDocument, jev } = useSchoolContext();
    const [documentsByYear, setDocumentsByYear] = React.useState([]);

    React.useEffect(() => {
        const getDocumentsByYear = async () => {
            try {
                if (currentSchool) {
                    const response = await RestService.getDocumentBySchoolIdYear(currentSchool.id, year);
                    if (response) {
                        console.log(response);
                        setDocumentsByYear(response);
                    } else {
                        console.log("Documents not fetched");
                    }
                }
            } catch (error) {
                console.error('Error fetching document:', error);
            }
        }

        getDocumentsByYear();
    }, [currentDocument, year, jev, currentSchool])

    return (
        <React.Fragment>
            <Typography id="modal-modal-description" sx={{ mt: 1, mb: .5 }}>
                Set the budget required or delegated each month of the fiscal year at
                <span style={{ fontWeight: 'bold' }}> {currentSchool?.name}</span>.
            </Typography>
            <Box sx={
                {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 80,
                    width: "100%",
                    borderRadius: 5,
                    border: "1px solid #c7c7c7",
                    mt: 2.5,
                    mb: 2.5,
                    p: 1
                }
            }>
                <FormControl variant="standard" sx={{ m: 2, minWidth: 90 }}>
                    <Select
                        sx={{ fontSize: 13, fontWeight: "bold" }}
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={"test"}
                        // onChange={handleChange}
                        label="Age"
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        <MenuItem value={"test"}>Test</MenuItem>
                        <MenuItem value={"test2"}>Test2</MenuItem>
                        <MenuItem value={"test3"}>Test3</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    variant="standard"
                    // value={column.id === "budget" ? formatNumberDisplay(value, column.id, row.id) : value}
                    inputProps={{
                        inputMode: 'numeric', // For mobile devices to show numeric keyboard
                        pattern: '[0-9]*',    // HTML5 pattern to restrict input to numeric values
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                ₱{/* Replace this with your desired currency symbol */}
                            </InputAdornment>
                        ),
                        style: {
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: "flex-start",
                            fontWeight: "bold",
                            borderRadius: 10,
                            fontSize: 13,
                            height: 30
                        }
                    }}
                // onClick={(event) => handleCellClick(column.id, row.id, event)}
                // onChange={(event) =>
                //     handleInputChange(column.id, row.id, event)
                // }
                // onBlur={() => handleInputBlur(column.id, row.id)}
                // onKeyDown={(e) => {
                //     if (e.key === 'Enter') {
                //         e.preventDefault();
                //         e.target.blur(); // Invoke handleLogin on Enter key press
                //     }
                // }} 
                />
                <Button
                    sx={[styles.button, { fontSize: 13, m: 2, maxHeight: 35 }]}
                    // onClick={() => setConfirmOpen(true)}
                    variant="contained"
                // disabled={!!currentDocument?.cashAdvance}
                >
                    Save
                </Button>
            </Box>
            <TableContainer sx={{ mt: 2, maxHeight: 240 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth,
                                        maxWidth: column.maxWidth,
                                        // backgroundColor: "green",
                                        zIndex: 3,
                                        lineHeight: 1.2,
                                        // padding: "0px",
                                        paddingTop: "7.5px"
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ pt: "20px" }}>
                        {months
                            .map((month, index) => {
                                const uniqueKey = `row_${month}_${index}`;
                                return (
                                    <TableRow key={uniqueKey} hover role="checkbox" tabIndex={-1}>
                                        {columns.map((column) => {
                                            const value = documentsByYear.find(doc => doc.month === month);
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    sx={
                                                        {
                                                            minWidth: column.minWidth,
                                                            maxWidth: column.maxWidth,
                                                            fontSize: column.fontSize,
                                                            padding: 0,
                                                            borderWidth: 0
                                                        }
                                                    }
                                                >
                                                    {column.id === "status" ?
                                                        <Box sx={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            position: "relative",
                                                            height: 50
                                                        }}>
                                                            <Box sx={styles.verticalStep} />
                                                            <Box sx={{
                                                                display: 'flex',
                                                                backgroundColor: value?.budget ? "#00c851" : "#d6d6d6",
                                                                alignItems: 'center',
                                                                color: "white",
                                                                justifyContent: "center",
                                                                borderRadius: 10,
                                                                fontSize: 9,
                                                                height: 25,
                                                                width: 70,
                                                                zIndex: 2
                                                            }}
                                                            >
                                                                {value?.budget ? "Funded" : "Unfundned"}
                                                            </Box>
                                                        </Box>
                                                        :
                                                        column.id === "month" ?
                                                            <Box> {month} </Box>
                                                            :
                                                            <Box>
                                                                ₱ {value?.budget ?? 0}</Box>
                                                    }
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}

const styles = {
    verticalStep: {
        display: "flex",
        backgroundColor: "#d8d8d8",
        flexDirection: "column",
        position: "absolute",
        width: 1.5,
        zIndex: 1,
        height: "100%"
    },
    button: {
        mt: 2,
        borderRadius: '10px',
        width: '160px',
        padding: '10px 0',
        alignSelf: "center",
        backgroundColor: '#19B4E5', // Default background color for enabled button
        color: 'white', // Default text color for enabled button
        '&:hover': {
            backgroundColor: '#19a2e5', // Background color on hover
        },
        '&.Mui-disabled': {
            backgroundColor: '#e0e0e0', // Background color when disabled
            color: '#c4c4c4', // Text color when disabled
        }
    }
}
