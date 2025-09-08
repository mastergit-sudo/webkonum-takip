const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Konum verileri RAM + dosyada saklansın
let locations = [];

// API endpointleri
app.post("/api/location", (req, res) => {
  const { lat, lon } = req.body;
  if (lat && lon) {
    const entry = { lat, lon, timestamp: Date.now() };
    locations.push(entry);

    fs.writeFileSync("locations.json", JSON.stringify(locations, null, 2));

    console.log("Yeni konum:", entry);
    res.status(200).json({ message: "Konum kaydedildi" });
  } else {
    res.status(400).json({ error: "Eksik veri" });
  }
});

app.get("/api/location", (req, res) => {
  res.json(locations);
});

// Public klasörünü servis et
app.use(express.static(path.join(__dirname, "public")));

// Herhangi bir bilinmeyen route → index.html dönsün
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server ${PORT} portunda çalışıyor`));
