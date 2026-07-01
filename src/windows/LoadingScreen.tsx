import '../styles/loading-screen.css'

export const LoadingScreen = () => {

    return (
        <div className="windows-xp-loading-screen">
            <div className="loading-container">

                <div className="loading-text">
                    <div className="windows-title">KP® Portfolio™ <span>XP</span> Professional</div>
                </div>

                <div className="container">
                    <div className="box"></div>
                    <div className="box"></div>
                    <div className="box"></div>
                </div>
            </div>
        </div>
    );
};