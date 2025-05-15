import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

// Reusable Card Component
const Card = ({ title, icon }) => (
    <div className="card">
        <p>{title}</p>
        <img src={icon} alt={title} />
    </div>
);

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

    return (
        <div className='main'>
            <div className='nav'>
                <p>Gemini</p>
                <img src={assets.user_icon} alt="User Profile" />
            </div>

            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Hello,there.</span></p>
                            <p>How can I help you today?</p>
                        </div>

                        <div className="cards">
                            <Card title="Suggest beautiful places to see on an upcoming road trip" icon={assets.compass_icon} />
                            <Card title="Briefly summarize this concept: urban planning" icon={assets.bulb_icon} />
                            <Card title="Brainstorm team bonding activities for our work retreat" icon={assets.message_icon} />
                            <Card title="Improve the readability of the following code" icon={assets.code_icon} />
                        </div>
                    </>
                ) : (
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="User Profile" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="Gemini Logo" />
                            {loading ? (
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : resultData ? (
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            ) : (
                                <p className="error-message">Something went wrong. Please try again.</p>
                            )}
                        </div>
                    </div>
                )}

                <div className="main-button">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder='Your Questions '
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="Gallery Icon" />
                            <img src={assets.mic_icon} alt="Mic Icon" />
                            {input?<img
                                onClick={() => onSent(input)}
                                src={assets.send_icon}
                                alt="Send Prompt"
                                aria-label="Send the input prompt"
                            />:null}
                        </div>
                    </div>

                    <p className="bottom-info">
                        Gemini may display inaccurate info, including about people, so double-check its response. Your privacy and Gemini Apps
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
