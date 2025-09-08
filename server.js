// server.js
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let locations = []; // Bellekte tutulan veriler (test için)

// Konum POST et
app.post("/api/location", (req, res) => {
  const { lat, lon } = req.body;
  if (lat && lon) {
    locations.push({ lat, lon, timestamp: Date.now() });
    console.log("Yeni konum:", lat, lon);
    res.status(200).json({ message: "Konum kaydedildi" });
  } else {
    res.status(400).json({ error: "Eksik veri" });
  }
});

// Konumları GET et
app.get("/api/location", (req, res) => {
  res.json(locations);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server http://localhost:${PORT} üzerinde çalışıyor`));
