import React, { useState } from 'react';
import { DateFilter } from '../Components/Filters/Filters';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
    const [options] = useState({
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Line Chart',
            align: 'left',
            style: {
                fontFamily: 'Mulish-Regular',
                fontSize: '20px',
            }
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
    });

    const [series] = useState([{
        name: "Budget",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }]);

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={options} series={series} type="line" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

function Dashboard(props) {
    const [clickedButton, setClickedButton] = useState('');
    const [editableAmounts, setEditableAmounts] = useState({
        'Monthly Budget': { currency: 'Php', amount: '0.00' },
        'Budget Limit': { currency: 'Php', amount: '0.00' },
        'Total Balance': { currency: 'Php', amount: '0.00' }
    });
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');

    const getCurrentMonthYear = () => {
        const currentDate = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const month = monthNames[currentDate.getMonth()];
        const year = currentDate.getFullYear();
        return `${month} ${year}`;
    };

    const handleOpen = (text) => {
        setOpen(true);
        setClickedButton(text);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const newValue = event.target.value;
        if (newValue.length <= 12 && (/^-?\d*\.?\d*$/.test(newValue) || newValue === '')) {
            setEditableAmounts({
                ...editableAmounts,
                [clickedButton]: { ...editableAmounts[clickedButton], amount: newValue }
            });
            setError('');
        } else {
            setError('Please enter a valid number.');
        }
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`New ${clickedButton}: ${editableAmounts[clickedButton].currency} ${editableAmounts[clickedButton].amount}`);
        setOpen(false);
    };

    const renderEditableCard = (title) => (
        <Grid item xs={12} md={4} lg={4}>
            <Paper
                sx={{
                    position: 'relative',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 160,
                    width: 345,
                    textAlign: 'left',
                    paddingLeft: (title === 'Monthly Budget' || title === 'Budget Limit' || title === 'Total Balance') ? '30px' : '0',
                }}
            >
                {title}
                <p style={{ fontSize: '2.0rem', fontWeight: 'bold' }}>{editableAmounts[title].currency} {editableAmounts[title].amount}</p>
                <Button onClick={() => handleOpen(title)} className={clickedButton === title ? 'clicked' : ''} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', padding: 0 }}>
                    <img src={require('../Assets/Images/editbtn.png')} alt="Edit" style={{ width: '30px', height: '30px' }} />
                </Button>
                <Modal
                    open={open && clickedButton === title}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        width: 400,
                        borderRadius: '15px',
                        textAlign: 'center',
                    }}>
                        <Button onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', color: '#757575', fontSize: '1.5rem', cursor: 'pointer' }}>×</Button>
                        <h2 id="modal-modal-title" style={{ fontSize: '30px',marginBottom: '20px' }}>Edit {title}</h2>
                        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                            <TextField
                                type="text"
                                value={editableAmounts[title].amount}
                                onChange={handleChange}
                                label="Input New Amount"
                            />
                        </form>
                        <div style={{ marginBottom: '20px' }}>
                            <Button onClick={handleSubmit} style={{ backgroundColor: '#19B4E5', borderRadius: '10px', color: '#fff', width: '160px', padding: '10px 0' }}>Save</Button>
                        </div>
                    </Box>
                </Modal>
            </Paper>
        </Grid>
    );

    const renderSummaryCard = () => (
        <Grid item xs={12} md={4} lg={4}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 380,
                    width: 340,
                    textAlign: 'left',
                }}
            >
                <p style={{ paddingLeft: '20px', fontWeight: 'bold', marginBottom: '5px', marginTop: '5px', fontSize: '20px' }}>Summary</p>
                <p style={{ paddingLeft: '20px', paddingBottom: '5px', fontSize: '12px', marginTop: '0' }}>{getCurrentMonthYear()}</p>
                <p style={{ paddingLeft: '20px', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginTop: '0' }}>Total Monthly Budget: {editableAmounts['Monthly Budget'].currency} {editableAmounts['Monthly Budget'].amount}</p>
                <p style={{ paddingLeft: '20px', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginTop: '0' }}>Total Monthly Budget Limit: {editableAmounts['Budget Limit'].currency} {editableAmounts['Budget Limit'].amount}</p>
                <p style={{ paddingLeft: '20px', borderBottom: '1px solid #ccc', paddingBottom: '5px', marginTop: '0' }}>Total Monthly Balance: {editableAmounts['Total Balance'].currency} {editableAmounts['Total Balance'].amount}</p>
            </Paper>
        </Grid>
    );

    return (
        <div style={{ fontFamily: 'Mulish-Regular' }}>
            <Container className="test" maxWidth="lg" sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12} lg={12}>
                        <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <h1>Analytics</h1>
                            <p>{getCurrentMonthYear()}</p>
                        </Box>
                        <Paper
                            sx={[
                                styles.header, {
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'row',
                                }
                            ]}
                            elevation={0}
                            variant='outlined'>
                            <Box style={styles.header.buttons}>
                                <DateFilter /> {}
                            </Box>
                        </Paper>
                    </Grid>
                    {renderEditableCard('Monthly Budget')}
                    {renderEditableCard('Budget Limit')}
                    {renderEditableCard('Total Balance')}
                    
                    <Grid item xs={12} md={8} lg={8}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 380,
                                width: 'calc(100% - 10px)',
                                marginRight: '10px',
                            }}
                        >
                            <ApexChart />
                        </Paper>
                    </Grid>
                    {renderSummaryCard()}
                    
                </Grid>
            </Container>
        </div>
    );
}

const styles = {
    header: {
        overflow: 'auto',
        overflowWrap: "break-word",
        fontFamily: 'Mulish-Regular',
        buttons: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '650px'
        }
    },
}

export default Dashboard;