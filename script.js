// =========================================================
// Tom Vuma — Portfolio interactions
// =========================================================
document.addEventListener("DOMContentLoaded", () => {

  // ----- Scroll reveal -----
  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`;
    revealObserver.observe(el);
  });

  // ----- Navbar scrolled state -----
  const navbar = document.querySelector(".navbar");
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle("scrolled", window.scrollY > 30);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ----- Mobile nav toggle -----
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navCta = document.querySelector(".nav-cta");
  const navBackdrop = document.querySelector(".nav-backdrop");

  const closeMenu = () => {
    navLinks && navLinks.classList.remove("open");
    navCta && navCta.classList.remove("open");
    navToggle && navToggle.classList.remove("open");
    navBackdrop && navBackdrop.classList.remove("show");
    navToggle && navToggle.setAttribute("aria-expanded", "false");
  };

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      navCta && navCta.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navBackdrop && navBackdrop.classList.toggle("show", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    navBackdrop && navBackdrop.addEventListener("click", closeMenu);
  }

  // ----- Scrollspy -----
  const sections = document.querySelectorAll("main section[id]");
  const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

  if (sections.length && navAnchors.length) {
    const spyObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        navAnchors.forEach(a => {
          a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(sec => spyObserver.observe(sec));
  }

  // ----- Hero role typewriter -----
  const roleEl = document.querySelector("[data-typewriter]");
  if (roleEl) {
    const roles = JSON.parse(roleEl.getAttribute("data-typewriter"));
    let roleIndex = 0, charIndex = 0, deleting = false;

    const tick = () => {
      const current = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        roleEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1600);
          return;
        }
      } else {
        charIndex--;
        roleEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 35 : 65);
    };
    tick();
  }

  // ----- Back to top -----
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", () => {
      backToTop.classList.toggle("show", window.scrollY > 500);
    }, { passive: true });
  }

  // ----- Flip cards (project detail pages) -----
  document.querySelectorAll(".flip-card").forEach(card => {
    card.addEventListener("click", () => card.classList.toggle("flipped"));
    card.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", e => e.stopPropagation());
    });
  });

  // ----- Footer year -----
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
