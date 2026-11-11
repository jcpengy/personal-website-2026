const updatedNode = document.querySelector("#last-updated");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const relatedProjectGrids = document.querySelectorAll("[data-project-grid]");

const projects = [
  {
    id: "tmac",
    title: "TMAC Journal",
    type: "Editorial design, art direction",
    image: "assets/tmac/cover.webp",
    alt: "Lime green cover design for TMAC Journal",
  },
  {
    id: "kessler",
    title: "Disney Imaginations Finalist: Kessler Project",
    type: "Art direction, design, 3D modeling, illustration",
    image: "assets/kessler/tickets.webp",
    href: "projects/kessler/",
  },
  {
    id: "rivers-edge",
    title: "River’s Edge Cabin",
    type: "Design, branding",
    image: "assets/rivers-edge/logo-animation.webp",
    href: "projects/rivers-edge/",
  },
  {
    id: "syria",
    title: "The New York Times: Inside a Virtual Crime Scene",
    type: "Editorial graphics, animation",
    video: "assets/nyt-syria/map.mp4",
    poster: "assets/nyt-syria/map-poster.jpg",
    href: "projects/syria/",
  },
];

function projectMarkup(project, base) {
  const media = project.video
    ? `<video class="project-image project-video" autoplay muted loop playsinline preload="metadata" poster="${base}${project.poster}"><source src="${base}${project.video}" type="video/mp4" /></video>`
    : `<img class="project-image" src="${base}${project.image}" alt="${project.href ? "" : project.alt}" />`;
  const content = `
    <div class="project-visual"${project.href ? ' aria-hidden="true"' : ""}>${media}</div>
    <div class="project-copy">
      <p class="project-type">${project.type}</p>
      <h2>${project.title}</h2>
    </div>`;

  if (!project.href) {
    return `<article class="project-card ${project.id}-card">${content}</article>`;
  }

  return `<a class="project-card project-card-link ${project.id}-card" href="${base}${project.href}" aria-label="${project.title}">${content}</a>`;
}

relatedProjectGrids.forEach((grid) => {
  const base = grid.dataset.base || "";
  const currentProject = grid.dataset.currentProject;
  grid.innerHTML = projects
    .filter((project) => project.id !== currentProject)
    .map((project) => projectMarkup(project, base))
    .join("");
});

const modified = new Date(document.lastModified);
const displayDate = Number.isNaN(modified.getTime()) ? new Date() : modified;

if (updatedNode) {
  updatedNode.textContent = new Intl.DateTimeFormat("en", {
    year: "numeric",
  }).format(displayDate);
}

if (prefersReducedMotion.matches) {
  document.querySelectorAll(".project-video").forEach((video) => video.pause());
}
