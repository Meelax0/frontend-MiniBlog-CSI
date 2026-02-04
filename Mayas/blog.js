const STORAGE_KEY = 'blog_posts';
const postForm = document.getElementById('post-form');
const postsFeed = document.getElementById('posts-feed');
const notification = document.getElementById('notification');

document.addEventListener('DOMContentLoaded', () => {
    startCountdown();
    renderPosts();
});

function startCountdown() {
    const updateTimer = () => {
        const now = new Date();
        const nextYear = now.getFullYear() + 1;
        const target = new Date(`January 1, ${nextYear} 00:00:00`);
        const diff = target - now;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = d.toString().padStart(2, '0');
        document.getElementById('hours').textContent = h.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = m.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = s.toString().padStart(2, '0');
    };
    updateTimer();
    setInterval(updateTimer, 1000);
}

postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newPost = {
        id: Date.now(),
        title: document.getElementById('title').value,
        category: document.getElementById('category').value,
        author: document.getElementById('author').value,
        content: document.getElementById('content').value,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    savePost(newPost);
    postForm.reset();
    showNotification();
    renderPosts();
});

function savePost(post) {
    const posts = getPosts();
    posts.unshift(post);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function getPosts() {
    const posts = localStorage.getItem(STORAGE_KEY);
    return posts ? JSON.parse(posts) : [];
}

function deletePost(id) {
    const posts = getPosts().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    renderPosts();
}

function renderPosts() {
    const posts = getPosts();
    if (posts.length === 0) {
        postsFeed.innerHTML = `<div class="empty-state">No posts found. Start writing for 2026.</div>`;
        return;
    }

    postsFeed.innerHTML = posts.map(post => `
        <article class="post">
            <div class="post-header">
                <div>
                    <span class="category-badge cat-${post.category}">${post.category}</span>
                    <h3 class="post-title">${escapeHtml(post.title)}</h3>
                    <div class="post-meta">By ${escapeHtml(post.author)} • ${post.date}</div>
                </div>
                <button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>
            </div>
            <div class="post-content">${escapeHtml(post.content)}</div>
        </article>
    `).join('');
}

function showNotification() {
    notification.style.display = 'block';
    setTimeout(() => notification.style.display = 'none', 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}