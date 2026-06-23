export function createDiv(className, content) {
  const div = document.createElement("div");

  if (Array.isArray(className)) {
    div.classList.add(...className);
  } else {
    div.className = className;
  }

  if (Array.isArray(content)) {
    div.append(...content);
  } else {
    div.textContent = content;
  }

  return div;
}

// Helper: creates a .curr-stats block (stat-name + stat-value)
export function createStat(extraClass, name, value) {
  return createDiv(`curr-stats glass-panel ${extraClass}`, [
    createDiv("stat-name", name),
    createDiv("stat-value", value),
  ]);
}