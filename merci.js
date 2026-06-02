// =========================
// ELEMENTS
// =========================

const music = document.getElementById("bgMusic");

const toggleBtn = document.getElementById("musicToggle");

const volumeSlider = document.getElementById("volumeSlider");

const floatingContainer =
  document.getElementById("floating-container");

// =========================
// ETAT
// =========================

let animationEnabled = false;

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
// COEUR SUR LES KITTY
// =========================

const kittyImages =
  document.querySelectorAll(".kitty");

  kittyImages.forEach(kitty => {

  kitty.addEventListener("mouseenter", () => {

    const rect = kitty.getBoundingClientRect();

    for (let i = 0; i < 8; i++) {

      const heart =
        document.createElement("div");

      heart.classList.add(
        "hover-heart"
      );

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

      document.body.appendChild(
        heart
      );

      heart.addEventListener(
        "animationend",
        () => heart.remove()
      );
    }

  });

});
