import TopBar from "./TopBar";
import ProfilePage from "./profilePage";

export default function ProfilePageTopBar({ setUserData }) {
    return (
        <div>
            <TopBar setUserData={setUserData}></TopBar>
            <ProfilePage></ProfilePage>
        </div>
    );
}
