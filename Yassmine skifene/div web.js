let posts = [];

function publishPost() {
  const title = titleInput().value;
  const content = contentInput().value;
  if (!title || !content) return;

  posts.unshift({
    title,
    category: categoryInput().value,
    author: authorInput().value,
    content,
    date: new Date()
  });

  clearForm();
  renderPosts();
}

function renderPosts() {
  const container = document.getElementById("posts");
  const search = document.getElementById("search").value.toLowerCase();
  const sort = document.getElementById("sort").value;

  let filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search) ||
    p.content.toLowerCase().includes(search) ||
    p.author.toLowerCase().includes(search)
  );

  if (sort === "oldest") filtered.reverse();

  container.innerHTML = "";

  if (filtered.length === 0) {
    container.innerHTML = "<p>No posts yet ✨</p>";
    return;
  }

  filtered.forEach(p => {
    container.innerHTML += `
      <div class="post">
        <h3>${p.title}</h3>
        <small>${p.category} • ${p.author}</small>
        <p>${p.content}</p>
      </div>
    `;
  });

  document.getElementById("totalPosts").innerText = posts.length;
}

function clearForm() {
  titleInput().value = "";
  categoryInput().value = "";
  authorInput().value = "";
  contentInput().value = "";
}

function resetAll() {
  posts = [];
  renderPosts();
}

const titleInput = () => document.getElementById("title");
const categoryInput = () => document.getElementById("category");
const authorInput = () => document.getElementById("author");
const contentInput = () => document.getElementById("content");
