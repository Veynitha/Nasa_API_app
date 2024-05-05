import React from 'react';

function Homepage() {
    return (
        <div className='home flex justify-center items-center' style={{ 
            backgroundImage: `url('https://apod.nasa.gov/apod/image/2405/FishheadB_Colombari_960.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh'
        }}>
            <div className='home-content flex flex-col'>
                <h1 className='home-title text-center text-6xl font-bold mb-4'>Welcome to the Space Explorer</h1>
                <p className='home-text text-center text-4xl font-bold'>Explore the Universe</p>
                <h3 className='home-text-2 text-center text-4xl font-bold'>and discover new worlds</h3>
            </div>
        </div>
    );
}

export default Homepage;
