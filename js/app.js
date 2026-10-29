document.addEventListener('DOMContentLoaded', () => {
  const welcome = document.getElementById('welcome');
  const site = document.getElementById('site');
  const openStory = document.getElementById('openStory');
  const music = document.getElementById('backgroundMusic');
  const musicToggle = document.getElementById('musicToggle');
  const musicIcon = document.getElementById('musicIcon');
  const musicLabel = document.getElementById('musicLabel');
  const letterModal = document.getElementById('letterModal');
  const letterText = document.getElementById('letterText');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  let isPlaying = false;
  let letterHasBeenTyped = false;

  const letterParagraphs = [
    'Happiest first anniversary, Arsh. ♡',
    'One year ago, we met as complete strangers in the mountains, surrounded by our friends. I had no idea that the person I met that day would become such a big part of my life. I never imagined that a few reels and a simple conversation would lead me here, a year later, with so many memories and so much to be thankful for.',
    'I will always smile when I remember “Khali 2 photos pachi jaiye, pakku.” 😂 It is such a small thing, but it holds a piece of the beginning of us. And I will never forget 18th June—the effort you made to meet me, even though we got caught—or that peaceful, rainy walk with you in Kamati Baug on 7th July. Those moments are little treasures I will keep close to my heart.',
    'But what means just as much to me are the moments that might not look special from the outside. The days when I was upset or not feeling well and you were there. The way you still care even when you are angry. The little efforts you make, the way you listen, and the way you help me feel safer and less alone. I notice more than I can always explain, and I appreciate you more than you know.',
    'I know we have already had ups and downs, and I know life will bring more. We will not always understand everything perfectly, and we may make mistakes. When that happens, I hope we keep choosing honesty over silence, patience over pride, and understanding over assumptions. I want us to keep learning how to love each other better—not because we are perfect, but because what we share matters to me.',
    'I want to be there for you in every phase of your life: to cheer for you, celebrate your smallest wins, remind you how wonderful you are when you forget, listen when things feel heavy, annoy you when you need a laugh, and stand beside you when life gets difficult. I hope you are gentle with yourself. You are so much more than the flaws you notice, and you deserve happiness, peace, success, and love.',
    'May Allah bless you in your deen, duniya, and akhirah. May He grant you good health, a peaceful heart, success in what you work for, and acceptance for your sincere duas. May He guide us toward what is good, help us grow into better people, and fill the days ahead with kindness and barakah. Ameen. 🤲',
    'Thank you for coming into my life. Thank you for staying, for caring, for the memories we have made, and for all the ordinary days that became special because you were there. I cannot promise that every day will be easy, but I want you to know this: I will keep showing up for you, supporting you, and facing life with you through every situation, no matter what comes our way.',
    'If I could go back to that mountain day knowing everything I know now, I would still want to meet you. I would still want to start that conversation. And I would still choose you.',
    'Happy one year to us, Arsh. Here is to our first chapter—and to all the beautiful pages still waiting for us. I love you. ♡',
    'Always here,\nSaima ♡'
  ];

  function setMusicState(playing) {
    isPlaying = playing;
    musicToggle.classList.toggle('is-playing', playing);
    musicIcon.textContent = playing ? '♫' : '♪';
    musicLabel.textContent = playing ? 'Music on' : 'Music off';
    musicToggle.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');
  }

  async function tryPlayMusic() {
    try {
      await music.play();
      setMusicState(true);
    } catch (error) {
      setMusicState(false);
      musicLabel.textContent = 'Tap for music';
    }
  }

  openStory.addEventListener('click', async () => {
    welcome.classList.add('is-gone');
    site.classList.remove('is-hidden');
    window.setTimeout(() => { welcome.style.display = 'none'; }, 850);
    await tryPlayMusic();
    revealObserver.observeAll?.();
  });

  musicToggle.addEventListener('click', async () => {
    if (isPlaying) {
      music.pause();
      setMusicState(false);
    } else {
      await tryPlayMusic();
    }
  });
  music.addEventListener('play', () => setMusicState(true));
  music.addEventListener('pause', () => setMusicState(false));

  // Scroll reveals are gentle and degrade gracefully if IntersectionObserver is unavailable.
  const revealItems = document.querySelectorAll('.reveal');
  let revealObserver;
  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  // A small number of floating sparkles; removed automatically after rising away.
  const particleLayer = document.getElementById('floatingParticles');
  function addParticle() {
    if (!particleLayer || document.hidden) return;
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.textContent = Math.random() > 0.5 ? '✦' : '·';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = '-20px';
    particle.style.fontSize = `${8 + Math.random() * 12}px`;
    particle.style.setProperty('--duration', `${9 + Math.random() * 8}s`);
    particleLayer.appendChild(particle);
    window.setTimeout(() => particle.remove(), 18000);
  }
  for (let i = 0; i < 14; i++) window.setTimeout(addParticle, i * 280);
  window.setInterval(addParticle, 850);

  // Photos are optional. If a file hasn't been added yet, keep its styled placeholder visible.
  document.querySelectorAll('.memory-tile').forEach(tile => {
    const img = tile.querySelector('img');
    if (!img) return;
    const markLoaded = () => tile.classList.add('has-image');
    img.addEventListener('load', markLoaded);
    img.addEventListener('error', () => tile.classList.remove('has-image'));
    if (img.complete && img.naturalWidth > 0) markLoaded();
    tile.addEventListener('click', () => {
      if (img.complete && img.naturalWidth > 0) {
        lightboxImage.src = img.src;
        lightbox.classList.remove('is-hidden');
        document.body.classList.add('modal-open');
      }
    });
  });

  function openLetter() {
    letterModal.classList.remove('is-hidden');
    document.body.classList.add('modal-open');
    if (!letterHasBeenTyped) {
      letterHasBeenTyped = true;
      letterText.innerHTML = '';
      letterParagraphs.forEach((paragraph, index) => {
        const p = document.createElement('p');
        p.textContent = paragraph;
        p.style.opacity = '0';
        p.style.transform = 'translateY(8px)';
        p.style.transition = 'opacity .5s ease, transform .5s ease';
        letterText.appendChild(p);
        window.setTimeout(() => {
          p.style.opacity = '1';
          p.style.transform = 'translateY(0)';
        }, 120 + index * 260);
      });
    }
  }
  function closeModal(modal) {
    modal.classList.add('is-hidden');
    if (letterModal.classList.contains('is-hidden') && lightbox.classList.contains('is-hidden')) {
      document.body.classList.remove('modal-open');
    }
  }
  document.getElementById('readLetter').addEventListener('click', openLetter);
  document.getElementById('heroLetter').addEventListener('click', openLetter);
  document.getElementById('closeLetter').addEventListener('click', () => closeModal(letterModal));
  document.getElementById('finishLetter').addEventListener('click', () => closeModal(letterModal));
  document.getElementById('closeLightbox').addEventListener('click', () => closeModal(lightbox));
  letterModal.addEventListener('click', event => { if (event.target === letterModal) closeModal(letterModal); });
  lightbox.addEventListener('click', event => { if (event.target === lightbox) closeModal(lightbox); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (!letterModal.classList.contains('is-hidden')) closeModal(letterModal);
      if (!lightbox.classList.contains('is-hidden')) closeModal(lightbox);
    }
  });

  document.getElementById('replayStory').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    welcome.style.display = '';
    welcome.classList.remove('is-gone');
    site.classList.add('is-hidden');
    setMusicState(!music.paused);
  });

  // The first meeting was one year before the anniversary date provided.
  const startDate = new Date('2025-10-29T00:00:00');
  const today = new Date();
  const elapsed = Math.max(0, Math.floor((today - startDate) / 86400000));
  const daysNode = document.getElementById('daysTogether');
  if (daysNode) daysNode.textContent = String(elapsed || 365);
});
