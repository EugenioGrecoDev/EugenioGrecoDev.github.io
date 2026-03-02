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