const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -7%" });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const menuToggle = document.querySelector(".menu-toggle");
const homeMenu = document.querySelector(".home-menu");

if (menuToggle && homeMenu) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    homeMenu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    homeMenu.classList.toggle("is-open", !open);
    document.body.classList.toggle("menu-open", !open);
  });

  homeMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const parallaxItems = document.querySelectorAll("[data-parallax]");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (parallaxItems.length && !reducedMotion) {
  let ticking = false;
  const updateParallax = () => {
    const viewportHeight = window.innerHeight;
    parallaxItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > viewportHeight) return;
      const progress = (rect.top + rect.height / 2 - viewportHeight / 2) / viewportHeight;
      item.style.setProperty("--parallax-y", `${progress * -28}px`);
    });
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateParallax);
  }, { passive: true });
  updateParallax();
}
