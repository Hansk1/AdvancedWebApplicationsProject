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
} from "@mui/material";

export default function ProfileSettings() {
    return (
        <Container maxWidth="md" sx={{ mt: 8 }}>
            <Grid
                container
                component={Paper}
                rowSpacing={2}
                columnSpacing={2}
                elevation={7}
                sx={{ paddingRight: 2 }}
            >
                <Grid item xs={12} sm={6}>
                    <TextField label="Firstname" placeholder="John" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label="Lastname" placeholder="John" fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
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
        </Container>
    );
}
