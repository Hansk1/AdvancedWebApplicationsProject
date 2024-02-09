import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";

const ChatList = ({ jwt, setSelectedChat }) => {
    const [chats, setChats] = useState(null);
    const [users, setUsers] = useState([]);
    useEffect(() => {
        chatsFetch();
    }, []);

    useEffect(() => {
        usersFetch();
    }, [chats]);

    const chatsFetch = async () => {
        const response = await fetch("/users/userdata", {
            method: "GET",
            headers: {
                Authorization: "bearer " + jwt,
            },
            mode: "cors",
        });

        const responseData = await response.json();
        if (responseData.foundUser) {
            setChats(responseData.foundUser.chats);
        }
    };
    const usersFetch = async () => {
        if (chats) {
            const updatedUsers = await Promise.all(
                chats.map(async (userId) => {
                    const response = await fetch(`/users/${userId}`, {
                        method: "GET",
                        headers: {
                            Authorization: "Bearer " + jwt,
                        },
                        mode: "cors",
                    });
                    const userData = await response.json();
                    return userData.foundUser;
                })
            );
            setUsers(updatedUsers);
        }
    };

    const handleUserSelect = (userId) => {
        setSelectedChat(userId);
    };

    return (
        <List>
            {users.map((user) => (
                <>
                    <ListItem
                        button
                        key={user._id}
                        onClick={() => handleUserSelect(user._id)}
                    >
                        <ListItemIcon>
                            <Avatar
                                alt={user.firstName + " " + user.lastName}
                                src={user.profilePicture}
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary={user.firstName + " " + user.lastName}
                        />
                    </ListItem>
                    <Divider orientation="horizontal" flexItem />
                </>
            ))}
        </List>
    );
};

export default ChatList;
