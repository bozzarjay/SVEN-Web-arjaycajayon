import { AppBar, Toolbar, Typography, Button, Box, Stack } from '@mui/material';

export default function TopNavigation(prop) {

    const btnFont = { textTransform: 'capitalize', color: '#f0f0f0' }

    const handleNavigate = (section) => (event) => {
        prop.goToSection(section)
    }

    return (
        <AppBar position="static" sx={{ background: 'none' }} elevation={0}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Stack direction={'row'}>
                        <div className="logo-transparent"></div>
                        <Typography sx={{ fontSize: '19pt', margin: '10px 10px' }}>PAWTASTIC</Typography>
                    </Stack>
                </Typography>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant={"text"} sx={btnFont} onClick={handleNavigate('aboutUs')}>About Us</Button>
                    <Button variant={"text"} sx={btnFont} onClick={handleNavigate('scheduleVisit')}>Schedule a visit</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}