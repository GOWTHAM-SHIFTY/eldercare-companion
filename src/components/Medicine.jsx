import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

import MedicationIcon from "@mui/icons-material/Medication";
import DeleteIcon from "@mui/icons-material/Delete";
import AlarmIcon from "@mui/icons-material/Alarm";
import { RadioGroup, FormControlLabel, Radio, Checkbox } from "@mui/material";
function Medicine() {
  // ✅ Load from localStorage
  const [medicines, setMedicines] = useState(() => {
    const saved = localStorage.getItem("medicine-v3");
    return saved ? JSON.parse(saved) : [];
  });

  const [open, setOpen] = useState(false);

  // ✅ Form State
  const [form, setForm] = useState({
    name: "",
    dose: "",
    food: "",
    duration: "",
    timings: [],
  });

  // ✅ Save every change
  useEffect(() => {
    localStorage.setItem("medicine-v3", JSON.stringify(medicines));
  }, [medicines]);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  // ✅ Ultra Light Blue Glass Card Style
  const glassCard = {
    p: 3,
    borderRadius: "22px",
    background: (theme) =>
      theme.palette.mode === "light"
        ? "rgba(230, 245, 255, 0.60)" // ✅ Light Blue Glass
        : "rgba(20, 28, 55, 0.45)", // ✅ Dark Navy Glass
    backdropFilter: "blur(25px) saturate(200%)",
    WebkitBackdropFilter: "blur(25px) saturate(200%)",
    border: "1px solid rgba(255,255,255,0.4)",
    boxShadow:
      "0 10px 28px rgba(0,0,0,0.12), inset 0 0 1px rgba(255,255,255,0.6)",
    transition: "0.3s ease",
  };

  // ✅ Add Medicine
  const addMedicine = () => {
    if (
      !form.name ||
      !form.dose ||
      !form.food ||
      !form.duration ||
      form.timings.length === 0
    )
      return;

    const today = new Date();
    const duration = Number(form.duration);

    const schedule = Array.from({ length: duration }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i);

      const timings = form.timings.map((t) => ({
        timeLabel: t,
        taken: false,
      }));

      return {
        day: i + 1,
        date: date.toLocaleDateString(),
        timings,
      };
    });

    const entry = {
      id: Date.now(),
      name: form.name,
      dose: form.dose,
      food: form.food,
      duration,
      createdOn: today.toLocaleDateString(),
      schedule,
    };

    setMedicines([...medicines, entry]);
    closeDialog();

    setForm({ name: "", dose: "", food: "", duration: "", timings: [] });
  };

  // ✅ Mark Taken
  const markTaken = (medId, dayIdx, timeIdx) => {
    setMedicines((prev) =>
      prev.map((med) =>
        med.id === medId
          ? {
              ...med,
              schedule: med.schedule.map((d, dIndex) =>
                dIndex === dayIdx
                  ? {
                      ...d,
                      timings: d.timings.map((t, tIndex) =>
                        tIndex === timeIdx ? { ...t, taken: true } : t,
                      ),
                    }
                  : d,
              ),
            }
          : med,
      ),
    );
  };

  // ✅ Delete Medicine
  const deleteMed = (id) => {
    setMedicines(medicines.filter((m) => m.id !== id));
  };

  // ✅ Month Split
  const chunkByMonth = (schedule) => {
    const result = [];
    for (let i = 0; i < schedule.length; i += 30) {
      result.push(schedule.slice(i, i + 30));
    }
    return result;
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" textAlign="center" fontWeight="bold" mb={3}>
        Medicine Tracker
      </Typography>

      {/* ADD BUTTON */}
      <Box textAlign="center" mb={3}>
        <Button variant="contained" onClick={openDialog}>
          ➕ Add Medicine
        </Button>
      </Box>

      {/* ✅ Add Medicine Dialog */}
      <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="sm">
        <DialogTitle>Add Medicine</DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Medicine Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Dose"
                value={form.dose}
                onChange={(e) => setForm({ ...form, dose: e.target.value })}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Duration (Days)"
                type="number"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
              />
            </Grid>

            {/* FOOD */}
            <Grid item xs={12}>
              <Typography sx={{ mb: 1, fontWeight: 600 }}>
                Food Instruction
              </Typography>

              <RadioGroup
                value={form.food}
                onChange={(e) => setForm({ ...form, food: e.target.value })}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(255,255,255,0.55)"
                      : "rgba(35,45,70,0.55)",
                  p: 2,
                  borderRadius: 2,
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                <FormControlLabel
                  value="Before Food"
                  control={<Radio />}
                  label="Before Food"
                />
                <FormControlLabel
                  value="After Food"
                  control={<Radio />}
                  label="After Food"
                />
              </RadioGroup>
            </Grid>

            {/* TIMINGS */}
            <Grid item xs={12}>
              <Typography sx={{ mb: 1, fontWeight: 600 }}>
                Select Timings
              </Typography>

              <Box
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? "rgba(255,255,255,0.55)"
                      : "rgba(35,45,70,0.55)",
                  p: 2,
                  borderRadius: 2,
                  backdropFilter: "blur(14px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.timings.includes("Morning")}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setForm({
                          ...form,
                          timings: checked
                            ? [...form.timings, "Morning"]
                            : form.timings.filter((t) => t !== "Morning"),
                        });
                      }}
                    />
                  }
                  label="Morning"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.timings.includes("Afternoon")}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setForm({
                          ...form,
                          timings: checked
                            ? [...form.timings, "Afternoon"]
                            : form.timings.filter((t) => t !== "Afternoon"),
                        });
                      }}
                    />
                  }
                  label="Afternoon"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.timings.includes("Evening")}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setForm({
                          ...form,
                          timings: checked
                            ? [...form.timings, "Evening"]
                            : form.timings.filter((t) => t !== "Evening"),
                        });
                      }}
                    />
                  }
                  label="Evening"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.timings.includes("Night")}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setForm({
                          ...form,
                          timings: checked
                            ? [...form.timings, "Night"]
                            : form.timings.filter((t) => t !== "Night"),
                        });
                      }}
                    />
                  }
                  label="Night"
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button variant="contained" onClick={addMedicine}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* ✅ Medicine List */}
      <Grid container spacing={3}>
        {medicines.map((med) => (
          <Grid item xs={12} key={med.id}>
            <Card sx={glassCard}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <MedicationIcon sx={{ fontSize: 35, mr: 1 }} />
                  <Typography variant="h5">{med.name}</Typography>

                  <IconButton
                    sx={{ ml: "auto" }}
                    onClick={() => deleteMed(med.id)}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </Box>

                <Typography color="text.secondary">Dose: {med.dose}</Typography>
                <Typography color="text.secondary">Food: {med.food}</Typography>
                <Typography color="text.secondary">
                  Duration: {med.duration} days
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* ✅ Month Splitting */}
                {chunkByMonth(med.schedule).map((month, index) => (
                  <Box key={index} sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      📅 Month {index + 1}
                    </Typography>

                    <Grid container spacing={2}>
                      {month.map((day, dIdx) => (
                        <Grid item xs={12} md={4} key={dIdx}>
                          <Card
                            sx={{
                              p: 2,
                              borderRadius: "18px",
                              background: (theme) =>
                                theme.palette.mode === "light"
                                  ? "rgba(255,255,255,0.55)"
                                  : "rgba(35,45,70,0.55)",
                              backdropFilter: "blur(18px)",
                              border: "1px solid rgba(255,255,255,0.3)",
                            }}
                          >
                            <Typography fontWeight="bold">
                              Day {day.day}
                            </Typography>
                            <Typography>Date: {day.date}</Typography>

                            <Divider sx={{ my: 1 }} />

                            {day.timings.map((t, tIdx) => (
                              <Box key={tIdx} sx={{ mt: 1 }}>
                                <Typography
                                  sx={{ display: "flex", alignItems: "center" }}
                                >
                                  <AlarmIcon sx={{ fontSize: 18, mr: 1 }} />{" "}
                                  {t.timeLabel}
                                </Typography>

                                {t.taken ? (
                                  <Chip
                                    label="✅ Taken"
                                    color="success"
                                    size="small"
                                    sx={{ mt: 1 }}
                                  />
                                ) : (
                                  <Button
                                    variant="contained"
                                    size="small"
                                    sx={{ mt: 1 }}
                                    onClick={() =>
                                      markTaken(med.id, day.day - 1, tIdx)
                                    }
                                  >
                                    Mark Taken
                                  </Button>
                                )}
                              </Box>
                            ))}
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Medicine;
