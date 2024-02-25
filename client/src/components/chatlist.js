import React from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar,
    Divider,
} from "@mui/material";

const ChatList = ({ setSelectedChat }) => {
    const [chats, setChats] = useState(null);
    const [users, setUsers] = useState([]);
    const [userAvatars, setUserAvatars] = useState({});

    //Effect to fetch data on component mount:
    useEffect(() => {
        // Reset user avatars and fetch chats
        setUserAvatars({});
        chatsFetch();
    }, []);

    //Effect to fetcg data when chats state changes:
    useEffect(() => {
        usersFetch();
    }, [chats]);

    //Function to fetch chat data
    const chatsFetch = async () => {
        const response = await fetch("/users/userdata", {
            method: "GET",
            mode: "cors",
        });

        const responseData = await response.json();
        if (responseData.foundUser) {
            setChats(responseData.foundUser.chats);
        }
    };

    // Function to fetch user data for each chat
    const usersFetch = async () => {
        if (chats) {
            const updatedUsers = await Promise.all(
                chats.map(async (userId) => {
                    const response = await fetch(`/users/${userId}`, {
                        method: "GET",
                        mode: "cors",
                    });
                    const userData = await response.json();
                    return userData.foundUser;
                })
            );
            //Set users state with feched data
            setUsers(updatedUsers);
            //Fetch user pictures
            fetchAvatars(updatedUsers);
        }
    };

    // Function to fetch avatars for users
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

    // Function to handle user selection
    const handleUserSelect = (userId) => {
        setSelectedChat(userId);
    };

    // Function to fetch a user's profile picture from the server:
    const fetchPicture = async (pictureId) => {
        const response = await fetch("/pictures/" + pictureId, {
            method: "GET",
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
                <React.Fragment key={user._id}>
                    <ListItem onClick={() => handleUserSelect(user._id)}>
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
                </React.Fragment>
            ))}
        </List>
    );
};

export default ChatList;
