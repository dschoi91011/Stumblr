import './LoadingScreen.css';

const LoadingScreen = () => {
    return(
        <div className="loading-screen">
            <div className="spinner"></div>
            <p style={{fontSize: '30px'}}>Loading...</p>
        </div>
    );
};

export default LoadingScreen;