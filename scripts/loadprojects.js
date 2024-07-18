document.addEventListener('DOMContentLoaded', loadProjects);

async function loadProjects() {
    const response = await fetch('projects.json');
    const projects = await response.json();

    const projectsContainer = document.getElementById('projectsContainer');
    projects.forEach(project => {
        projectsContainer.appendChild(createProjectHTML(project));
    });
}

function createProjectHTML(project) {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project';

    let playButtonHTML = '';
    let infoButtonHTML = '';
    if (project.playLink) {
        playButtonHTML = `<a href="${project.playLink}">PLAY HERE</a>`;

        if (project.infoLink) {
            infoButtonHTML = `<span style="display: inline-block; width: 2em;"></span><a href="${project.infoLink}">INFO</a>`;
        }
    } else if (project.infoLink) {
        infoButtonHTML = `<a href="${project.infoLink}">INFO</a>`;
    }



    projectDiv.innerHTML = `
        <div class="projectHover">
            <img class="projectImage" src="${project.image}" alt="${project.title}">
            <div class="projectBox">
                <center>
                    <img class="projectGif" src="${project.gif}" alt="${project.title}">
                    <p class="projectText">
                        <b>${project.title}</b>
                        <br> ${project.description}
                        <br>
                        ${playButtonHTML}${infoButtonHTML}
                        <ul>${project.work.map(item => `<li>${item}</li>`).join('')}</ul>
                    </p>
                </center>
            </div>
        </div>
        <button class="projectClose">x</button>
    `;

    return projectDiv;
}