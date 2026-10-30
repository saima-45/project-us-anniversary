
document.addEventListener("DOMContentLoaded", () => {
  const welcome = document.getElementById("welcome");
  const beginButton = document.getElementById("beginButton");
  const music = document.getElementById("backgroundMusic");
  const musicToggle = document.getElementById("musicToggle");
  const musicLabel = document.getElementById("musicLabel");

  const modal = document.getElementById("letterModal");
  const openLetter = document.getElementById("openLetter");
  const closeLetter = document.getElementById("closeLetter");
  const finishLetter = document.getElementById("finishLetter");
  const letterText = document.getElementById("letterText");

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const closeLightbox = document.getElementById("closeLightbox");

  const replayStory = document.getElementById("replayStory");
  const particles = document.getElementById("floatingParticles");

  const letter = `Happiest first anniversary, Arsh. ❤️

One year ago, we met as complete strangers in the mountains, surrounded by our friends. I had no idea that a simple meeting would become the beginning of something so special.

And I will never forget, “Khali 2 photos pachi jaiye, pakku.” 😂 It still makes me smile.

Thank you for the reels that started our conversations. Thank you for listening to all my nonsense, for making me smile, and for becoming someone I can trust and feel safe with.

18th June will always have a special place in my heart. The effort you made to come and meet me meant so much, even though we got caught. And 7th July, walking with you in the rain at Kamati Baug, felt like a little dream I never want to forget.

Thank you for being there when I was upset or unwell. Even when you're angry, I can feel that you care. I notice your efforts, your kindness, and all the little things you do for me.

I know we have had ups and downs. I know there will be more difficult days ahead, because life is never perfect. But I want you to know that I will keep trying to understand you, support you, encourage you, and become a better person too.

I want to celebrate your happiest moments and sit beside you when life feels heavy. I want to listen when you need to talk, encourage you when you doubt yourself, and remind you how much good there is in you.

Please don't be too hard on yourself. I wish you could see yourself through my eyes: someone kind, caring, and so much more wonderful than you sometimes realise.

I cannot promise that every day will be easy. But I can promise that I will keep caring, keep learning, and keep showing up for you through the good days and the difficult ones.

May Allah bless you with peace, good health, happiness, success, and countless blessings in your deen, duniya, and akhirah. May your sincere duas be answered at the right time.

Thank you for entering my life. Thank you for staying. Thank you for making a stranger's meeting in the mountains become one of my favourite stories.

One year has passed, and there are still so many memories waiting for us.

No matter what life brings, I hope we keep facing it together, with patience, honesty, kindness, and love.

My heart is grateful that our paths crossed.

Happy first anniversary, Arsh. ❤️

With all my love,
Saima ♡`;

  // Opening screen
  beginButton.addEventListener("click", async () => {
    welcome.classList.add("is-gone");

    try {
      await music.play();
      musicLabel.textContent = "Pause music";
      musicToggle.setAttribute("aria-label", "Pause music");
    } catch (error) {
      musicLabel.textContent = "Play our music";
    }
  });

  // Music toggle
  musicToggle.addEventListener("click", async () => {
    if (music.paused) {
      try {
        await music.play();
        musicLabel.textContent = "Pause music";
        musicToggle.setAttribute("aria-label", "Pause music");
      } catch (error) {
        musicLabel.textContent = "Tap to play";
      }
    } else {
      music.pause();
      musicLabel.textContent = "Play our music";
      musicToggle.setAttribute("aria-label", "Play music");
    }
  });

  // Show placeholders when images are missing.
  document.querySelectorAll(".memory-tile").forEach((tile) => {
    const img = tile.querySelector("img");

    const markLoaded = () => {
      if (img.naturalWidth > 0) {
        tile.classList.add("has-image");
      } else {
        tile.classList.remove("has-image");
      }
    };

    img.addEventListener("load", markLoaded);
    img.addEventListener("error", markLoaded);

    if (img.complete) markLoaded();

    tile.addEventListener("click", () => {
      if (!img.complete || img.naturalWidth === 0) {
        alert("Add " + img.getAttribute("src") + " to your project first.");
        return;
      }

      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightbox.classList.remove("is-hidden");
      document.body.classList.add("modal-open");
    });
  });

  // Letter modal
  function showLetter() {
    letterText.textContent = letter;
    modal.classList.remove("is-hidden");
    document.body.classList.add("modal-open");
  }

  function hideLetter() {
    modal.classList.add("is-hidden");
    document.body.classList.remove("modal-open");
  }

  openLetter.addEventListener("click", showLetter);
  closeLetter.addEventListener("click", hideLetter);
  finishLetter.addEventListener("click", hideLetter);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) hideLetter();
  });

  // Photo lightbox
  function hideLightbox() {
    lightbox.classList.add("is-hidden");
    lightboxImage.src = "";
    document.body.classList.remove("modal-open");
  }

  closeLightbox.addEventListener("click", hideLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) hideLightbox();
  });

  // Keyboard accessibility
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideLetter();
      hideLightbox();
    }
  });

  // Replay the story
  replayStory.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    welcome.classList.remove("is-gone");
  });

  // Floating decorative stars
  const symbols = ["✦", "♡", "✧", "·"];

  function addParticle() {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.left = Math.random() * 100 + "%";
    particle.style.bottom = "-25px";
    particle.style.fontSize = 10 + Math.random() * 15 + "px";
    particle.style.setProperty("--duration", 8 + Math.random() * 10 + "s");

    particles.appendChild(particle);

    setTimeout(() => particle.remove(), 19000);
  }

  for (let i = 0; i < 14; i++) {
    setTimeout(addParticle, i * 350);
  }

  setInterval(addParticle, 1000);
});
                                                    
