document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("orderForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const klasse = document.getElementById("class").value;
    const size = document.getElementById("size").value;
    const message = document.getElementById("message").value;

    // Aktives Design ermitteln
    const designInput = document.querySelector('input[name="design"]:checked');
    const design = designInput ? designInput.value : null;

    if (!design) {
      alert("Bitte ein Design auswählen.");
      return;
    }

    const orderData = {
      name,
      class: klasse,
      size,
      design,
      message
    };

    try {
      const response = await fetch("/bestellen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert("✅ Bestellung erfolgreich abgeschickt! Deine Bestellung wird schnellstmöglich bearbeitet!!");
        form.reset();
      } else {
        alert("❌ Fehler beim Absenden: " + (result.message || "Unbekannter Fehler."));
      }
    } catch (error) {
      console.error("Fehler beim Senden der Bestellung:", error);
      alert("❌ Netzwerkfehler. Bitte versuche es erneut.");
    }
  });

  // Easteregg Klick Event
  const easterEgg = document.getElementById("easter-egg");
  if (easterEgg) {
    easterEgg.addEventListener("click", async () => {
      try {
        const response = await fetch("/easteregg", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ message: "Das Easteregg wurde angeklickt!" })
        });
        if (response.ok) {
          console.log("Easteregg Klick wurde gemeldet.");
        } else {
          console.error("Fehler beim Melden des Eastereggs.");
        }
      } catch (error) {
        console.error("Netzwerkfehler beim Melden des Eastereggs:", error);
      }
    });
  }
});
