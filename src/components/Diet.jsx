import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
  IconButton,
  Chip,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import RestaurantIcon from "@mui/icons-material/Restaurant";

// ✅ Healthy Indian Food Suggestions For Elders
const FOOD_SUGGESTIONS = [
  {
    category: "Breakfast",
    items: [
      { name: "Idli", benefit: "Light, gut friendly, very easy to digest" },
      { name: "Vegetable Upma", benefit: "High fiber and good morning energy" },
      { name: "Moong Dal Chilla", benefit: "High protein, diabetic friendly" },
      { name: "Oats Porridge", benefit: "Heart healthy and light" },
      { name: "Rava Dosa", benefit: "Crispy, light alternative to heavy dosa" },
    ],
  },
  {
    category: "Lunch",
    items: [
      { name: "Dal Rice", benefit: "Soft, protein rich, easy to digest" },
      { name: "Curd Rice", benefit: "Cooling and gut‑friendly for elders" },
      {
        name: "Vegetable Khichdi",
        benefit: "Perfect balanced meal for elders",
      },
      { name: "Sambar Rice", benefit: "Nutritious vegetables + light broth" },
      { name: "Chapati + Dal", benefit: "Balanced protein + carbs" },
    ],
  },
  {
    category: "Dinner",
    items: [
      { name: "Vegetable Soup", benefit: "Light and easy before sleep" },
      {
        name: "Moong Dal Soup",
        benefit: "Protein rich and soft for digestion",
      },
      { name: "Chapati + Veg Curry", benefit: "Light dinner, high fiber" },
      { name: "Upma", benefit: "Good carbs + veggies for elders" },
    ],
  },
  {
    category: "Snacks",
    items: [
      { name: "Banana", benefit: "Rich in potassium, digestion friendly" },
      { name: "Fruit Bowl", benefit: "Natural vitamins + hydration" },
      { name: "Nut Mix", benefit: "Healthy fats for brain and heart" },
      { name: "Tea + Digestive Biscuit", benefit: "Mild snack for elders" },
    ],
  },
];

export default function Diet() {
  // ✅ Today's Diet Log (LocalStorage)
  const [diet, setDiet] = useState(() => {
    const saved = localStorage.getItem("elder-diet-simple");
    return saved ? JSON.parse(saved) : [];
  });

  const [open, setOpen] = useState(false);
  const [foodInput, setFoodInput] = useState("");

  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem("elder-diet-simple", JSON.stringify(diet));
  }, [diet]);

  // ✅ Auto‑reset daily
  useEffect(() => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const ms = midnight - now;

    const timer = setTimeout(() => setDiet([]), ms);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Add food manually or from suggestion
  const addFood = () => {
    if (!foodInput.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: foodInput.trim(),
      benefit: selectedSuggestion?.benefit || "Custom food",
      category: selectedSuggestion?.category || "Manual Entry",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setDiet([...diet, newEntry]);
    setFoodInput("");
    setSelectedSuggestion(null);
    setOpen(false);
  };

  // ✅ Delete entry
  const deleteFood = (id) => {
    setDiet(diet.filter((d) => d.id !== id));
  };

  // ✅ Use suggestion
  const useSuggestion = (item, category) => {
    setSelectedSuggestion({ ...item, category });
    setFoodInput(item.name);
    setOpen(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Heading */}
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
        Healthy Diet Tracker
      </Typography>

      <Grid container spacing={3}>
        {/* ✅ Indian Food Suggestions */}
        {FOOD_SUGGESTIONS.map((meal) => (
          <Grid item xs={12} md={6} key={meal.category}>
            <Card sx={{ p: 2, borderRadius: 4 }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <RestaurantIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">{meal.category}</Typography>
                </Box>

                <Divider sx={{ mb: 2 }} />

                {meal.items.map((food, i) => (
                  <Box
                    key={i}
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      mb: 2.5,
                      bgcolor: (theme) =>
                        theme.palette.mode === "light" ? "#f7f9fc" : "#1d1f24",
                      border: "1px solid rgba(0,0,0,0.08)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 1.2,
                    }}
                  >
                    {/* Food Name */}
                    <Typography
                      fontWeight="bold"
                      fontSize="1.05rem"
                      sx={{ lineHeight: 1.3 }}
                    >
                      {food.name}
                    </Typography>

                    {/* Benefit Text */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.4 }}
                    >
                      {food.benefit}
                    </Typography>

                    {/* Add Button */}
                    <Box mt={1.5}>
                      <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        sx={{
                          py: 1,
                          fontWeight: 600,
                          borderRadius: "10px",
                        }}
                        onClick={() => useSuggestion(food, meal.category)}
                      >
                        Add to Today
                      </Button>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ✅ Today's Diet Log */}
      <Box mt={5}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          ✅ Today's Diet Log
        </Typography>

        {diet.length === 0 && (
          <Typography color="text.secondary">No meals added yet.</Typography>
        )}

        <Grid container spacing={2}>
          {diet.map((meal) => (
            <Grid item xs={12} md={6} key={meal.id}>
              <Card sx={{ p: 2, borderRadius: 4 }}>
                <Typography variant="h6">{meal.name}</Typography>
                <Chip label={meal.category} sx={{ mt: 1 }} />

                <Typography variant="body2" sx={{ mt: 1 }}>
                  🕒 {meal.time}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  {meal.benefit}
                </Typography>

                <IconButton
                  sx={{ float: "right" }}
                  onClick={() => deleteFood(meal.id)}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* ✅ Add Custom Food Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Food Item</DialogTitle>

        <DialogContent dividers>
          <TextField
            fullWidth
            label="Food Name"
            value={foodInput}
            onChange={(e) => setFoodInput(e.target.value)}
          />

          {selectedSuggestion && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 2, display: "block" }}
            >
              Suggestion Benefit: {selectedSuggestion.benefit}
            </Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={addFood}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
