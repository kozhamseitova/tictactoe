import React, { useState, useEffect } from 'react';
import TicTacToe from './TicTacToe';
import LoadingScreen from './LoadingScreen';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="app-container">
            {isLoading ? (
                <LoadingScreen />
            ) : (
                <TicTacToe />
            )}
        </div>
    );
}

export default App;
