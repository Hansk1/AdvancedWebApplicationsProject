import TopBar from "./TopBar";
import ChatBox from "./chatBox";

export default function ChatPage({ setUserData }) {
    return (
        <div>
            <TopBar setUserData={setUserData}></TopBar>
            <ChatBox></ChatBox>
        </div>
    );
}
