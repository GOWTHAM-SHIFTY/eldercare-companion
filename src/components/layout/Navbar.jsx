import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

function Navbar({ tab, setTab }) {
  return (
    <Box
      sx={{
        position: "sticky",
        bottom: 20,
        display: "flex",
        justifyContent: "center",
        zIndex: 20,
      }}
    >
      <Box
        sx={{
          backdropFilter: "blur(12px)",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 0.55)" // ✅ light glass
              : "rgba(25, 34, 55, 0.45)", // ✅ dark glass
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          borderRadius: "18px",
          border: "1px solid rgba(255,255,255,0.3)",
          px: 2,
        }}
      >
        <Tabs
          value={tab}
          onChange={(e, newVal) => setTab(newVal)}
          centered
          TabIndicatorProps={{
            sx: {
              display: "none",
            },
          }}
          sx={{
            minHeight: "55px",

            "& .MuiTab-root": {
              fontWeight: 600,
              minHeight: "55px",
              color: (theme) =>
                theme.palette.mode === "light" ? "#0D1B2A" : "#E7ECF3",
              textTransform: "none",
              fontSize: "15px",
              px: 2,
              transition: "0.2s ease",

              "&:hover": {
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? "rgba(255,255,255,0.4)"
                    : "rgba(255,255,255,0.1)",
                borderRadius: "12px",
              },
            },

            "& .Mui-selected": {
              color: "#4A8DFF !important",
              fontWeight: "bold",
            },
          }}
        >
          <Tab label="Dashboard" />
          <Tab label="Diet" />
          <Tab label="Hydration" />
          <Tab label="Medicine" />
          <Tab label="Report" />
        </Tabs>
      </Box>
    </Box>
  );
}

export default Navbar;
