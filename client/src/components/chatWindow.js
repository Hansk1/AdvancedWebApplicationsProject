import React from "react";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import {
    Button,
    Box,
    Typography,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    TextField,
} from "@mui/material";

const ChatWindow = ({ selectedChat }) => {
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
            mode: "cors",
        });

        const responseData = await response.json();
        if (responseData.messages) {
            setMessages(responseData.messages);
        }
    };

    // Function to handle form submission
    async function handleSubmit(event) {
        const data = {
            receiver: selectedChat,
            content: message,
        };
        event.preventDefault();
        // Send a POST request to update user data
        const dataPromise = await fetch("/messages/add", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
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
        <Box
            sx={{
                position: "relative",
                height: "100%",
                overflow: "hidden",
            }}
        >
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
                        maxHeight: "80%",
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
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        backgroundColor: "white",
                        padding: 0,
                        paddingBottom: 1,
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
        </Box>
    );
};

export default ChatWindow;
