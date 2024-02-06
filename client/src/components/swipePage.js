import TopBar from "./TopBar";
import SwipeBox from "./swipeBox";
import { Container } from "@mui/material";

export default function SwipePage({ jwt, user }) {
    return (
        <div>
            <TopBar></TopBar>
            <SwipeBox jwt={jwt} user={user}></SwipeBox>
        </div>
    );
}
