import { Box, Grid, Stack, Container, Typography } from "@mui/material";
import AppointmentForm from "../form/appointment";

export default function AppointmentSection(prop) {
    const { isMobileView } = prop

    const handleGoToTop = () => {
        prop.goToSection('home');
    }

    return (
        <Grid container columns={12}>
            <Grid display={'flex'} justifyContent={'flex-end'} item lg={6} sm={12} xs={12} className="bg-color-footer">
                <Box sx={{ margin: '8em 10em', color: '#f0f0f0' }}>
                    <Stack direction={'row'}>
                        <div className="logo-transparent" onClick={handleGoToTop}></div>
                        <Typography sx={{ fontSize: '19pt', margin: '10px 10px' }}>PAWTASTIC</Typography>
                    </Stack>
                    <h3>All Services Includes:</h3>
                    <ul className="services-lst">
                        <li>A photo update for you along.</li>
                        <li>Notification of the arrival.</li>
                        <li>Treats for your pet, with your</li>
                    </ul>
                </Box>

            </Grid>
            <Grid item lg={6} sx={{ background: '#cdaf8d' }} sm={12} xs={12}>
                <Box maxWidth={'460px'} sx={{ m: 7 }}>
                    <h1 style={{ color: '#373737', fontWeight: 'bold' }}>We'll take your dog for a walk. Just tell us when!</h1>
                    <AppointmentForm isMobileView={isMobileView} />
                </Box>
            </Grid>
        </Grid>
    )
}