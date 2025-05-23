document.addEventListener('DOMContentLoaded', function () {
    fetch('content.json')
        .then(response => response.json())
        .then(data => {
            // Set document title
            document.title = data.title || 'Martijn van D H - GitHub';

            // Header
            document.getElementById('name').textContent = data.name;
            document.getElementById('subtitle').textContent = data.subtitle;
            // About
            document.getElementById('about-text').textContent = data.about;
            // Projects
            const projectsDiv = document.getElementById('projects-list');
            projectsDiv.innerHTML = '';
            data.projects.forEach((project, idx) => {
                const card = document.createElement('div');
                card.className = 'project-card';
                let desc = project.description;
                if (project.md) {
                    desc += `<br><a href="#" class="md-link" data-md="${project.md}">Read more</a>`;
                }
                card.innerHTML = `<h3>${project.title}</h3><p>${desc}<br><a href="${project.url}" target="_blank">View on GitHub</a></p>`;
                projectsDiv.appendChild(card);
            });
            // Contact
            document.getElementById('contact-email').href = 'mailto:' + data.contact.email;
            document.getElementById('contact-email').textContent = 'email';
            document.getElementById('contact-github').href = data.contact.github;
            // Footer
            const footer = data.footer;
            document.getElementById('footer-name').textContent = footer.text;
            const footerLink = document.getElementById('footer-github');
            if (footerLink) {
                footerLink.href = footer.githubUrl;
                footerLink.textContent = footer.githubLabel;
            }
            document.getElementById('footer-copyright').textContent = footer.copyright;
        });
});

// Markdown readview logic
const markdownView = document.getElementById('markdown-view');
const markdownContent = document.getElementById('markdown-content');
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('md-link')) {
        e.preventDefault();
        const mdFile = e.target.getAttribute('data-md');
        fetch(mdFile)
            .then(res => res.text())
            .then(md => {
                markdownContent.innerHTML = marked.parse(md);
                markdownView.style.display = 'block';
                window.scrollTo({top: markdownView.offsetTop - 30, behavior: 'smooth'});
            });
    }
});
document.getElementById('close-markdown').onclick = function() {
    markdownView.style.display = 'none';
    markdownContent.innerHTML = '';
};
