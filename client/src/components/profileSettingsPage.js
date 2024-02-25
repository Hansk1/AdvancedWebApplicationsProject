import TopBar from "./TopBar";
import ProfileSettings from "./profileSettings";

export default function ProfileSettingsPage({ setUserData }) {
    return (
        <div>
            <TopBar setUserData={setUserData}></TopBar>
            <ProfileSettings></ProfileSettings>
        </div>
    );
}
