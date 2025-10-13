import React from 'react';
import AsciiBackground from './components/AsciiBackground';
import ParticleEffect from './components/ParticleEffect';
import Planets from './planets/Planets';
import Spaceship from './planets/Spaceship';

// Component that holds all the background and interactive elements of the galaxy
const GalaxyHome = ({ navigateToPlanet, spaceshipDestination, onArrival }) => {
    return (
        <>
            <AsciiBackground />
            <ParticleEffect />
            <Planets onPlanetClick={navigateToPlanet} />
            <Spaceship
                destination={spaceshipDestination}
                onArrival={onArrival}
            />
        </>
    );
};

export default GalaxyHome;