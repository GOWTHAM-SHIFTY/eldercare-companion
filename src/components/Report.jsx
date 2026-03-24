import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import WarningIcon from "@mui/icons-material/Warning";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import PhoneIcon from "@mui/icons-material/Phone";

function Report() {
  // ✅ Dummy Profile Data
  const elder = {
    name: "Mr. Ramaswamy",
    age: 78,
    bloodGroup: "B+",
    conditions: [
      "Diabetes (Type 2)",
      "High Blood Pressure",
      "Arthritis (Knee Pain)",
      "Mild Memory Loss",
    ],
    allergies: ["Peanuts", "Seafood", "Strong Painkillers"],
    routine: [
      "Morning Walk – 6:30 AM",
      "Breakfast – 8:00 AM",
      "Diabetes Tablet – 9:00 AM",
      "Lunch – 1:00 PM",
      "Evening Snack – 5:00 PM",
      "BP Medicine – 7:00 PM",
      "Dinner – 8:00 PM",
    ],
    dos: [
      "Give warm water every 2 hours",
      "Use less oil & salt in food",
      "Ensure timely medicines",
      "Assist in slow morning walk",
      "Provide fruits daily",
    ],
    donts: [
      "Avoid deep fried items",
      "Avoid sugary drinks",
      "Don’t let them walk alone",
      "Avoid cold water at night",
      "No peanuts/seafood",
    ],
    emergencyContact: {
      caretaker: "Suresh (Son)",
      phone: "+91 9########0",
      doctor: "Dr. Aravind – Geriatric Specialist",
      doctorPhone: "+91 90000 12345",
    },
  };

  // ✅ Ultra Light Glass Card Styles
  const glassCard = {
    p: 3,
    borderRadius: "22px",
    background: (theme) =>
      theme.palette.mode === "light"
        ? "rgba(230, 245, 255, 0.60)" // ✅ Very Light Blue Glass
        : "rgba(20, 28, 55, 0.45)", // ✅ Dark Navy Glass
    backdropFilter: "blur(25px) saturate(200%)",
    WebkitBackdropFilter: "blur(25px) saturate(200%)",
    border: "1px solid rgba(255,255,255,0.35)",
    boxShadow:
      "0 10px 28px rgba(0,0,0,0.10), inset 0 0 1px rgba(255,255,255,0.5)",
    transition: "0.3s ease",
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" textAlign="center" fontWeight="bold" mb={3}>
        Personal Report
      </Typography>

      <Grid container spacing={3}>
        {/* ✅ BASIC DETAILS */}
        <Grid item xs={12} md={6}>
          <Card sx={glassCard}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <PersonIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Basic Details</Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Typography>
                <b>Name:</b> {elder.name}
              </Typography>
              <Typography>
                <b>Age:</b> {elder.age} years
              </Typography>
              <Typography>
                <b>Blood Group:</b> {elder.bloodGroup}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* ✅ MEDICAL CONDITIONS */}
        <Grid item xs={12} md={6}>
          <Card sx={glassCard}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <MedicalInformationIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Medical Conditions</Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {elder.conditions.map((c, i) => (
                  <Chip key={i} label={c} color="error" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ✅ ALLERGIES */}
        <Grid item xs={12}>
          <Card sx={glassCard}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <WarningIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Allergies</Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {elder.allergies.map((al, i) => (
                  <Chip key={i} label={al} color="warning" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* ✅ DAILY ROUTINE */}
        <Grid item xs={12}>
          <Card sx={glassCard}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <AccessTimeIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Daily Routine</Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <List>
                {elder.routine.map((r, i) => (
                  <ListItem key={i} sx={{ pl: 0 }}>
                    <ListItemText primary={`• ${r}`} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* ✅ DO’s */}
        <Grid item xs={12} md={6}>
          <Card sx={glassCard}>
            <CardContent>
              <Typography variant="h6" mb={1}>
                ✅ Things To Do
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <List>
                {elder.dos.map((d, i) => (
                  <ListItem key={i} sx={{ pl: 0 }}>
                    <ListItemText primary={`• ${d}`} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* ✅ DON'Ts */}
        <Grid item xs={12} md={6}>
          <Card sx={glassCard}>
            <CardContent>
              <Typography variant="h6" mb={1}>
                ❌ Things NOT To Do
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <List>
                {elder.donts.map((d, i) => (
                  <ListItem key={i} sx={{ pl: 0 }}>
                    <ListItemText primary={`• ${d}`} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* ✅ EMERGENCY CONTACT */}
        <Grid item xs={12}>
          <Card sx={glassCard}>
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <PhoneIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Emergency Contacts</Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Typography>
                <b>Caretaker:</b> {elder.emergencyContact.caretaker}
              </Typography>
              <Typography>
                <b>Phone:</b> {elder.emergencyContact.phone}
              </Typography>

              <Typography sx={{ mt: 2 }}>
                <b>Doctor:</b> {elder.emergencyContact.doctor}
              </Typography>
              <Typography>
                <b>Doctor Phone:</b> {elder.emergencyContact.doctorPhone}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Report;
