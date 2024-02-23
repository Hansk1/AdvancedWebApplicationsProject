import {
    Container,
    Box,
    Grid,
    Typography,
    Button,
    CssBaseline,
    Avatar,
    Paper,
    Link,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useEffect, useState, useRef } from "react";

export default function SwipeBox({ jwt, user }) {
    const [foundUser, setFoundUser] = useState(null);
    const [profilePicture, setProfilePicture] = useState(null);

    useEffect(() => {
        dataFetch();
    }, []);

    const dataFetch = async () => {
        let response = await fetch("/users/random", {
            method: "GET",
            headers: {
                Authorization: "bearer " + jwt,
            },
            mode: "cors",
        });

        let responseData = await response.json();

        if (responseData.foundUser) {
            setFoundUser(responseData.foundUser);
        }

        if (responseData.foundUser.profilePicture) {
            response = await fetch(
                "/pictures/" + responseData.foundUser.profilePicture,
                {
                    method: "GET",
                    headers: {
                        Authorization: "bearer " + jwt,
                    },
                    mode: "cors",
                }
            );
            responseData = await response.json();
            const imgBuffer = responseData.imgbuffer;

            const blob = new Blob([new Uint8Array(imgBuffer.data)]);
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64 = reader.result.split(",")[1];
                setProfilePicture(`data:image/png;base64,` + base64);
            };
        } else {
            setProfilePicture(null);
        }
    };

    const addToLiked = async (event) => {
        let userId = null;
        if (event) {
            userId = event.target.value;
        } else {
            userId = foundUser._id;
        }

        const data = {
            likedUserId: userId,
        };
        const response = await fetch("/users/addlike", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "bearer " + jwt,
            },
            body: JSON.stringify(data),
            mode: "cors",
        });

        const responseData = await response.json();
        console.log(responseData);

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
                dataFetch(); // Swipe right
            } else if (deltaX < -50) {
                addToLiked(); // Swipe left
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
                    <Typography sx={{ mx: 2 }}>
                        {foundUser.profileText}
                    </Typography>
                    <Button variant="outlined" sx={{ my: 2 }}>
                        Pictures
                    </Button>
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
