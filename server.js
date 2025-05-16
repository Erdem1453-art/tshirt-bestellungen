console.log("🚀 Server wird gestartet...");

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public")); // Statische Dateien (index.html, style.css, script.js)

// E-Mail-Konfiguration (App-Passwort von Gmail erforderlich!)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "erdemgencan06@gmail.com",        // <--- DEINE GMAIL hier eintragen
    pass: "ljrq wtnc roeg ymsk"             // <--- App-Passwort (nicht dein Gmail-Login-PW!)
  }
});

// Bestellroute
app.post("/bestellen", (req, res) => {
  const { name, class: klasse, design, size, message } = req.body;

  // Pflichtfeld-Validierung
  if (!name || !klasse || !design || !size) {
    const errorText = "❌ Fehler: Fehlende Eingabedaten.";
    console.error(errorText, req.body);
    return res.status(400).json({ success: false, message: errorText });
  }

  // Mail zusammenstellen
  const mailOptions = {
    from: "erdemgencan06@gmail.com",         // <--- ebenfalls anpassen!
    to: "erdemgencan06@gmail.com",       // <--- wohin die Bestellungen gehen sollen
    subject: "📦 Neue T-Shirt Bestellung",
    text: `
Neue Bestellung erhalten:

👤 Name: ${name}
🏫 Klasse: ${klasse}
🎨 Design: ${design}
📏 Größe: ${size}
💬 Nachricht: ${message || "(keine)"}
    `
  };

  // Mail senden
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("❌ Fehler beim Senden der E-Mail:", err);
      return res.status(500).json({ success: false, message: "E-Mail konnte nicht gesendet werden." });
    }

    console.log("✅ Bestellung erfolgreich per E-Mail gesendet! :", info.response);
    res.status(200).json({ success: true, message: "Bestellung erfolgreich gesendet.Deine Bestellung wird schnellstmöglich bearbeitet!!" });
  });
});

// Fallback-Fehlerbehandlung
app.use((err, req, res, next) => {
  console.error("💥 Unerwarteter Serverfehler:", err.stack);
  res.status(500).json({ success: false, message: "Interner Serverfehler" });
});

// Server starten
app.listen(port, () => {
  console.log(`✅ Server läuft unter http://localhost:${port}`);
});
