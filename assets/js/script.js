document.addEventListener("DOMContentLoaded", () => {

  /* ========= 1. COUNTDOWN ========= */
  const clock = document.getElementById("clock");
  const eventDate = new Date("August 10, 2025 11:00:00").getTime();
  const pad = n => n.toString().padStart(2, "0");

  function updateClock() {
    const gap = eventDate - Date.now();
    const d = Math.floor(gap / 864e5);
    const h = Math.floor(gap / 36e5) % 24;
    const m = Math.floor(gap / 6e4) % 60;
    const s = Math.floor(gap / 1e3) % 60;

    clock.innerHTML = `
      <div><strong>${pad(d)}</strong><span>días</span></div>
      <div><strong>${pad(h)}</strong><span>horas</span></div>
      <div><strong>${pad(m)}</strong><span>min</span></div>
      <div><strong>${pad(s)}</strong><span>seg</span></div>`;
  }

  setInterval(updateClock, 1000);
  updateClock();


  /* ========= 2. OVERLAY + MÚSICA ========= */
  const music      = document.getElementById("bg-music");
  const overlay    = document.getElementById("welcome-overlay");
  const enterBtn   = document.getElementById("enter-btn");
  const toggle     = document.getElementById("music-toggle");
  const toggleIcon = document.getElementById("music-icon");
  let isPlaying    = false;

  const updateMusicIcon = () => {
    toggle.classList.remove("playing", "pulsing");
    if (isPlaying) {
      toggleIcon.src = "assets/icons/icono-musica_stop.svg";
      toggle.classList.add("playing");
    } else {
      toggleIcon.src = "assets/icons/icono-musica_play.svg";
      toggle.classList.add("pulsing");
    }
  };

  enterBtn?.addEventListener("click", () => {
    overlay.classList.add("fade-out");
    setTimeout(() => overlay.style.display = "none", 1000);

    music.volume = 0.6;
    music.play().then(() => {
      isPlaying = true;
      updateMusicIcon();
    }).catch(() => console.warn("Autoplay bloqueado"));
  });

  toggle?.addEventListener("click", () => {
    isPlaying ? music.pause() : music.play();
    isPlaying = !isPlaying;
    updateMusicIcon();
  });


  /* ========= 3. MODAL REGALO ========= */
  const btnGift   = document.getElementById("btnGift");
  const modalReg  = document.getElementById("modalRegalo");
  const closeGift = modalReg?.querySelector(".modal__close");

  btnGift?.addEventListener("click", () => modalReg.style.display = "flex");
  closeGift?.addEventListener("click", () => modalReg.style.display = "none");
  window.addEventListener("click", e => { if (e.target === modalReg) modalReg.style.display = "none"; });


  /* ========= 4. GALERÍA MODAL ========= */
  const galleryModal = document.getElementById("galleryModal");
  if (galleryModal) {
    const galleryItems = document.querySelectorAll(".gallery__item");
    const galleryImg   = galleryModal.querySelector(".gallery-modal__img");
    const btnPrev      = galleryModal.querySelector(".gallery-modal__prev");
    const btnNext      = galleryModal.querySelector(".gallery-modal__next");
    const btnCloseGal  = galleryModal.querySelector(".gallery-modal__close");
    let current = 0;

    const updateImg = () => {
      const img = galleryItems[current].querySelector("img");
      galleryImg.src = img.src;
      galleryImg.alt = img.alt;
    };

    const openGal = i => {
      current = i;
      updateImg();
      galleryModal.classList.add("gallery-modal--active");
      document.body.style.overflow = "hidden";
    };

    const closeGal = () => {
      galleryModal.classList.remove("gallery-modal--active");
      document.body.style.overflow = "";
    };

    galleryItems.forEach((btn, i) => btn.addEventListener("click", () => openGal(i)));
    btnPrev?.addEventListener("click", () => { current = (current - 1 + galleryItems.length) % galleryItems.length; updateImg(); });
    btnNext?.addEventListener("click", () => { current = (current + 1) % galleryItems.length; updateImg(); });
    btnCloseGal?.addEventListener("click", closeGal);
    window.addEventListener("keydown", e => {
      if (!galleryModal.classList.contains("gallery-modal--active")) return;
      if (e.key === "Escape") closeGal();
      if (e.key === "ArrowLeft") btnPrev?.click();
      if (e.key === "ArrowRight") btnNext?.click();
    });
    galleryModal.addEventListener("click", e => { if (e.target === galleryModal) closeGal(); });
  }


  /* ========= 5. DROPDOWN CALENDARIO ========= */
  const btnCalendar  = document.getElementById("btnCalendar");
  const calendarMenu = document.getElementById("calendarMenu");

  btnCalendar?.addEventListener("click", () => {
    const isOpen = calendarMenu.style.display === "flex";
    calendarMenu.style.display = isOpen ? "none" : "flex";
    btnCalendar.classList.toggle("open", !isOpen);
  });


  /* ========= 6. SCROLL ANIMATIONS ========= */
  const animClasses = [
    ".fade-up", ".fade-down", ".fade-left", ".fade-right",
    ".fade-zoom", ".pop-in", ".fade-in", ".slide-up",
    ".flip-in", ".bounce-in", ".fade-scale",
    ".rotate-in", ".skew-in", ".blur-in",
    ".typewriter", ".typewriter-loop", ".typewriter-rotator"
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("appear");
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.25 });

  document.querySelectorAll(animClasses.join(",")).forEach(el => observer.observe(el));


  /* ========= 7. TYPEWRITER ROTADOR ========= */
  const rotator = document.getElementById("rotator-text");
  if (rotator) {
    const frases = ["¡Bienvenido!"];
    let i = 0, j = 0, borrando = false;

    function typeLoop() {
      const current = frases[i];
      const visible = current.slice(0, j);
      rotator.textContent = visible;

      if (!borrando && j < current.length) {
        j++;
        setTimeout(typeLoop, 100);
      } else if (borrando && j > 0) {
        j--;
        setTimeout(typeLoop, 60);
      } else {
        borrando = !borrando;
        if (!borrando) i = (i + 1) % frases.length;
        setTimeout(typeLoop, 1000);
      }
    }

    typeLoop();
  }

});
