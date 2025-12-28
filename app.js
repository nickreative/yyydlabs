/**
 * Add as many examples as you like.
 * Each item belongs to one category: social | content | strategy
 * You can point `href` to any internal page, external URL, or a case-study page.
 * You can later replace `label` with nothing if you don’t want visible text on tiles.
 */
const EXAMPLES = [
  // SOCIAL
  { category: "social", label: "Example 1", href: "#", thumb: "" },
  { category: "social", label: "Example 2", href: "#", thumb: "" },
  { category: "social", label: "Example 3", href: "#", thumb: "" },
  { category: "social", label: "Example 4", href: "#", thumb: "" },

  // CONTENT
  { category: "content", label: "Example 1", href: "#", thumb: "" },
  { category: "content", label: "Example 2", href: "#", thumb: "" },
  { category: "content", label: "Example 3", href: "#", thumb: "" },
  { category: "content", label: "Example 4", href: "#", thumb: "" },

  // STRATEGY
  { category: "strategy", label: "Example 1", href: "#", thumb: "" },
  { category: "strategy", label: "Example 2", href: "#", thumb: "" },
  { category: "strategy", label: "Example 3", href: "#", thumb: "" },
  { category: "strategy", label: "Example 4", href: "#", thumb: "" },
];

const grid = document.getElementById("exampleGrid");
const tabs = Array.from(document.querySelectorAll(".tab"));

let activeCategory = "social";

function itemsFor(category){
  return EXAMPLES.filter(x => x.category === category);
}

function render(category){
  const items = itemsFor(category);

  // Build DOM
  grid.innerHTML = "";

  items.forEach((item, i) => {
    const card = document.createElement("article");
    card.className = "card is-entering";
    card.style.animationDelay = `${Math.min(i * 40, 280)}ms`; // stagger up to ~7 items

    const link = document.createElement("a");
    link.className = "card__link";
    link.href = item.href;
    link.setAttribute("aria-label", item.label);

    // If you want image thumbnails later:
    if (item.thumb) {
      const media = document.createElement("div");
      media.className = "card__media";
      media.style.backgroundImage = `url("${item.thumb}")`;
      link.appendChild(media);
    }

    // Visible label (remove if you don’t want it)
    const label = document.createElement("div");
    label.className = "card__label";
    label.textContent = item.label;
    link.appendChild(label);

    card.appendChild(link);
    grid.appendChild(card);

    // remove entering class after animation completes (keeps DOM clean)
    card.addEventListener("animationend", () => {
      card.classList.remove("is-entering");
      card.style.animationDelay = "";
    }, { once: true });
  });
}

function setActiveTab(category){
  tabs.forEach(btn => {
    const isActive = btn.dataset.category === category;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });
}

function switchCategory(category){
  if (category === activeCategory) return;

  // Exit animation on existing cards
  grid.classList.add("is-exiting");

  // After exit, swap content then enter
  const exitDurationMs = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 240;

  setTimeout(() => {
    grid.classList.remove("is-exiting");
    activeCategory = category;
    setActiveTab(category);
    render(category);
  }, exitDurationMs);
}

// Initial render
setActiveTab(activeCategory);
render(activeCategory);

// Wire tabs
tabs.forEach(btn => {
  btn.addEventListener("click", () => switchCategory(btn.dataset.category));
});
