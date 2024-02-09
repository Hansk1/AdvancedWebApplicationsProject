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
        if (selectedChat) messagesFetch();
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
            {messages && (
                <List>
                    {messages.map((message) => {
                        return (
                            <ListItem key={message._id}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText
                                            align={
                                                message.receiver ===
                                                selectedChat
                                                    ? "right"
                                                    : "left"
                                            }
                                            primary={message.content}
                                        ></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText
                                            align={
                                                message.receiver ===
                                                selectedChat
                                                    ? "right"
                                                    : "left"
                                            }
                                            secondary={
                                                message.date.split("T")[1]
                                            }
                                        ></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        );
                    })}
                </List>
            )}

            <Grid
                container
                spacing={2}
                alignItems="center"
                justifyContent="center"
                sx={{ display: "flex" }}
            >
                <Grid item xs={8} sx={{ paddingBottom: 2 }}>
                    <TextField
                        id="outlined-basic"
                        label="Type Something"
                        fullWidth
                        value={message}
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={handleSubmit}>
                        Send
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default ChatWindow;