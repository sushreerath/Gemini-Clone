import "./sidebar.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const [showNewChat, setShowNewChat] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat, clearPrevPrompts } = useContext(Context);

    const loadPreviousPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    const handleSettingsClick = () => {
        const shouldDelete = window.confirm("Are you sure you want to delete all past entries?");
        if (shouldDelete) {
            clearPrevPrompts();
        }
    };

    const handlePlusClick = () => {
        setShowNewChat((prev) => !prev);
    };

    return (
        <div className="sidebar">
            <div className="top">
                <img
                    src={assets.menu_icon}
                    className="menu"
                    alt="menu-icon"
                    onClick={() => {
                        setExtended((prev) => !prev);
                    }}
                />
                <div className="new-chat">
                    <img src={assets.plus_icon} alt="" onClick={handlePlusClick} />
                    {showNewChat && <p>New Chat</p>}
                </div>
                {extended && (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevPrompts.map((item, index) => {
                            return (
                                <div
                                    onClick={() => {
                                        loadPreviousPrompt(item);
                                    }}
                                    className="recent-entry"
                                    key={index}
                                >
                                    <img src={assets.message_icon} alt="" />
                                    <p>{item.slice(0, 18)}...</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended && <p>Help</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended && <p>Activity</p>}
                </div>
                <div className="bottom-item recent-entry" onClick={handleSettingsClick}>
                    <img src={assets.setting_icon} alt="" />
                    {extended && <p>Settings</p>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
