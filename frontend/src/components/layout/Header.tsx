import {
  AppBar,
  Box,
  Typography,
  Button,
  Toolbar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
// import useLoginStore from "../../stores/loginStore";
import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
// import "../../styles/Header.css";
import AuthButtons from "./AuthButtons";
import * as React from "react";

const Header = () => {
  // const { isLoggedIn, user, logout } = useLoginStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Local state for menu

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ height: "65px" }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: "bold" }}>
            Landing
          </Typography>

          <AuthButtons />

          {/* {!isLoggedIn ? (
            <AuthButtons />
          ) : (
            <>
              <Button color="inherit" onClick={() => alert("New deck")}>
                New deck
              </Button>
              <Button
                color="inherit"
                onClick={handleMenuOpen}
                aria-controls="user-menu"
                aria-haspopup="true"
                aria-label="Open user menu"
              >
                {user?.name || "User"}
                <MenuIcon sx={{ ml: 1 }} />
              </Button>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                aria-label="User menu"
              >
                <MenuItem
                  onClick={() => alert("Profile or Dashboard")}
                  className="menu-item"
                >
                  Profile <HomeOutlinedIcon />
                </MenuItem>
                <MenuItem
                  onClick={() => alert("Settings")}
                  className="menu-item"
                >
                  Settings <SettingsOutlinedIcon />
                </MenuItem>
                <MenuItem
                  onClick={() => alert("New deck")}
                  className="menu-item"
                >
                  New deck <AddOutlinedIcon />
                </MenuItem>
                <MenuItem onClick={handleLogout} className="menu-item">
                  Log out <LogoutOutlinedIcon />
                </MenuItem>
              </Menu>
            </>
          )} */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Header;
