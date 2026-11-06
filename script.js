const updatedNode = document.querySelector("#last-updated");
const projectCards = document.querySelectorAll(".project-card");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const projectVideo = document.querySelector(".project-video");

const modified = new Date(document.lastModified);
const displayDate = Number.isNaN(modified.getTime()) ? new Date() : modified;

updatedNode.textContent = new Intl.DateTimeFormat("en", {
  month: "long",
  year: "numeric",
}).format(displayDate);

if (prefersReducedMotion.matches) projectVideo?.pause();

projectCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (prefersReducedMotion.matches || event.pointerType === "touch") return;

    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    card.style.setProperty("--rx", `${y * -2.5}deg`);
    card.style.setProperty("--ry", `${x * 2.5}deg`);
  });

  card.addEventListener("pointerleave", () => {
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
  });
});
