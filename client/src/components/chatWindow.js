import React from "react";

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

import { useState, useEffect } from "react";

const ChatWindow = ({ jwt, selectedChat }) => {
    const [messages, setMessages] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (selectedChat) {
            messagesFetch();
            const intervalId = setInterval(messagesFetch, 2500);
            return () => clearInterval(intervalId);
        }
    }, [selectedChat]);

    const messagesFetch = async () => {
        const response = await fetch(`/messages/get-messages/${selectedChat}`, {
            method: "GET",
            headers: {
                Authorization: "bearer " + jwt,
            },
            mode: "cors",
        });

        const responseData = await response.json();
        if (responseData.messages) {
            console.log(responseData);
            setMessages(responseData.messages);
        }
    };

    // Function to handle form submission
    async function handleSubmit(event) {
        const data = {
            receiver: selectedChat,
            content: message,
            date: new Date(),
        };
        event.preventDefault();
        // Send a POST request to update user data
        const dataPromise = await fetch("/messages/add", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: "bearer " + jwt,
            },
            body: JSON.stringify(data),
            mode: "cors",
        });

        // Parse the response as JSON
        const responseData = await dataPromise.json();
        if (responseData.success) messagesFetch();
    }

    // Function to handle input field changes
    const handleChange = (e) => {
        // Update the userData state with the new input value
        setMessage(e.target.value);
    };

    return (
        <>
            {!messages && (
                <Box
                    sx={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="h5">Select a chat</Typography>
                </Box>
            )}
            {messages && (
                <List
                    style={{
                        overflowY: "auto",
                        maxHeight: "calc(100vh - 200px)",
                    }}
                >
                    {messages.map((message) => (
                        <ListItem key={message._id}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align={
                                            message.receiver === selectedChat
                                                ? "right"
                                                : "left"
                                        }
                                        primary={message.content}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align={
                                            message.receiver === selectedChat
                                                ? "right"
                                                : "left"
                                        }
                                        secondary={message.date}
                                    />
                                </Grid>
                            </Grid>
                        </ListItem>
                    ))}
                </List>
            )}

            {messages && (
                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        position: "sticky",
                        bottom: 0,
                        zIndex: 1,
                        backgroundColor: "white",
                        paddingBottom: 2,
                    }}
                >
                    <Grid item xs={8}>
                        <TextField
                            id="outlined-basic"
                            label="Type Something"
                            fullWidth
                            value={message}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Divider orientation="horizontal" flexItem />
                    <Grid item>
                        <Button variant="contained" onClick={handleSubmit}>
                            Send
                        </Button>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default ChatWindow;
