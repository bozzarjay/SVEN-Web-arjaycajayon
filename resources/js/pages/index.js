import { Box, Container, Grid, Button, ThemeProvider, createTheme, useTheme, useMediaQuery } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import AboutUsSection from '../section/about-us';
import HeroSection from '../section/hero';
import AppointmentSection from '../section/appointment';
import TopNavigation from '../components/navigation-vertical';

const theme = createTheme({
    typography: {
        fontFamily: '"Open Sans", sans-serif',
        fontSize: 14, // 🌐 Base font size (default is 14)
        h1: { fontSize: '2.5rem' },
        h2: { fontSize: '2rem' },
        body1: { fontSize: '1rem' }, // override individual types if needed
        // You can customize more: h3, h4, subtitle1, caption, etc.
    },
});

function App() {
    const theme = useTheme();

    const isXs = useMediaQuery(theme.breakpoints.only('xs'));
    const isSm = useMediaQuery(theme.breakpoints.only('sm'));
    const [navMenuActive, setNavMenuActive] = useState();

    const sectionRef = {
        scheduleVisit: useRef(null),
        aboutUs: useRef(null),
        home: useRef(null)
    };

    const scrollToSection = (section) => (event) => {
        sectionRef[section]?.current?.scrollIntoView({ behavior: 'smooth' });
        setNavMenuActive(undefined);
    };

    useEffect(() => {
        if (navMenuActive !== undefined) {
            sectionRef[navMenuActive]?.current?.scrollIntoView({ behavior: 'smooth' });
            setNavMenuActive(undefined);
        }
    }, [navMenuActive]);

    return (
        <Box>
            {/* Top Section */}
            <div ref={sectionRef.home}></div>
            <div className='bg-slider' style={{ padding: '40px 0px' }}>
                <Container maxWidth={"lg"}>
                    <TopNavigation goToSection={setNavMenuActive} />
                    <Grid container columns={12} sx={{ padding: '70px 0', color: '#fff' }}>
                        <Grid item lg={6} xs={12}>&nbsp;</Grid>
                        <Grid item lg={6} xs={12} textAlign={isSm || isXs ? 'center' : 'right'}>
                            <Box>
                                <h1 style={{ fontSize: '32pt', fontWeight: 'bold' }}>
                                    We care for your furry little love ones while...
                                </h1>
                                <Button className='btn-white' variant={"contained"} onClick={scrollToSection('scheduleVisit')}>Schedule a visit</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <Container maxWidth={"lg"}>
                {/* About US */}
                <div ref={sectionRef.aboutUs}>
                    <AboutUsSection isMobileView={isXs || isSm} goToSection={setNavMenuActive} />
                </div>

                {/* Hero Section */}
                {/* <HeroSection /> */}
                {/* Appointment Section */}
            </Container>
            <div ref={sectionRef.scheduleVisit}>
                <AppointmentSection isMobileView={isXs || isSm} goToSection={setNavMenuActive}/>
            </div>
        </Box>
    );
}

const root = createRoot(document.getElementById('app'));
root.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
);