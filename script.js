(function () {
  'use strict';

  // ========== CONFIG (edit these) ==========
  const CONFIG = {
    // Birthday: month (1–12), day.
    birthdayMonth: 2,
    birthdayDay: 22,
    // Videos for party mode slideshow (use your filenames)
    galleryVideos: [
      'media/video1.mp4',
      'media/video2.MP4',
      'media/video3.MP4',
      'media/video4.MP4',
      'media/video5.MP4',
      'media/video6.MP4'
    ],
    // Secret poem
    poemLines: [
      'My Uchechukwu, My remembrance that God rewards us even when we aren\'t looking',
      'My smile, the bringer of joy to my heart',
      'My Troublemaker, the headache I wake up every morning in need of',
      'My CEO, the brilliance that will bring world leaders to their knees',
      'My friend, the kind my Mother says you must do life with',
      'I know this far from the perfect Birthday',
      'But I promise you the next birthday will always be better than the last',
      'I live every day looking for ways to make you smile',
      'And I hope in my little way this has brought a smile to your face',
      'Happy Birthday My Enugu Goddess',
      'I LOVE YOU!!!'
    ]
  };

  // ========== Confetti ==========
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let confettiPieces = [];
  let confettiAnimationId = null;

  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createConfetti() {
    const colors = ['#f8b4d9', '#e91e8c', '#d4a5e8', '#7c3aed', '#fbbf24', '#fffef9'];
    confettiPieces = [];
    const count = 80;

    for (let i = 0; i < count; i++) {
      confettiPieces.push({
        x: Math.random() * canvas.width,
        y: -10,
        w: Math.random() * 8 + 4,
        h: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 4 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }
  }

  function drawConfetti() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let anyVisible = false;

    confettiPieces.forEach(function (p) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.08;
      p.rotation += p.rotationSpeed;

      if (p.y < canvas.height + 20) anyVisible = true;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    if (anyVisible) {
      confettiAnimationId = requestAnimationFrame(drawConfetti);
    } else {
      confettiAnimationId = null;
    }
  }

  function triggerConfetti() {
    setCanvasSize();
    createConfetti();
    if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
    drawConfetti();
  }

  window.addEventListener('resize', setCanvasSize);

  // ========== Start Party button ==========
  const startPartyBtn = document.getElementById('start-party-btn');
  const countdownSection = document.getElementById('countdown');

  if (startPartyBtn) {
    startPartyBtn.addEventListener('click', function () {
      triggerConfetti();
      if (countdownSection) countdownSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Confetti on first load (short burst)
  setTimeout(triggerConfetti, 400);

  // ========== Countdown ==========
  const countdownDisplay = document.getElementById('countdown-display');
  const countdownMessage = document.getElementById('countdown-message');
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function getNextBirthday() {
    var now = new Date();
    var y = now.getFullYear();
    var target = new Date(y, CONFIG.birthdayMonth - 1, CONFIG.birthdayDay, 0, 0, 0);
    if (now > target) target = new Date(y + 1, CONFIG.birthdayMonth - 1, CONFIG.birthdayDay, 0, 0, 0);
    return target;
  }

  function isBirthdayToday() {
    var d = new Date();
    return d.getMonth() + 1 === CONFIG.birthdayMonth && d.getDate() === CONFIG.birthdayDay;
  }

  function updateCountdown() {
    const now = new Date();
    const isToday = isBirthdayToday();
    const target = getNextBirthday();

    if (isToday || now >= target) {
      if (countdownDisplay) countdownDisplay.hidden = true;
      if (countdownMessage) {
        countdownMessage.hidden = false;
        countdownMessage.textContent = "It's your day! Let's celebrate 🎂";
      }
      return;
    }

    if (countdownDisplay) countdownDisplay.hidden = false;
    if (countdownMessage) countdownMessage.hidden = true;

    const diff = target - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ========== Lightbox (image or video) ==========
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxVideo = document.getElementById('lightbox-video');
  const lightboxClose = document.getElementById('lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item--video, .gallery-item--photo');

  function openLightboxVideo(src) {
    if (!lightbox || !lightboxVideo) return;
    lightboxImg.hidden = true;
    lightboxVideo.hidden = false;
    lightboxVideo.src = src;
    lightbox.hidden = false;
    lightbox.setAttribute('data-open', 'true');
    document.body.style.overflow = 'hidden';
    lightboxVideo.play().catch(function () {});
  }

  function openLightboxImage(src) {
    if (!lightbox || !lightboxImg) return;
    lightboxVideo.hidden = true;
    lightboxVideo.pause();
    lightboxVideo.removeAttribute('src');
    lightboxImg.hidden = false;
    lightboxImg.src = src;
    lightbox.hidden = false;
    lightbox.setAttribute('data-open', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.setAttribute('data-open', 'false');
    lightbox.hidden = true;
    document.body.style.overflow = '';
    if (lightboxVideo) {
      lightboxVideo.pause();
      lightboxVideo.removeAttribute('src');
    }
  }

  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var src = item.getAttribute('data-src') || '';
      if (src.endsWith('.mp4') || src.endsWith('.webm')) {
        openLightboxVideo(src);
      } else {
        openLightboxImage(src);
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });

  // ========== Party Mode (video slideshow) ==========
  const partyModeBtn = document.getElementById('party-mode-btn');
  const partyMusic = document.getElementById('party-music');
  const partySlideshow = document.getElementById('party-slideshow');
  const partySlideVideo = document.getElementById('party-slide-video');
  const heartsContainer = document.getElementById('hearts-container');

  let partyModeActive = false;
  let heartsInterval = null;
  let currentVideoIndex = 0;

  function createFloatingHeart() {
    if (!heartsContainer) return;
    const heart = document.createElement('span');
    heart.className = 'heart-float';
    heart.textContent = '❤';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heart.style.fontSize = (Math.random() * 1 + 0.8) + 'rem';
    heartsContainer.appendChild(heart);
    setTimeout(function () { heart.remove(); }, 10000);
  }

  function playNextPartyVideo() {
    if (!partySlideVideo || !CONFIG.galleryVideos.length) return;
    partySlideVideo.src = CONFIG.galleryVideos[currentVideoIndex];
    currentVideoIndex = (currentVideoIndex + 1) % CONFIG.galleryVideos.length;
    partySlideVideo.play().catch(function () {});
  }

  function startPartyMode() {
    if (partyModeActive) return;
    partyModeActive = true;

    if (partySlideshow && partySlideVideo && CONFIG.galleryVideos.length) {
      partySlideshow.hidden = false;
      partySlideshow.setAttribute('data-active', 'true');
      currentVideoIndex = 0;
      partySlideVideo.addEventListener('ended', playNextPartyVideo);
      playNextPartyVideo();
    }

    if (heartsContainer) {
      for (let i = 0; i < 12; i++) createFloatingHeart();
      heartsInterval = setInterval(createFloatingHeart, 800);
    }

    if (partyMusic) {
      partyMusic.volume = 0.4;
      var playPromise = partyMusic.play();
      if (playPromise && playPromise.catch) {
        playPromise.catch(function () {
          // Autoplay blocked; user must click to start music. Button click already counts.
          console.log('Playback failed (e.g. autoplay policy). User interaction may be required.');
        });
      }
    }

    if (partyModeBtn) {
      partyModeBtn.textContent = 'Exit Party Mode';
    }
  }

  function exitPartyMode() {
    if (!partyModeActive) return;
    partyModeActive = false;

    if (partySlideshow) {
      partySlideshow.setAttribute('data-active', 'false');
      partySlideshow.hidden = true;
    }
    if (partySlideVideo) {
      partySlideVideo.removeEventListener('ended', playNextPartyVideo);
      partySlideVideo.pause();
      partySlideVideo.removeAttribute('src');
    }
    if (heartsInterval) {
      clearInterval(heartsInterval);
      heartsInterval = null;
    }
    if (heartsContainer) heartsContainer.innerHTML = '';
    if (partyMusic) partyMusic.pause();
    if (partyModeBtn) partyModeBtn.textContent = 'Enter Party Mode';
  }

  if (partyModeBtn) {
    partyModeBtn.addEventListener('click', function () {
      if (partyModeActive) exitPartyMode();
      else startPartyMode();
    });
  }

  // ========== Secret poem ==========
  const poemModal = document.getElementById('poem-modal');
  const poemModalBackdrop = document.getElementById('poem-modal-backdrop');
  const poemModalClose = document.getElementById('poem-modal-close');
  const poemTextEl = document.getElementById('poem-text');
  const secretPoemTrigger = document.getElementById('secret-poem-trigger');

  function openPoemModal() {
    if (CONFIG.poemLines && CONFIG.poemLines.length && poemTextEl) {
      poemTextEl.innerHTML = CONFIG.poemLines.map(function (line) {
        return '<p>' + line.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</p>';
      }).join('');
    }
    if (poemModal) {
      poemModal.hidden = false;
      poemModal.setAttribute('data-open', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  function closePoemModal() {
    if (poemModal) {
      poemModal.setAttribute('data-open', 'false');
      poemModal.hidden = true;
      document.body.style.overflow = '';
    }
  }

  if (secretPoemTrigger) secretPoemTrigger.addEventListener('click', openPoemModal);
  if (poemModalBackdrop) poemModalBackdrop.addEventListener('click', closePoemModal);
  if (poemModalClose) poemModalClose.addEventListener('click', closePoemModal);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePoemModal(); });
})();
