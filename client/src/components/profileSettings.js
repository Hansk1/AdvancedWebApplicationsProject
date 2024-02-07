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
    getAppBarUtilityClass,
    InputLabel,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function ProfileSettings({ user, jwt }) {
    const [foundUser, setFoundUser] = useState(null);
    const [userData, setUserData] = useState({});
    useEffect(() => {
        dataFetch();
    }, []);

    const dataFetch = async () => {
        const data = {
            _id: user.id,
        };
        const response = await fetch("/users/userdata", {
            method: "GET",
            headers: {
                Authorization: "bearer " + jwt,
            },
            mode: "cors",
        });

        const responseData = await response.json();

        if (responseData.foundUser) {
            console.log(responseData.foundUser);
            setFoundUser(responseData.foundUser);
        }
    };

    async function handleSubmit(event) {
        event.preventDefault();
        const dataPromise = await fetch("/users/update-user", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: "bearer " + jwt,
            },
            body: JSON.stringify(userData),
            mode: "cors",
        });

        const responseData = await dataPromise.json();
    }

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
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
                                htmlFor="firstName"
                                sx={{
                                    textAlign: "left",
                                    fontSize: "1.2rem",
                                    color: "black",
                                }}
                            >
                                Firstname
                            </InputLabel>
                            <TextField
                                id="firstName"
                                defaultValue={foundUser.firstName}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel
                                htmlFor="lastName"
                                sx={{
                                    textAlign: "left",
                                    fontSize: "1.2rem",
                                    color: "black",
                                }}
                            >
                                Lastname
                            </InputLabel>
                            <TextField
                                id="lastName"
                                defaultValue={foundUser.lastName}
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
