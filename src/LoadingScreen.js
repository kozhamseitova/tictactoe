import React from 'react';
import load_gif from './images/tic_tac_toe_loader_.gif';

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <div className="loading-content">
                <img src={load_gif} alt="loading..." />
            </div>
        </div>
    );
};

export default LoadingScreen;
