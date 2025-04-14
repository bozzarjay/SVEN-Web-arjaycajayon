import { Box } from '@mui/material';
import React from 'react';
import { createRoot } from 'react-dom/client';
import AboutUsSection from '../section/about-us';
import HeroSection from '../section/hero';
import AppointmentSection from '../section/appointment';

function App() {
    return (
        <Box>
            {/* Top Section */}
            Top Section
            {/* About US */}
            <AboutUsSection />
            {/* Hero Section */}
            <HeroSection />
            {/* Appointment Section */}
            <AppointmentSection />
        </Box>
    );
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);