import { FormControl, Button, Box, Stack, Grid, FormLabel, styled, ButtonGroup, TextField, Alert, Snackbar } from "@mui/material";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useEffect, useState } from "react";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { SubmitSchedule } from "../utility";
import dayjs from "dayjs";

const DatePick = styled(DatePicker)(({ theme }) => ({
    background: '#fff !important',
    marginTop: '6px !important',
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: '#d2d2d2 !important',
    },
    width: '100% !important',
    "& .MuiOutlinedInput-input": {
        marginTop: '5px',
        paddingTop: '9px',
        paddingBottom: '9px',

    },
    "& .MuiInputLabel-root": {
        lineHeight: '11pt !important'
    },
    "& .MuiInputLabel-sizeMedium[data-shrink='true']": {
        top: '3px'
    },
    "& .MuiInputLabel-sizeMedium[data-shrink='false']": {
        top: '-4px'
    }
}));

const CTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        background: '#fff !important',
    }
}));

export default function AppointmentForm(prop) {
    const { isMobileView } = prop

    const [alignment, setAlignment] = useState('recurring');
    const [days, setDays] = useState([]);
    const [timePeriod, setTimePeriod] = useState({ morning: false, afternoon: false, evening: false });
    const [scheduleVisit, setScheduleVisit] = useState({ frequency: 'recurring' });
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedTimePeriod, setSelectedTimePeriod] = useState([]);
    const [isReadyToSubmit, setReadyToSubmit] = useState(false);
    const [showAlert, setShowAlert] = useState({ open: false, severity: undefined, message: undefined });
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        setScheduleVisit({ ...scheduleVisit, frequency: newAlignment });
    };

    const handleCloseAlert = () => {
        setShowAlert({ ...showAlert, open: false });
    }

    const handleChangeStartDate = (startFrom) => {
        let dateSel = dayjs(startFrom).format('YYYY-MM-DD');

        if (dateSel !== dayjs().format('YYYY-MM-DD')) {
            if (dayjs(dateSel).isBefore(dayjs()) === true) {
                setShowAlert({ ...showAlert, open: true, severity: 'error', message: "Please select a valid date. Past dates are not allowed." })
                setSelectedDate(dayjs())
            }
        }
        setScheduleVisit({ ...scheduleVisit, dateStartFrom: startFrom === null ? undefined : dateSel })
    }

    const handleSelectTime = (timeSlot, val) => (event) => {
        let _timePeriod = timePeriod
        let toggleBtn = !val

        _timePeriod[timeSlot] = toggleBtn
        setTimePeriod({ ..._timePeriod });
    }

    const handleDaySelected = (day) => (event) => {
        if (selectedDays.length > 0) {
            let _selectedDays = selectedDays;
            let nSelectedDays = _selectedDays.filter(e => e === day);
            if (nSelectedDays.length === 0) {
                setSelectedDays([...selectedDays, day]);
            } else {
                setSelectedDays(_selectedDays.filter(e => e !== day))
            }
        } else {
            setSelectedDays([day]);
        }
    }

    const handleChangeNote = (e) => {
        setScheduleVisit({ ...scheduleVisit, note: e.currentTarget.value })
    }

    useEffect(() => {
        setScheduleVisit({
            ...scheduleVisit,
            daySelect: selectedDays,
            timeSlot: selectedTimePeriod,
            dateStartFrom: dayjs(selectedDate).format('YYYY-MM-DD')
        });
    }, [selectedDays, selectedTimePeriod, selectedDate]);

    useEffect(() => {
        //-- Validation
        let isValid = true;

        if (scheduleVisit.frequency === null) {
            //-- Frequency
            isValid = false;
        }
        if (scheduleVisit.dateStartFrom === undefined) {
            //-- Date Start From
            isValid = false;
        }
        if (scheduleVisit.timeSlot !== undefined && scheduleVisit.timeSlot.length === 0) {
            //-- Time Slot
            isValid = false;
        }
        if (scheduleVisit.daySelect !== undefined && scheduleVisit.daySelect.length === 0) {
            isValid = false;
        }

        setReadyToSubmit(isValid);

    }, [scheduleVisit]);

    useEffect(() => {
        let _selectedDay = [];
        Object.keys(timePeriod).forEach(e => {
            if (timePeriod[e] === true) {
                _selectedDay.push(e)
            }
        })
        setSelectedTimePeriod(_selectedDay);
    }, [timePeriod]);

    const toggleActive = { background: '#373737 !important', color: '#fff !important', }
    let day = Array.from({ length: 7 }, (_, i) => i + 1);

    const handleSubmit = async () => {
        await SubmitSchedule(scheduleVisit).then(e => {
            if (e === 'SUCCESS') {
                setShowAlert({ ...showAlert, open: true, severity: 'success', message: "Your schedule is successfully submitted." })
            }
        }).catch(e => {
            setShowAlert({ ...showAlert, open: true, severity: 'error', message: e })
        })
    }

    return (
        <Box textAlign={isMobileView ? 'center' : undefined}>
            <Snackbar open={showAlert.open} onClose={handleCloseAlert} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={1500}>
                <Alert
                    severity={showAlert.severity}
                >{showAlert.message ?? ""}</Alert>
            </Snackbar>
            <Stack direction={'column'} rowGap={4}>
                <Grid container columns={12}>
                    <Grid item lg={6}>
                        <FormControl>
                            <FormLabel>Frequency</FormLabel>
                            <ToggleButtonGroup
                                color="primary"
                                value={alignment}
                                exclusive
                                onChange={handleChange}
                                sx={{ background: '#fff', marginTop: '13px' }}
                                aria-label="Platform"
                            >
                                <ToggleButton value="recurring" sx={alignment === 'recurring' ? toggleActive : undefined}>Recurring</ToggleButton>
                                <ToggleButton value="one_time" sx={alignment === 'one_time' ? toggleActive : undefined}>One Time</ToggleButton>
                            </ToggleButtonGroup>
                        </FormControl>
                    </Grid>
                    <Grid item lg={6}>
                        <FormControl>
                            <FormLabel>Start Date</FormLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePick sx={{ m: 0 }} onChange={handleChangeStartDate} value={selectedDate} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>
                </Grid>
                <FormControl>
                    <FormLabel sx={{ marginBottom: '8px' }}>Days. Select all that apply.</FormLabel>
                    <ButtonGroup>
                        {day.map(e => <Button onClick={handleDaySelected(e)} className={selectedDays.includes(e) ? "dayGroup active" : "dayGroup"} key={`${e}-day`}>{dayjs().day(e).format('ddd')}</Button>)}
                    </ButtonGroup>
                </FormControl>

                <FormControl>
                    <FormLabel sx={{ marginBottom: '8px' }}>Time. Select all that apply.</FormLabel>
                    <ButtonGroup>
                        {Object.keys(timePeriod).map(e => <Button className={timePeriod[e] === true ? "dayGroup active" : "dayGroup"} onClick={handleSelectTime(e, timePeriod[e])} key={`${e}-day`}>{String(e).toUpperCase()}</Button>)}
                    </ButtonGroup>
                </FormControl>

                <FormControl>
                    <FormLabel sx={{ marginBottom: '8px' }}>Notes for your pet.</FormLabel>
                    <CTextField multiline rows={3} placeholder="Treats given, etc." onChange={handleChangeNote} />
                </FormControl>
                <Box textAlign={'center'}>
                    <Button sx={{ borderRadius: '26px', padding: '17px 47px', bgcolor: '#373737', color: '#fff' }} variant={"contained"} disabled={isReadyToSubmit === false} onClick={handleSubmit}>Schedule Service</Button>
                </Box>
            </Stack>
        </Box>
    )
}