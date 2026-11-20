const updatedNode = document.querySelector("#last-updated");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const relatedProjectGrids = document.querySelectorAll("[data-project-grid]");

const header = document.querySelector(".site-header");

if (header) {
  const nav = header.querySelector(".site-nav");
  const track = document.createElement("div");
  track.className = "header-pup-track";
  track.setAttribute("aria-hidden", "true");
  track.innerHTML = `
    <div class="header-pup">
      <svg class="header-pup-svg" viewBox="0 0 84 54" xmlns="http://www.w3.org/2000/svg">
        <g stroke="#282624" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 30C13 26 10 20 12 15" fill="none" />
          <path d="M12 15c-3 3-4 7-2 10" fill="none" />
          <path d="M20 27c7-9 24-10 36-4 5 3 7 9 5 16H24c-6-2-8-7-4-12Z" fill="#4a4541" />
          <path d="M20 28c7-7 14-7 19-7-2 5-3 11-1 18H24c-6-2-8-7-4-11Z" fill="#b88b5f" stroke="none" />
          <path d="M55 24c2-10 10-15 18-11 6 3 7 13 2 18-3 3-8 4-14 2" fill="#b88b5f" />
          <path d="m60 16 1-10 7 7M68 12l8-7-1 11" fill="#806044" />
          <path d="M69 17c4 1 7 4 8 8l5 2-5 4" fill="#d7ad79" />
          <circle cx="71" cy="20" r="1.6" fill="#282624" stroke="none" />
          <circle cx="81" cy="27" r="1.4" fill="#282624" stroke="none" />
          <path d="M63 15c-3 4-4 9-2 18M67 15c-2 5-2 11 0 17" fill="none" stroke="#e4c397" stroke-width="1.4" />
          <path class="pup-leg-back" d="M30 37v11h-5" fill="none" transform-origin="30px 38px" />
          <path class="pup-leg-front" d="M55 37v11h5" fill="none" transform-origin="55px 38px" />
          <path d="M56 13c3-4 8-5 12-2" fill="none" stroke="#bd4649" />
          <path d="m62 11-2-4 5 3" fill="#bd4649" />
        </g>
      </svg>
    </div>`;

  header.insertBefore(track, nav);

  const pup = track.querySelector(".header-pup");
  const pupSvg = track.querySelector(".header-pup-svg");
  let lastX = window.innerWidth / 2;
  let walkTimer;

  const positionPup = (clientX, animate = true) => {
    const trackWidth = track.clientWidth;
    const pupWidth = pup.offsetWidth;
    const travel = Math.max(0, trackWidth - pupWidth);
    const target = Math.max(0, Math.min(travel, (clientX / window.innerWidth) * travel));

    if (Math.abs(clientX - lastX) > 2) {
      pupSvg.style.setProperty("--pup-direction", clientX < lastX ? -1 : 1);
    }

    pup.style.setProperty("--pup-x", `${target}px`);
    lastX = clientX;

    if (animate) {
      pup.classList.add("is-walking");
      window.clearTimeout(walkTimer);
      walkTimer = window.setTimeout(() => pup.classList.remove("is-walking"), 960);
    }
  };

  positionPup(lastX, false);

  if (!prefersReducedMotion.matches) {
    window.addEventListener("pointermove", (event) => positionPup(event.clientX), { passive: true });
    window.addEventListener("resize", () => positionPup(lastX, false), { passive: true });
  }
}

const projects = [
  {
    id: "tmac",
    title: "TMAC Journal (Coming Soon!!)",
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
    id: "rise-up",
    title: "Rise Up",
    type: "Design",
    image: "assets/rise-up/thumbnail.webp",
    alt: "Rise Up portraits installed across an outdoor wall and poster-covered column",
    href: "projects/rise-up/",
  },
  {
    id: "molex",
    title: "Molex: Branding and Product Animation",
    type: "Design, animation, VR, video editing",
    image: "assets/molex/fit-families.webp",
    href: "projects/molex/",
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
