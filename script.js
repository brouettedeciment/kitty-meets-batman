// =========================
// ELEMENTS
// =========================

emailjs.init("HS-YStgDf26gumY4w");

const music = document.getElementById("bgMusic");

const toggleBtn = document.getElementById("musicToggle");

const volumeSlider = document.getElementById("volumeSlider");

const popup = document.getElementById("cookiePopup");

const acceptBtn = document.getElementById("acceptCookies");

const floatingContainer =
  document.getElementById("floating-container");

const popupCard = document.querySelector(".popup-card");

// =========================
// ETAT
// =========================

let animationEnabled = false;

initKittyHearts();

// =========================
// SLIDER VOLUME
// =========================

function updateSlider() {

  const value =
    ((volumeSlider.value - volumeSlider.min) /
      (volumeSlider.max - volumeSlider.min)) * 100;

  volumeSlider.style.background = `
    linear-gradient(
      to right,
      #ff77b7 0%,
      #ff77b7 ${value}%,
      #ffd1e6 ${value}%,
      #ffd1e6 100%
    )
  `;
}

volumeSlider.addEventListener("input", () => {

  if (music) {
    music.volume = volumeSlider.value / 100;
  }

  updateSlider();
});

updateSlider();

// =========================
// PLAY / PAUSE
// =========================

toggleBtn.addEventListener("click", () => {

  if (!music) return;

  if (music.paused) {

    music.play();

    animationEnabled = true;

    toggleBtn.textContent = "🎵";

    document
      .querySelectorAll(".floating-item")
      .forEach(item => {
        item.style.animationPlayState = "running";
      });

  } else {

    music.pause();

    animationEnabled = false;

    toggleBtn.textContent = "🔇";

    document
      .querySelectorAll(".floating-item")
      .forEach(item => {
        item.style.animationPlayState = "paused";
      });
  }
});

// =========================
// POPUP DE DEMARRAGE
// =========================

acceptBtn.addEventListener("click", () => {

  navigator.vibrate?.(150);

  if (music) {
    music.volume = volumeSlider.value / 100;
    music.play();
  }

  animationEnabled = true;

  createExplosion();

  popupCard.classList.add("explode");

  setTimeout(() => {

    popup.remove();

  }, 500);

  toggleBtn.textContent = "🎵";
});

// =========================
// EXPLOSION
// =========================

function createExplosion() {

  const rect = popupCard.getBoundingClientRect();

  const particles = [
    "💖",
    "💕",
    "🌸",
    "✨",
  ];

  for (let i = 0; i < 50; i++) {

    setTimeout(() => {

      const particle =
        document.createElement("div");

      particle.classList.add("explosion-heart");

      particle.textContent =
        particles[
          Math.floor(
            Math.random() * particles.length
          )
        ];

      particle.style.left =
        rect.left +
        Math.random() * rect.width +
        "px";

      particle.style.top =
        rect.top +
        Math.random() * rect.height +
        "px";

      const angle =
        Math.random() * Math.PI * 2;

      const distance =
        250 + Math.random() * 500;

      const x =
        Math.cos(angle) * distance;

      const y =
        Math.sin(angle) * distance;

      particle.style.setProperty(
        "--x",
        `${x}px`
      );

      particle.style.setProperty(
        "--y",
        `${y}px`
      );

      document.body.appendChild(
        particle
      );

      particle.addEventListener(
        "animationend",
        () => {
          particle.remove();
        }
      );

    }, i * 15);

  }
}

// =========================
// EMOJIS FLOTTANTS
// =========================

const floatingElements = [
  "💖",
  "💕",
  "🌸",
  "🌹",
  "🎀",
  "✨"
];

function createFloatingItem() {

  if (!animationEnabled) return;

  if (document.hidden) {
      document
        .querySelectorAll(".floating-item")
        .forEach(item => {
          item.style.animationPlayState = "paused";
      });
      return;
    } else {

    document
      .querySelectorAll(".floating-item")
      .forEach(item => {
        item.style.animationPlayState = "running";
      });
  }

  const item =
    document.createElement("div");

  item.classList.add(
    "floating-item"
  );

  item.textContent =
    floatingElements[
      Math.floor(
        Math.random() *
        floatingElements.length
      )
    ];

  item.style.left =
    Math.random() * 100 + "%";

  item.style.fontSize =
    1.5 +
    Math.random() * 2.5 +
    "rem";

  item.style.animationDuration =
    8 +
    Math.random() * 10 +
    "s";

  floatingContainer.appendChild(
    item
  );

  item.addEventListener(
    "animationend",
    () => {
      item.remove();
    }
  );
}

setInterval(
  createFloatingItem,
  400
);

// =========================
// CHOIX DU TYPE DE DATE
// =========================

const dateTypeButtons = document.querySelectorAll(".choices button");
const inputAutre      = document.querySelector(".input-autre");
const autreContainer  = document.querySelector(".autre-container");

dateTypeButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Désélectionne tout
    dateTypeButtons.forEach(btn => {
      btn.classList.remove("selected");
    });
    // Sélectionne le bouton cliqué
    button.classList.add("selected");

    // Gestion du champ "Autre"
    if (button.id === "btnAutre") {
      inputAutre.classList.add("visible");
      autreContainer.classList.add("visible");
      inputAutre.focus();
    } else {
      inputAutre.classList.remove("visible");
      autreContainer.classList.remove("visible");
      inputAutre.value = "";
    }
  });
});

// =========================
// COEUR SUR LES KITTY
// =========================

function initKittyHearts() {

  const kittyImages =
    document.querySelectorAll(".kitty");

  kittyImages.forEach(kitty => {

    kitty.addEventListener("mouseenter", () => {

      const rect = kitty.getBoundingClientRect();

      for (let i = 0; i < 8; i++) {

        const heart =
          document.createElement("div");

        heart.classList.add("hover-heart");

        heart.textContent =
          Math.random() > 0.5
            ? "💖"
            : "💕";

        heart.style.left =
          rect.left +
          rect.width / 2 +
          "px";

        heart.style.top =
          rect.top +
          rect.height / 2 +
          "px";

        const angle =
          Math.random() * Math.PI * 2;

        const distance =
          30 + Math.random() * 50;

        heart.style.setProperty(
          "--x",
          `${Math.cos(angle) * distance}px`
        );

        heart.style.setProperty(
          "--y",
          `${Math.sin(angle) * distance}px`
        );

        document.body.appendChild(heart);

        heart.addEventListener(
          "animationend",
          () => heart.remove()
        );
      }

    });

  });

}

// ========================= 
// TRANSITION BOUTON VALIDER 
// =========================

submitBtn.addEventListener("click", async () => {

  const date =
    document.getElementById("dateInput").value;

  const heure =
    document.getElementById("timeInput").value;

  const lieu =
    document.getElementById("locationInput").value;

  const message =
    document.getElementById("messageInput").value;

  const autre =
    document.getElementById("autreInput").value;

  let typeDate = "Non précisé";

  const selectedButton =
    document.querySelector(
      ".choices button.selected"
    );

  if (selectedButton) {
    typeDate =
      selectedButton.textContent;
  }

  try {

    await emailjs.send(
      "service_oswogjd",
      "template_zrxf0ui",
      {
        date,
        heure,
        lieu,
        message,
        typeDate,
        autre,
        currentDate:
          new Date().toLocaleString("fr-FR")
      }
    );

    console.log("Mail envoyé");

  } catch (error) {

    console.error(error);

  }

  document.querySelector(".container").innerHTML = `
    <div class="card confirmation-card">

      <img src="Hello Kitty.png" class="kitty">

      <h1>💖 Formulaire envoyé 💖</h1>

      <p>
        Merci pour ta participation.
      </p>

      <p>
        Les experts du comité des rendez-vous
        vont examiner votre demande.
      </p>

      <img src="Hello Kitty and Batman.png" class="kitty">

    </div>
  `;

  music.pause();

  music.src = "I Love You So.mp3";

  music.load();

  music.play();

  initKittyHearts();

});