import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";

import Link from "@mui/material/Link";
import { Link as routerLink } from "react-router-dom";

import { IconButton, Icon, Typography } from "@mui/material";

export default function TopBar() {
    //Menu button handling:
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
        >
            <Toolbar sx={{ flexWrap: "wrap", justifyContent: "flex-end" }}>
                <nav>
                    <Link
                        component={routerLink}
                        to="/"
                        variant="button"
                        color="text.primary"
                        href="#"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Swiper
                    </Link>
                    <Link
                        component={routerLink}
                        to="/chat"
                        variant="button"
                        color="text.primary"
                        href="#"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Messages
                    </Link>
                </nav>
                <IconButton sx={{ my: 1, mx: 1.5 }} onClick={handleClick}>
                    <Icon>menu</Icon>
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    <MenuItem
                        onClick={handleClose}
                        component={routerLink}
                        to="/settings"
                    >
                        Profile Settings
                    </MenuItem>
                    <MenuItem onClick={handleClose}>Images</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
}
