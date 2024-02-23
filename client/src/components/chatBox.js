import {
    Button,
    Box,
    Typography,
    Divider,
    Grid,
    Avatar,
    Paper,
    Container,
    Link,
    CssBaseline,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
} from "@mui/material";

import ChatList from "./chatlist";
import ChatWindow from "./chatWindow";

import { useState, useEffect } from "react";

export default function ChatBox({ jwt }) {
    const [selectedChat, setSelectedChat] = useState(null);
    return (
        <Container maxWidth="md" sx={{ mt: 8 }}>
            <Grid
                container
                component={Paper}
                elevation={7}
                alignItems="stretch"
                direction="row"
                justifyContent="flex-end"
                sx={{ height: "40vh" }}
            >
                {/* Chat list */}
                <Grid item xs={4} lg={4}>
                    <ChatList jwt={jwt} setSelectedChat={setSelectedChat} />
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />
                {/* Chat window */}
                <Grid
                    item
                    xs={8}
                    lg={8}
                    sx={{
                        overflowY: "auto",
                        maxHeight: "50vh",
                        height: "100%",
                    }}
                >
                    <ChatWindow jwt={jwt} selectedChat={selectedChat} />
                </Grid>
            </Grid>
        </Container>
    );
}
