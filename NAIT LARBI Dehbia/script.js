document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('post-form');
    const postsList = document.getElementById('posts-list');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Récupération des valeurs
        const title = document.getElementById('title').value;
        const category = document.getElementById('category').value;
        const author = document.getElementById('author').value;
        const content = document.getElementById('content').value;
        const date = new Date().toLocaleDateString('fr-FR');

        // Création de l'élément post
        const postCard = document.createElement('div');
        postCard.className = 'post-item';
        postCard.innerHTML = `
            <div style="display:flex; justify-content:space-between; font-size:0.8rem; opacity:0.7;">
                <span>🏷️ ${category}</span>
                <span>👤 ${author}</span>
            </div>
            <h3 style="margin: 10px 0;">${title}</h3>
            <p style="font-size:0.9rem; opacity:0.9;">${content}</p>
            <small style="opacity:0.5;">Publié le ${date}</small>
        `;

        // Ajout à la liste (en haut)
        postsList.prepend(postCard);

        // Reset du formulaire
        form.reset();
    });
});