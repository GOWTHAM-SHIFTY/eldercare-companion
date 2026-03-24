import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Chip,
} from "@mui/material";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ✅ Dummy Improvement Graph Data
const improvementData = [
  { day: "Mon", score: 60 },
  { day: "Tue", score: 65 },
  { day: "Wed", score: 70 },
  { day: "Thu", score: 75 },
  { day: "Fri", score: 78 },
  { day: "Sat", score: 80 },
  { day: "Sun", score: 82 },
];

function Dashboard() {
  // ✅ READ DATA FROM LOCAL STORAGE
  const hydration = JSON.parse(
    localStorage.getItem("elder-hydration-v2") || "0",
  );
  const diet = JSON.parse(localStorage.getItem("elder-diet-simple") || "[]");
  const medicine = JSON.parse(localStorage.getItem("medicines-v2") || "[]");

  // ✅ TODAY'S SUMMARY
  const waterIntake = hydration;
  const mealsTaken = diet.length;
  const medsPending = medicine.filter((m) =>
    m.schedule.some((d) => d.timings?.some((t) => !t.taken)),
  ).length;

  // ✅ GLASS CARD STYLE (Reusable)
  const glassCard = {
    p: 3,
    borderRadius: "22px",
    background: (theme) =>
      theme.palette.mode === "light"
        ? "rgba(230, 245, 255, 0.60)" // ✅ EVEN LIGHTER sky-blue frosted glass
        : "rgba(20, 28, 55, 0.45)", // ✅ Dark navy glass
    backdropFilter: "blur(25px) saturate(200%)",
    WebkitBackdropFilter: "blur(25px) saturate(200%)",
    border: (theme) =>
      theme.palette.mode === "light"
        ? "1px solid rgba(255, 255, 255, 0.50)"
        : "1px solid rgba(255, 255, 255, 0.20)",
    boxShadow:
      "0 10px 30px rgba(0, 0, 0, 0.11), inset 0 0 1px rgba(255,255,255,0.5)",
    transition: "0.3s ease",

    "&:hover": {
      boxShadow:
        "0 14px 36px rgba(0,0,0,0.18), inset 0 0 1.5px rgba(255,255,255,0.65)",
      background: (theme) =>
        theme.palette.mode === "light"
          ? "rgba(235, 248, 255, 0.70)" // ✅ Brighter hover effect
          : "rgba(25, 34, 65, 0.55)",
    },
  };
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
        Dashboard
      </Typography>

      {/* ✅ TOP 3 SUMMARY CARDS */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={glassCard}>
            <Typography variant="h6">💧 Water Intake</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="h4" fontWeight="bold">
              {waterIntake} ml
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Today’s hydration progress
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={glassCard}>
            <Typography variant="h6">🍽️ Meals Completed</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="h4" fontWeight="bold">
              {mealsTaken} Items
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Today’s diet log
            </Typography>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={glassCard}>
            <Typography variant="h6">💊 Medicines Pending</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography
              variant="h4"
              fontWeight="bold"
              color={medsPending > 0 ? "error" : "success"}
            >
              {medsPending}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dose reminders for today
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* ✅ WEEKLY IMPROVEMENT GRAPH */}
      <Box mt={5}>
        <Card sx={glassCard}>
          <Typography variant="h6" mb={2}>
            📈 Weekly Health Improvement Trend
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={improvementData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#4A8DFF"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </Box>

      {/* ✅ HEALTH INSIGHTS */}
      <Box mt={5}>
        <Card sx={glassCard}>
          <Typography variant="h6" mb={2}>
            🩺 Today's Health Insights
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {/* ✅ HYDRATION */}
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight="bold">
              💧 Hydration Status
            </Typography>

            <Typography sx={{ mt: 0.5 }}>
              Intake: <b>{waterIntake} ml</b>
            </Typography>

            <Chip
              label={
                waterIntake >= 2000
                  ? "Good Hydration"
                  : waterIntake >= 1000
                    ? "Moderate Hydration"
                    : "Low Hydration"
              }
              color={
                waterIntake >= 2000
                  ? "success"
                  : waterIntake >= 1000
                    ? "warning"
                    : "error"
              }
              sx={{ mt: 1 }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* ✅ DIET */}
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight="bold">
              🍽️ Diet Summary
            </Typography>

            <Typography sx={{ mt: 0.5 }}>
              Meals logged today: <b>{mealsTaken}</b>
            </Typography>

            {mealsTaken === 0 ? (
              <Chip label="No meals added yet" color="warning" sx={{ mt: 1 }} />
            ) : (
              <Chip label="Diet logged" color="success" sx={{ mt: 1 }} />
            )}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* ✅ MEDS */}
          <Box mb={3}>
            <Typography variant="subtitle1" fontWeight="bold">
              💊 Medicines Status
            </Typography>

            <Typography sx={{ mt: 0.5 }}>
              Pending doses: <b>{medsPending}</b>
            </Typography>

            <Chip
              label={
                medsPending === 0 ? "All medicines taken" : "Pending doses"
              }
              color={medsPending === 0 ? "success" : "error"}
              sx={{ mt: 1 }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* ✅ SUGGESTIONS */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              ✅ Care Suggestions
            </Typography>

            <Typography sx={{ mt: 0.5 }}>
              {waterIntake < 1000
                ? "• Elder needs more hydration today."
                : waterIntake < 2000
                  ? "• Hydration is on track, keep monitoring."
                  : "• Hydration goal achieved, great job!"}
            </Typography>

            <Typography>
              {medsPending > 0
                ? "• Ensure pending medicines are given on time."
                : "• All medicines have been taken today."}
            </Typography>

            <Typography>
              {mealsTaken === 0
                ? "• No meals logged yet — update diet log."
                : "• Diet log is up to date."}
            </Typography>
          </Box>
        </Card>
      </Box>

      {/* ✅ DAILY REPORT */}
      <Box mt={5}>
        <Card sx={glassCard}>
          <Typography variant="h6" mb={2}>
            📝 Daily Report Summary
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Diet Summary
              </Typography>

              {mealsTaken === 0 ? (
                <Typography color="text.secondary">No meals logged</Typography>
              ) : (
                diet
                  .slice(0, 5)
                  .map((m) => (
                    <Chip
                      key={m.id}
                      label={`${m.name} (${m.category})`}
                      sx={{ m: 0.5 }}
                    />
                  ))
              )}
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Box>
  );
}

export default Dashboard;
