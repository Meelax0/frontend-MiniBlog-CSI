const KEY = "newyear_posts_simple_v1";

const form = document.getElementById("blogForm");
const postsEl = document.getElementById("posts");
const emptyStateEl = document.getElementById("emptyState");

const titleEl = document.getElementById("title");
const categoryEl = document.getElementById("category");
const authorEl = document.getElementById("author");
const contentEl = document.getElementById("content");

const clearBtn = document.getElementById("clearBtn");
const resetBtn = document.getElementById("resetBtn");
const countdownText = document.getElementById("countdownText");

// Load existing posts
let posts = loadPosts();
renderPosts();

// Create post
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const post = {
    title: titleEl.value.trim(),
    category: categoryEl.value.trim(),
    author: authorEl.value.trim(),
    content: contentEl.value.trim(),
    createdAt: new Date().toISOString(),
  };

  if (!post.title || !post.category || !post.author || !post.content) return;

  posts.unshift(post);
  savePosts();
  renderPosts();
  form.reset();
  titleEl.focus();
});

// Clear form
clearBtn.addEventListener("click", () => {
  form.reset();
  titleEl.focus();
});

// Reset all posts
resetBtn.addEventListener("click", () => {
  if (!confirm("Delete all posts?")) return;
  posts = [];
  savePosts();
  renderPosts();
  form.reset();
});

// Render
function renderPosts() {
  postsEl.innerHTML = "";

  if (posts.length === 0) {
    emptyStateEl.style.display = "flex";
    return;
  }

  emptyStateEl.style.display = "none";

  posts.forEach((p) => {
    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <h3>${escapeHTML(p.title)}</h3>
      <div class="meta">
        <span class="pill">${escapeHTML(p.category)}</span>
        by <b>${escapeHTML(p.author)}</b> • ${formatDate(p.createdAt)}
      </div>
      <p class="preview">${escapeHTML(p.content)}</p>
    `;

    postsEl.appendChild(div);
  });
}

function loadPosts() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function savePosts() {
  localStorage.setItem(KEY, JSON.stringify(posts));
}

function formatDate(iso) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function escapeHTML(str) {
  return str.replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
}

// Countdown (simple)
function updateCountdown() {
  const now = new Date();
  const next = new Date(`January 1, ${now.getFullYear() + 1} 00:00:00`);
  const diff = next - now;

  if (diff <= 0) {
    countdownText.textContent = "Happy New Year! 🎆";
    return;
  }

  const total = Math.floor(diff / 1000);
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  countdownText.textContent = `${d}d ${h}h ${m}m ${s}s`;
}
setInterval(updateCountdown, 1000);
updateCountdown();
