const updatedNode = document.querySelector("#last-updated");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const projectVideo = document.querySelector(".project-video");

const modified = new Date(document.lastModified);
const displayDate = Number.isNaN(modified.getTime()) ? new Date() : modified;

updatedNode.textContent = new Intl.DateTimeFormat("en", {
  month: "long",
  year: "numeric",
}).format(displayDate);

if (prefersReducedMotion.matches) projectVideo?.pause();
