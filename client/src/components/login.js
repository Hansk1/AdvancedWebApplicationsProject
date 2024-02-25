import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { Link as routerLink } from "react-router-dom";
import Cookies from "js-cookie";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Finder
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export default function SignIn() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    const submit = (event) => {
        event.preventDefault();
        fetch("/users/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(userData),
            mode: "cors",
        })
            .then((response) => response.json())
            .then(async (data) => {
                if (data.token) {
                    //Save the jwt token in browser cookies
                    Cookies.set("token", data.token, {
                        expires: 1,
                        secure: true,
                    });

                    const user = await JSON.parse(
                        Buffer.from(
                            data.token.split(".")[1],
                            "base64"
                        ).toString()
                    );

                    //save the userData in browser cookies
                    Cookies.set("user", JSON.stringify(user), {
                        expires: 1,
                        secure: true,
                    });

                    // Because of the time constraints of the project, we handle the redirection with a reload. The navigate function doesn't redirect, and I don't know why :).
                    window.location.reload();
                    // navigate("/");
                }
            });
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={submit}
                    onChange={handleChange}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link
                                href="#"
                                variant="body2"
                                component={routerLink}
                                to="/register"
                            >
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}
