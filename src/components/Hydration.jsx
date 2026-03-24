import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  Button,
  Grid,
  Slider,
  IconButton,
  Divider,
  TextField,
  Switch,
  FormControlLabel,
} from "@mui/material";

import RestoreIcon from "@mui/icons-material/Restore";

// ✅ Wave SVG
const WAVE_SVG = `
<svg viewBox="0 0 1200 200" preserveAspectRatio="none">
  <path d="M0,80 C300,150 900,10 1200,80 L1200,200 L0,200 Z" fill="rgba(33,150,243,0.7)" />
</svg>
`;

function Hydration() {
  const [water, setWater] = useState(() => {
    const s = localStorage.getItem("hydration-v3");
    return s ? JSON.parse(s) : 0;
  });

  const [goal] = useState(2000);
  const [note, setNote] = useState(
    localStorage.getItem("hydration-note") || "",
  );
  const [reminder, setReminder] = useState(() => {
    const s = localStorage.getItem("hydration-reminder");
    return s ? JSON.parse(s) : false;
  });

  const [streak, setStreak] = useState(() => {
    const s = localStorage.getItem("hydration-streak");
    return s ? JSON.parse(s) : 0;
  });

  const [customVal, setCustomVal] = useState(0);

  const percent = Math.min((water / goal) * 100, 100);

  // ✅ Save data
  useEffect(() => {
    localStorage.setItem("hydration-v3", JSON.stringify(water));
    localStorage.setItem("hydration-note", note);
    localStorage.setItem("hydration-streak", JSON.stringify(streak));
    localStorage.setItem("hydration-reminder", JSON.stringify(reminder));
  }, [water, note, streak, reminder]);

  // ✅ Auto reset at midnight
  useEffect(() => {
    const now = new Date();
    const nextMidnight = new Date();
    nextMidnight.setHours(24, 0, 0, 0);

    const ms = nextMidnight - now;
    const timer = setTimeout(() => {
      if (water >= goal) setStreak((s) => s + 1);
      else setStreak(0);
      setWater(0);
    }, ms);

    return () => clearTimeout(timer);
  }, [water, goal]);

  // ✅ Hourly reminder + TTS
  useEffect(() => {
    if (!reminder) return;

    const interval = setInterval(() => {
      const msg = "💧 Please drink water!";
      alert(msg);

      const speak = new SpeechSynthesisUtterance(msg);
      speak.rate = 0.9;
      window.speechSynthesis.speak(speak);

      new Audio(
        "https://assets.mixkit.co/sfx/preview/mixkit-bell-notification-933.mp3",
      ).play();
    }, 3600000);

    return () => clearInterval(interval);
  }, [reminder]);

  const resetWater = () => {
    if (window.confirm("Reset today's intake?")) setWater(0);
  };

  const bottleBg = `
    linear-gradient(to bottom, transparent ${100 - percent}%, #2196f3 ${100 - percent}%)
  `;

  // ✅ ULTRA LIGHT BLUE GLASS CARD STYLE
  const glassCard = {
    p: 3,
    borderRadius: "22px",
    background: (theme) =>
      theme.palette.mode === "light"
        ? "rgba(230, 245, 255, 0.60)" // ✅ Very light sky-blue frosted glass
        : "rgba(20, 28, 55, 0.45)", // ✅ Navy glass dark mode
    backdropFilter: "blur(25px) saturate(200%)",
    WebkitBackdropFilter: "blur(25px) saturate(200%)",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    boxShadow:
      "0 10px 28px rgba(0,0,0,0.12), inset 0 0 1px rgba(255,255,255,0.6)",
    transition: "0.3s ease",
  };

  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ maxWidth: 1100, width: "100%" }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={3}>
          Hydration Tracker
        </Typography>

        <Grid container spacing={3}>
          {/* ✅ Bottle Card */}
          <Grid item xs={12} md={6}>
            <Card sx={glassCard}>
              <Typography variant="h6" mb={2}>
                Hydration Bottle
              </Typography>

              <Box
                sx={{
                  width: 200,
                  height: 380,
                  mx: "auto",
                  borderRadius: "50px",
                  border: "4px solid",
                  borderColor: "primary.main",
                  position: "relative",
                  overflow: "hidden",
                  backgroundColor: "background.default",
                }}
              >
                {/* Fill */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    height: `${percent}%`,
                    background: bottleBg,
                    transition: "0.5s",
                  }}
                />

                {/* Wave */}
                <Box
                  component="div"
                  dangerouslySetInnerHTML={{ __html: WAVE_SVG }}
                  sx={{
                    position: "absolute",
                    bottom: `${percent - 3}%`,
                    width: "100%",
                    height: "100px",
                    opacity: 0.8,
                  }}
                />
              </Box>

              <Typography variant="h6" mt={2}>
                {water} ml / {goal} ml
              </Typography>

              <IconButton onClick={resetWater}>
                <RestoreIcon color="error" />
              </IconButton>

              <Divider sx={{ my: 2 }} />

              <FormControlLabel
                control={
                  <Switch
                    checked={reminder}
                    onChange={() => setReminder(!reminder)}
                  />
                }
                label={<Typography>Hourly Drink Reminder</Typography>}
              />

              <Typography mt={2} variant="h6">
                Streak: 🔥 {streak} days
              </Typography>
            </Card>
          </Grid>

          {/* ✅ Controls Card */}
          <Grid item xs={12} md={6}>
            <Card sx={glassCard}>
              <Typography variant="h6">Add Water Intake</Typography>

              <Grid container spacing={2} mt={1}>
                {[100, 150, 250, 300, 500, 1000].map((ml) => (
                  <Grid item xs={6} key={ml}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ py: 2 }}
                      onClick={() => setWater(water + ml)}
                    >
                      +{ml} ml
                    </Button>
                  </Grid>
                ))}
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6">Custom Amount</Typography>

              <Slider
                min={50}
                max={1000}
                step={50}
                value={customVal}
                onChange={(e, val) => setCustomVal(val)}
                onChangeCommitted={(e, val) => setWater(water + val)}
                sx={{ mt: 2 }}
              />

              <Typography
                textAlign="center"
                variant="h6"
                color="primary"
                sx={{ mt: -1, mb: 2 }}
              >
                Selected: {customVal} ml
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6">Caretaker Notes</Typography>

              <TextField
                multiline
                rows={3}
                sx={{ mt: 1 }}
                fullWidth
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write hydration notes..."
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Hydration;
