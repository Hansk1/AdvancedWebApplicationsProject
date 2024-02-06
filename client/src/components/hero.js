import * as React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

export default function Hero(props) {
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Welcome!
                </Typography>
            </Box>
            <Stack
                sx={{ marginTop: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
            >
                <Button variant="contained" sx={{ width: 100 }}>
                    LogIn
                </Button>
                <Button variant="contained" sx={{ width: 100 }}>
                    Register
                </Button>
            </Stack>
        </Container>
    );
}
