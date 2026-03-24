import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import WheelchairPickupIcon from "@mui/icons-material/WheelchairPickup";
function Header({ mode, toggleTheme }) {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: "blur(12px)",
        backgroundColor:
          mode === "light"
            ? "rgba(255, 255, 255, 0.45)" // ✅ Light glass
            : "rgba(25, 34, 55, 0.45)", // ✅ Dark glass
        borderBottom: "1px solid rgba(255,255,255,0.25)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.10)",
        borderRadius: "0 0 18px 18px", // ✅ Smooth curved bottom
        mb: 2,
        transition: "0.3s ease",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            gap: 1,
            background:
              mode === "light"
                ? "linear-gradient(90deg, #0054D1, #4A8DFF)"
                : "linear-gradient(90deg, #9CC3FF, #D1E3FF)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            letterSpacing: "0.8px",
          }}
        >
          <WheelchairPickupIcon
            sx={{
              fontSize: 28,
              color: mode === "light" ? "#0D1B2A" : "#E7ECF3",
              filter:
                mode === "light"
                  ? "drop-shadow(0 0 2px rgba(0,0,0,0.2))"
                  : "drop-shadow(0 0 3px rgba(255,255,255,0.3))",
            }}
          />
          Eldercare-Companion
        </Typography>
        {/* ✅ Theme Toggle Button */}
        <IconButton
          onClick={toggleTheme}
          sx={{
            color: mode === "light" ? "#0D1B2A" : "#E7ECF3",
            backdropFilter: "blur(8px)",
            backgroundColor:
              mode === "light"
                ? "rgba(255,255,255,0.4)"
                : "rgba(255,255,255,0.1)",
            borderRadius: "50%",
            p: 1,
            transition: "0.3s",
            "&:hover": {
              backgroundColor:
                mode === "light"
                  ? "rgba(255,255,255,0.7)"
                  : "rgba(255,255,255,0.2)",
            },
          }}
        >
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
