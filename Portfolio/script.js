// ===== Scroll Reveal Animations =====
document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in");
  const sliders = document.querySelectorAll(".slide-in");

  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("appear");
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach(fader => appearOnScroll.observe(fader));
  sliders.forEach(slider => appearOnScroll.observe(slider));
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.click-flip').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });

    card.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', e => e.stopPropagation());
    });
  });
});