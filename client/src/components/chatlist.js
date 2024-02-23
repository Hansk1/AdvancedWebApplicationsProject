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
    const [userAvatars, setUserAvatars] = useState({});

    useEffect(() => {
        setUserAvatars({});
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
            fetchAvatars(updatedUsers);
        }
    };

    const fetchAvatars = async (users) => {
        const avatarMap = {};
        // Create an array of promises for fetching avatars
        const avatarPromises = users.map(async (user) => {
            if (user.profilePicture) {
                const avatar = await fetchPicture(user.profilePicture);
                avatarMap[user._id] = avatar;
            }
        });

        // Wait for all promises to resolve
        await Promise.all(avatarPromises);

        // Set the state with the collected avatars
        setUserAvatars(avatarMap);
    };

    const handleUserSelect = (userId) => {
        setSelectedChat(userId);
    };

    const fetchPicture = async (pictureId) => {
        const response = await fetch("/pictures/" + pictureId, {
            method: "GET",
            headers: {
                Authorization: "bearer " + jwt,
            },
            mode: "cors",
        });

        const responseData = await response.json();
        const imgBuffer = responseData.imgbuffer;

        const blob = new Blob([new Uint8Array(imgBuffer.data)]);
        const reader = new FileReader();
        return new Promise((resolve) => {
            reader.onloadend = () => {
                const base64 = reader.result.split(",")[1];
                resolve(`data:image/png;base64,` + base64);
            };
            reader.readAsDataURL(blob);
        });
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
                        <ListItemIcon
                            sx={{ display: { xs: "none", md: "inline" } }}
                        >
                            <Avatar
                                alt={user.firstName + " " + user.lastName}
                                src={userAvatars[user._id]}
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
