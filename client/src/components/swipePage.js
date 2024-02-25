import TopBar from "./TopBar";
import SwipeBox from "./swipeBox";
import { Container } from "@mui/material";

export default function SwipePage({ setUserData }) {
    return (
        <div>
            <TopBar setUserData={setUserData}></TopBar>
            <SwipeBox></SwipeBox>
        </div>
    );
}
