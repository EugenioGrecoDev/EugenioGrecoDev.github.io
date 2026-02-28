document.addEventListener('DOMContentLoaded', () => {
const links = document.querySelectorAll(".nav-link");

const observed = [ "activities", "about", "contact"];
const sections = observed.map(id => document.getElementById(id));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;

      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.content === id);
      });
    }
  });
}, {
  root: null,
  threshold: 0.5,
  rootMargin: "-33% 0px -33% 0px"
});


sections.forEach(sec => observer.observe(sec));

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = link.dataset.target;

    if (target === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const section = document.getElementById(link.dataset.content);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  });
});


});