import React from 'react';
import { TextField, Typography, Button } from '@mui/material';

import { useSchoolContext } from '../../Context/SchoolProvider';
import ConfirmModal from './ConfirmModal';

export default function BudgetTab({ handleClose }) {
    const { month, currentSchool, currentDocument, jev } = useSchoolContext();
    const [amount, setAmount] = React.useState(0)
    const [confirmOpen, setConfirmOpen] = React.useState(false);

    const handleConfirmClose = () => setConfirmOpen(false)

    React.useEffect(() => {
        if (currentDocument) {
            setAmount(currentDocument.cashAdvance)
        }
    }, [currentDocument, month, jev])

    const handleChange = (event) => {
        const value = event.target.value;
        const regex = /^[0-9]*$/;

        if (regex.test(value)) {
            setAmount(value);
        }
    }

    return (
        <React.Fragment>
            <Typography id="modal-modal-description" sx={{ mt: 1, mb: .5 }}>
                Set the budget required or delegated for the month of
                <span style={{ fontWeight: 'bold' }}> {month}</span> in
                <span style={{ fontWeight: 'bold' }}> {currentSchool?.name}</span>.
            </Typography>
            <TextField
                sx={{ alignSelf: "center", mt: 2, mb: .5, width: "100%" }}
                type="text"
                value={amount || 0}
                disabled={!!currentDocument?.cashAdvance} // Convert to boolean; Disabled if cash advance already set
                onChange={(event) => handleChange(event)}
                label="Input Amount"
            />
            <Button
                sx={styles.button}
                onClick={() => setConfirmOpen(true)}
                variant="contained"
                disabled={!!currentDocument?.cashAdvance}
            >
                Save
            </Button>
            <ConfirmModal
                open={confirmOpen}
                handleClose={handleConfirmClose}
                handleCloseParent={handleClose}
                value={amount || 0} />
        </React.Fragment>
    );
}

const styles = {
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