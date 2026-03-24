import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

function ThemeToggle({ mode, toggleTheme }) {
  return (
    <Tooltip title={mode === "light" ? "Dark Mode" : "Light Mode"}>
      <IconButton onClick={toggleTheme} color="inherit">
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
}

export default ThemeToggle;
