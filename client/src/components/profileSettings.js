import {
    Button,
    Grid,
    Paper,
    Container,
    TextField,
    InputLabel,
    styled,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useEffect } from "react";

//Style for the file upload button:
const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

export default function ProfileSettings({ user, jwt }) {
    const [foundUser, setFoundUser] = useState(null);
    const [userData, setUserData] = useState([]);

    // Fetch user data from the server when the component mounts
    useEffect(() => {
        dataFetch();
    }, []);

    // Function to fetch user data from the server
    const dataFetch = async () => {
        // Prepare data to send in the request
        const data = {
            _id: user.id,
        };
        // Send a GET request to retrieve user data
        const response = await fetch("/users/userdata", {
            method: "GET",
            headers: {
                Authorization: "bearer " + jwt,
            },
            mode: "cors",
        });
        // Parse the response as JSON
        const responseData = await response.json();
        // If user data is found in the response, update the state
        if (responseData.foundUser) {
            setFoundUser(responseData.foundUser);
        }
    };

    // Function to handle form submission
    async function handleSubmit(event) {
        event.preventDefault();

        //Upload the profile picture:
        if (userData.profilePicture) {
            const formData = new FormData();
            formData.append("profilePicture", userData.profilePicture);

            const picturePostResponsePromise = await fetch("/pictures/add", {
                method: "POST",
                body: formData,
                mode: "cors",
            });
            const responseData = await picturePostResponsePromise.json();
            setUserData({
                ...userData,
                profilePictureId: responseData.pictureId,
            });
        }

        // Send a POST request to update user data
        const dataPromise = await fetch("/users/update-user", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: "bearer " + jwt,
            },
            body: JSON.stringify(userData),
            mode: "cors",
        });

        // Parse the response as JSON
        const responseData = await dataPromise.json();

        if (responseData.foundUser) {
            setFoundUser(...userData, responseData.foundUser);
        }
    }

    // Function to handle input field changes
    const handleChange = (e) => {
        if (e.target.type === "file") {
            // Update the userData state with the new input value
            setUserData({ ...userData, profilePicture: e.target.files[0] });
        } else {
            // Update the userData state with the new input value
            setUserData({ ...userData, [e.target.name]: e.target.value });
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 8 }}>
            {foundUser && (
                <Paper elevation={7}>
                    <Grid
                        container
                        component={"form"}
                        onSubmit={handleSubmit}
                        onChange={handleChange}
                        rowSpacing={2}
                        columnSpacing={2}
                        elevation={7}
                        sx={{ px: 2 }}
                    >
                        <Grid item xs={12}>
                            <InputLabel
                                htmlFor="firstname"
                                sx={{
                                    textAlign: "left",
                                    fontSize: "1.2rem",
                                    color: "black",
                                }}
                            >
                                Firstname
                            </InputLabel>
                            <TextField
                                required
                                id="firstname"
                                name="firstname"
                                defaultValue={foundUser.firstName}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel
                                htmlFor="lastname"
                                sx={{
                                    textAlign: "left",
                                    fontSize: "1.2rem",
                                    color: "black",
                                }}
                            >
                                Lastname
                            </InputLabel>
                            <TextField
                                required
                                id="lastname"
                                defaultValue={foundUser.lastName}
                                name="lastname"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel
                                htmlFor="email"
                                sx={{
                                    textAlign: "left",
                                    fontSize: "1.2rem",
                                    color: "black",
                                }}
                            >
                                Email Address
                            </InputLabel>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                defaultValue={foundUser.email}
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel
                                htmlFor="profileText"
                                sx={{
                                    textAlign: "left",
                                    fontSize: "1.2rem",
                                    color: "black",
                                }}
                            >
                                Profile Text
                            </InputLabel>
                            <TextField
                                required
                                fullWidth
                                name="profileText"
                                type="text"
                                id="profileText"
                                defaultValue={foundUser.profileText}
                            />
                        </Grid>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            sx={{ marginLeft: 2, mt: 3, mb: 2 }}
                            required
                        >
                            Profile Picture
                            <VisuallyHiddenInput type="file" />
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, marginLeft: "auto" }}
                        >
                            Save
                        </Button>
                    </Grid>
                </Paper>
            )}
        </Container>
    );
}
