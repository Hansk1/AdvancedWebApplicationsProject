import { useEffect, useState, useRef } from "react";
import {
    Container,
    Box,
    Typography,
    Button,
    CssBaseline,
    Avatar,
    Paper,
} from "@mui/material";

export default function SwipeBox() {
    const [foundUser, setFoundUser] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);

    //Effect to fetch data on component mount
    useEffect(() => {
        dataFetch();
    }, []);

    //Effect to fetch the profile picture when foundUser state changes
    useEffect(() => {
        fetchPicture();
    }, [foundUser]);

    //Function for fetching random user data
    const dataFetch = async () => {
        let response = await fetch("/users/random", {
            method: "GET",
            mode: "cors",
        });

        let responseData = await response.json();

        if (responseData.foundUser) {
            setFoundUser(responseData.foundUser);
        }
    };

    //Function to fetch found user profile picture
    const fetchPicture = async () => {
        if (foundUser && foundUser.profilePicture) {
            const response = await fetch(
                "/pictures/" + foundUser.profilePicture,
                {
                    method: "GET",
                    mode: "cors",
                }
            );
            const responseData = await response.json();

            //Load the image:
            const imgBuffer = responseData.imgbuffer;
            const blob = new Blob([new Uint8Array(imgBuffer.data)]);
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                // Update the profilePicture state with the base64 data
                const base64 = reader.result.split(",")[1];
                setProfilePicture(`data:image/png;base64,` + base64);
            };
        } else {
            //Reset the profilePicture state if no user or no profile picture
            setProfilePicture(null);
        }
    };

    //Function that adds the likes when called:
    const addToLiked = async (event) => {
        let userId = null;
        if (event) {
            userId = event.target.value;
        } else {
            userId = foundUser._id;
        }

        //Prepare data and send the request
        const data = {
            likedUserId: userId,
        };
        const response = await fetch("/users/addlike", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            mode: "cors",
        });

        //const responseData = await response.json();

        dataFetch();
    };

    //Handle the swiping:
    let xStart = 0;

    const handleTouchStart = (event) => {
        xStart = event.touches[0].clientX;
    };

    const handleTouchEnd = (event) => {
        if (event.changedTouches && event.changedTouches.length > 0) {
            const xEnd = event.changedTouches[0].clientX;
            const deltaX = xEnd - xStart;

            if (deltaX > 50) {
                // Swipe right
                dataFetch();
            } else if (deltaX < -50) {
                // Swipe left
                addToLiked();
            }
        }
    };

    return (
        <Container
            component="main"
            maxWidth="md"
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <CssBaseline />
            {foundUser && ( // Conditionally render if foundUser is not null
                <Paper
                    elevation={3}
                    sx={{ mx: { xs: 2, md: 8 }, mt: { xs: 6, md: 8 } }}
                >
                    <Box
                        sx={{
                            py: 2,
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 2,
                        }}
                    >
                        <Avatar
                            src={profilePicture}
                            sx={{ height: "60px", width: "60px" }}
                        ></Avatar>
                        <Typography variant="h4">
                            {foundUser.firstName}
                        </Typography>
                        <Typography variant="h4">
                            {foundUser.lastName}
                        </Typography>
                    </Box>
                    <Typography sx={{ mx: 2, marginBottom: 2 }}>
                        {foundUser.profileText}
                    </Typography>
                </Paper>
            )}
            {foundUser && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 3,
                        justifyContent: "center",
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            width: "10%",
                            display: { xs: "none", md: "block" },
                        }}
                        onClick={addToLiked}
                        value={foundUser._id}
                    >
                        Yeah
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            width: "10%",
                            display: { xs: "none", md: "block" },
                        }}
                        onClick={dataFetch}
                    >
                        Nope
                    </Button>
                    <Typography
                        sx={{
                            display: { xs: "block", md: "none" },
                        }}
                    >
                        Swipe left to like and swipe right to dislike
                    </Typography>
                </Box>
            )}
        </Container>
    );
}
