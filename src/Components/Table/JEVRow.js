import React, { useEffect, useState } from 'react';
import { TableCell, TableRow } from "@mui/material";
import { useSchoolContext } from '../../Context/SchoolProvider';
import Box from '@mui/material/Box';
// import { useNavigationContext } from '../../Context/NavigationProvider';
import Button from '@mui/material/Button';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MenuItem from '@mui/material/MenuItem';
import { Menu, TextField } from '@mui/material';
import RestService from '../../Services/RestService';
import IconButton from "@mui/material/IconButton";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UacsDateFilter from '../Filters/UacsDateFilter';

function JEVRow(props) {
    const { rows, setRows, page, rowsPerPage } = props;
    const [editingCell, setEditingCell] = useState({ colId: null, rowId: null });
    const [inputValue, setInputValue] = useState('Initial Value');
    const [initialValue, setInitialValue] = useState(''); //only request update if there is changes in initial value
    const { displayFields, isAdding, currentDocument, lr, fetchDocumentData, setReload, reload, value } = useSchoolContext();

    const [deleteAnchorEl, setDeleteAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [dropdownAnchorEl, setDropdownAnchorEl] = useState(null);

    useEffect(() => {
        console.log("RecordsRow useEffect")
        // if (isAdding === true && value === 0) { // applies only to LR & RCD tab: value = 0
        //     displayFields(isAdding);
        // }
    }, [value, isAdding, displayFields]);

    const handleCellClick = (colId, rowId, event) => {
        setEditingCell({ colId, rowId });
        setInitialValue(event.target.value); // Save the initial value of the clicked cell
        setInputValue(event.target.value); // Set input value to the current value
        console.log(editingCell)
        console.log('row Id: ' + rowId + " and col Id: " + colId)
    };

    const handleDeleteOpen = (event, index) => {
        setDeleteAnchorEl(event.currentTarget);
        setSelectedIndex(index);
    };

    const handleMenuClose = () => {
        setDropdownAnchorEl(null);
        setDeleteAnchorEl(null);
        setSelectedIndex(null);
    };

    const handleDelete = async (rowId) => {
        // Implement delete functionality here
        console.log("Delete button clicked for row at index:", selectedIndex);
        console.log("Delete lr id: " + rowId)
        deleteLrByid(rowId);
        handleMenuClose();
    };

    const deleteLrByid = async (rowId) => {
        try {
            const response = await RestService.deleteLrById(rowId);
            if (response) {
                console.log(`LR with id: ${rowId} is deleted`);
            } else {
                console.log("LR not deleted");
            }
            fetchDocumentData();
        } catch (error) {
            console.error('Error fetching document:', error);
        }
    };

    const updateLrById = async (colId, rowId, value) => {
        try {
            const response = await RestService.updateLrById(colId, rowId, value);
            if (response) {
                console.log(`LR with id: ${rowId} is updated`);
            } else {
                console.log("LR not updated");
            }
            fetchDocumentData();
        } catch (error) {
            console.error('Error fetching document:', error);
        }
    }

    const createLrByDocumentId = async (doc_id, obj) => {
        try {
            const response = await RestService.createLrByDocId(doc_id, obj);
            if (response) {
                console.log(`LR is created`);
            } else {
                console.log("LR not created");
            }
            fetchDocumentData();
        } catch (error) {
            console.error('Error fetching document:', error);
        }
    }

    const handleAmountType = (value) => {
        if (value === true) {
            return (<span>"Credit"</span>);
        } else {
            return (<span>"Debit"</span>);
        }
    }

    //If lr length is greater than one; reload to fetch documents and lr createLrByDocId
    //else, set lr to empty
    const handleNewRecordCancel = () => {
        console.log("cancel");
        if (lr.length > 1) {
            fetchDocumentData();
        } else {
            setReload(!reload); //just to reload school.js to fetch lr data
        }
    }

    //Find the index of the lr row where id == 3 and push that value to db
    const handleNewRecordAccept = (rowId) => {
        console.log("accept");
        const rowIndex = rows.findIndex(row => row.id === rowId);
        createLrByDocumentId(currentDocument.id, rows[rowIndex]);
    }

    const handleInputChange = (colId, rowId, event) => {
        // Find the index of the object with matching id
        const rowIndex = rows.findIndex(row => row.id === rowId);

        if (rowIndex !== -1) {
            // Copy the array to avoid mutating state directly
            const updatedRows = [...rows];

            // Update the specific property of the object
            updatedRows[rowIndex][colId] = event.target.value;

            // Update the state with the modified rows
            setRows(updatedRows);
            setInputValue(updatedRows[rowIndex][colId]); // Update inputValue if needed
        } else {
            console.error(`Row with id ${rowId} not found`);
        }
    };

    const handleInputBlur = (colId, rowId) => {
        setEditingCell(null);
        // Perform any action when input is blurred (e.g., save the value)
        // Only applies if it's not the new row
        if (rowId !== 3) {
            if (inputValue !== initialValue) {
                console.log(`Wow there is changes in col: ${colId} and row: ${rowId}`);
                updateLrById(colId, rowId, inputValue);
            }
            console.log('Value saved:', inputValue);
        }
    };

    return (
        <React.Fragment>
            {rows
                .slice(page * rowsPerPage, page * props.rowsPerPage + props.rowsPerPage)
                .map((row, index) => {
                    const uniqueKey = `row_${row.id}_${index}`;
                    return (
                        <TableRow key={uniqueKey} hover role="checkbox" tabIndex={-1}>
                            {props.columns.map((column) => {
                                const value = row[column.id];

                                return (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        sx={[
                                            styles.cell,
                                            {
                                                minWidth: column.minWidth,
                                                maxWidth: column.maxWidth,
                                            }
                                        ]}
                                        onClick={(event) => handleCellClick(column.id, row.id, event)}
                                    >
                                        {/*Amount field*/}
                                        {column.id === "amount" ?
                                            <Box
                                                style={
                                                    editingCell &&
                                                        editingCell.colId === column.id &&
                                                        editingCell.rowId === row.id &&
                                                        row.id !== 3
                                                        ? styles.divInput
                                                        : null
                                                }
                                            >
                                                <TextField
                                                    value={value}
                                                    sx={{
                                                        "& fieldset": { border: row.id !== 3 && 'none' }
                                                    }}
                                                    InputProps={{
                                                        style: {
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            flexDirection: 'row',
                                                            justifyContent: "flex-start",
                                                            fontSize: 14,
                                                            height: 40
                                                        }
                                                    }}
                                                    onChange={(event) =>
                                                        handleInputChange(column.id, row.id, event)
                                                    }
                                                    onBlur={() => handleInputBlur(column.id, row.id)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            e.target.blur(); // Invoke handleLogin on Enter key press
                                                        }
                                                    }}
                                                />
                                            </Box>
                                            :
                                            /*Account Type field*/
                                            column.id === "amountType" ?
                                                <Box>
                                                    {value}
                                                </Box>
                                                :
                                                /*UACS field: Accounts and Explanations & Object Code*/
                                                <Box sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}>
                                                    <Box>
                                                        {value}
                                                    </Box>
                                                </Box>
                                        }
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    );
                })}
        </React.Fragment>
    );
}

const styles = {
    cell: {
        fontFamily: "Mulish",
        fontWeight: "bold",
        height: "35px",
    },
    inputStyling: {
        fontFamily: "Mulish-SemiBold",
        fontSize: "12px",
        background: "transparent",
        outline: "none",
        border: 'none',
    },
    divInput: {
        borderRadius: "8px",
        border: "1px solid #ccc",
        background: "transparent",
        outline: "none",
    }
}

export default JEVRow;