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
} from "@mui/material";

export default function ChatBox() {
    return (
        <Container maxWidth="md" sx={{ mt: 8 }}>
            <Grid
                container
                component={Paper}
                elevation={7}
                alignItems="stretch"
                direction="row"
                justifyContent="flex-end"
            >
                <Grid item xs={4} lg={4}>
                    <List>
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://material-ui.com/static/images/avatar/1.jpg"
                                />
                            </ListItemIcon>
                            <ListItemText primary="John Wick"></ListItemText>
                        </ListItem>
                        <Divider
                            orientation="horizontal"
                            flexItem
                            sx={{ mr: "-1px" }}
                        />
                        <ListItem button key="RemySharp">
                            <ListItemIcon>
                                <Avatar
                                    alt="Remy Sharp"
                                    src="https://material-ui.com/static/images/avatar/1.jpg"
                                />
                            </ListItemIcon>
                            <ListItemText primary="John Wick"></ListItemText>
                        </ListItem>
                    </List>
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ mr: "-1px" }} />
                <Grid
                    item
                    xs={8}
                    lg={8}
                    sx={{
                        overflowY: "auto",
                        maxHeight: "50vh",
                    }}
                >
                    <List>
                        <ListItem key="1">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="right"
                                        primary="Hey man, What's up ?"
                                    ></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="right"
                                        secondary="09:30"
                                    ></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="2">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="left"
                                        primary="Hey, Iam Good! What about you ?"
                                    ></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="left"
                                        secondary="09:31"
                                    ></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="3">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="right"
                                        primary="Cool. i am good, let's catch up!"
                                    ></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="right"
                                        secondary="10:30"
                                    ></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="1">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="right"
                                        primary="Hey man, What's up ?"
                                    ></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="right"
                                        secondary="09:30"
                                    ></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="2">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="left"
                                        primary="Hey, Iam Good! What about you ?"
                                    ></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="left"
                                        secondary="09:31"
                                    ></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="3">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="right"
                                        primary="Cool. i am good, let's catch up!"
                                    ></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="right"
                                        secondary="10:30"
                                    ></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="1">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="right"
                                        primary="Hey man, What's up ?"
                                    ></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="right"
                                        secondary="09:30"
                                    ></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="2">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="left"
                                        primary="Hey, Iam Good! What about you ?"
                                    ></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="left"
                                        secondary="09:31"
                                    ></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="3">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="right"
                                        primary="Cool. i am good, let's catch up!"
                                    ></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="right"
                                        secondary="10:30"
                                    ></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="1">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="right"
                                        primary="Hey man, What's up ?"
                                    ></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="right"
                                        secondary="09:30"
                                    ></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="2">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="left"
                                        primary="Hey, Iam Good! What about you ?"
                                    ></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="left"
                                        secondary="09:31"
                                    ></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <ListItem key="3">
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="right"
                                        primary="Cool. i am good, let's catch up!"
                                    ></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText
                                        align="right"
                                        secondary="10:30"
                                    ></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                    </List>
                </Grid>
                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ mr: "-0.9px" }}
                />
                <Grid item xs={8} sx={{ display: "flex", padding: 2 }}>
                    <TextField
                        id="outlined-basic-email"
                        label="Type Something"
                        fullWidth
                    />
                    <Button variant="">aha</Button>
                </Grid>
            </Grid>
        </Container>
    );
}
