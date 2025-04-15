import { Box, Grid, Typography, Button } from "@mui/material";

export default function AboutUsSection(prop) {
    const { isMobileView } = prop

    const handleScheduleVisit = () => {
        prop.goToSection('scheduleVisit');
    }

    return (<Box>
        <Grid container columns={12} columnSpacing={5}>
            <Grid item lg={6} sm={12} xs={12} sx={{ padding: '60px 0' }} textAlign={isMobileView ? 'center' : undefined}>
                <Typography variant={"h4"} fontWeight={'bold'} sx={{ padding: '10px 0' }}>Expect care for your furry, feathery, or scaley friend.</Typography>
                <Typography variant={"body1"} sx={{ padding: '25px 0' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
                <Button className={"btn-black"} variant={"contained"} onClick={handleScheduleVisit}>Schedule a visit</Button>
            </Grid>
            <Grid item lg={6} sm={12} xs={12} sx={{ padding: '60px 0' }} textAlign={isMobileView ? 'center' : undefined}>
                <Grid container columns={12} sx={{ m: 2 }}>
                    <Grid item lg={6}>
                        <div className="image1"></div>
                    </Grid>
                    <Grid item lg={6}>
                        <div className="image2"></div>
                    </Grid>
                </Grid>
                <Grid container columns={12} sx={{ m: 2 }}>
                    <Grid item lg={6}>
                        <div className="image3"></div>
                    </Grid>
                    <Grid item lg={6}>
                        <div className="image4"></div>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Box>)
}