import TopBar from "./TopBar";
import ChatBox from "./chatBox";

export default function ChatPage({ jwt }) {
    return (
        <div>
            <TopBar></TopBar>
            <ChatBox jwt={jwt}></ChatBox>
        </div>
    );
}
