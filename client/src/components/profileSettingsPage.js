import TopBar from "./TopBar";
import ProfileSettings from "./profileSettings";

export default function ProfileSettingsPage({ user, jwt }) {
    return (
        <div>
            <TopBar></TopBar>
            <ProfileSettings user={user} jwt={jwt}></ProfileSettings>
        </div>
    );
}
