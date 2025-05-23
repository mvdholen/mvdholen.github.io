document.addEventListener('DOMContentLoaded', function () {
  fetch('content.json')
    .then(response => response.json())
    .then(data => {
      // Header
      document.getElementById('name').textContent = data.name;
      document.getElementById('subtitle').textContent = data.subtitle;
      // About
      document.getElementById('about-text').textContent = data.about;
      // Projects
      const projectsDiv = document.getElementById('projects-list');
      projectsDiv.innerHTML = '';
      data.projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        let desc = project.description;
        if (project.md) {
            desc += `<br><a href='${project.md}' target='_blank'>Read more</a>`;
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
