import React, { useState } from "react";
import { ThemeProvider, createTheme, CssBaseline, Box } from "@mui/material";

import Header from "../src/components/layout/Header";
import Navbar from "../src/components/layout/Navbar";

import Dashboard from "./components/Dashboard";
import Diet from "./components/Diet";
import Hydration from "./components/Hydration";
import Medicine from "./components/Medicine";
import Report from "./components/Report";

function App() {
  const [tab, setTab] = useState(0);

  // ✅ Get theme mode from localStorage
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme-mode") || "light";
  });

  // ✅ Toggle Light/Dark mode
  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme-mode", newMode);
  };

  // ✅ GLOBAL THEME OVERRIDE (Glass UI + Soft Blue Theme)
  const theme = createTheme({
    palette: {
      mode,
      background: {
        default: mode === "light" ? "#E8F3FF" : "#0A1220", // ✅ SOFT BLUE / NAVY
        paper:
          mode === "light" ? "rgba(255,255,255,0.45)" : "rgba(20,28,48,0.45)", // ✅ GLASS EFFECT
      },
      primary: {
        main: "#4A8DFF", // Fresh modern blue
      },
      text: {
        primary: mode === "light" ? "#0D1B2A" : "#E7ECF3",
        secondary: mode === "light" ? "#345670" : "#A8B3C4",
      },
    },

    // ✅ Global UI Component Styles
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(14px)",
            backgroundColor:
              mode === "light"
                ? "rgba(255,255,255,0.55)"
                : "rgba(25,34,55,0.55)",
            borderRadius: "18px",
            border: "1px solid rgba(255,255,255,0.35)",
            boxShadow: "0 8px 26px rgba(0,0,0,0.1)",
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(14px)",
            backgroundColor:
              mode === "light"
                ? "rgba(255,255,255,0.45)"
                : "rgba(25,34,55,0.45)",
          },
        },
      },

      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 600,
            padding: "10px 16px",
            backdropFilter: "blur(8px)",
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor:
              mode === "light"
                ? "rgba(255,255,255,0.45)"
                : "rgba(25,34,55,0.45)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* ✅ Full App Background */}
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "background.default",
          transition: "0.3s",
        }}
      >
        {/* ✅ Header with Theme Toggle */}
        <Header mode={mode} toggleTheme={toggleTheme} />

        {/* ✅ Bottom Navigation */}
        <Navbar tab={tab} setTab={setTab} />

        {/* ✅ Page Content */}
        <Box p={3}>
          {tab === 0 && <Dashboard />}
          {tab === 1 && <Diet />}
          {tab === 2 && <Hydration />}
          {tab === 3 && <Medicine />}
          {tab === 4 && <Report />}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
