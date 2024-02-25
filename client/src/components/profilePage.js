import { useLocation } from "react-router-dom";
import {
    Container,
    Box,
    Typography,
    Button,
    CssBaseline,
    Avatar,
    Paper,
} from "@mui/material";

export default function ProfilePage() {
    const location = useLocation();
    const { user, picture } = location.state;

    return (
        <Container
            component="main"
            maxWidth="md"
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <CssBaseline />

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
                        src={picture}
                        sx={{ height: "60px", width: "60px" }}
                    ></Avatar>
                    <Typography variant="h4">{user.firstName}</Typography>
                    <Typography variant="h4">{user.lastName}</Typography>
                    <Typography variant="h6">
                        {user.registerationDate}
                    </Typography>
                </Box>
                <Typography sx={{ mx: 2, marginBottom: 2 }}>
                    {user.profileText}
                </Typography>
            </Paper>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 3,
                    justifyContent: "center",
                }}
            ></Box>
        </Container>
    );
}
