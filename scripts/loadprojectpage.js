document.addEventListener('DOMContentLoaded', () => {
    // Load projects with default sorting
    loadProjects();
});

async function loadProjects() {
    const response = await fetch('/projects/projects.json');
    const projects = await response.json();


    const projectsContainer = document.getElementById('projectsContainer');
    projectsContainer.innerHTML = '';  // Clear any existing content
    
    let project = projects.find(p => p.title === "The Last Extraction");

    document.querySelector('.title').innerHTML = project.title;
    document.querySelector('.subtitle').innerHTML = project.description;

    projectsContainer.appendChild(createProjectHTML(project));
}

function createProjectHTML(project) {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project';

    let playButtonHTML = '';
    let infoButtonHTML = '';
    if (project.playLink) {
        playButtonHTML = `<a href="${project.playLink}">Play on ${project.published}</a>`;

        if (project.infoLink) {
            infoButtonHTML = `<span style="display: inline-block; width: 2em;"></span><a href="${project.infoLink}">Info</a>`;
        }
    } else if (project.infoLink) {
        infoButtonHTML = `<a href="${project.infoLink}">Info</a>`;
    }



    projectDiv.innerHTML = `            
            <div class="projectBox">
                <center>
                    <img class="projectGif" src="/projects/${project.gif}" alt="${project.title}">
                    <p class="projectText">
                        <b>${project.title}</b>
                        <br> ${project.description} <i>(${project.technology})</i>
                        <br>
                        ${playButtonHTML}${infoButtonHTML}
                        <ul>${project.work.map(item => `<li>${item}</li>`).join('')}</ul>
                    </p>
                </center>
            </div>

            <div>
            
                <p class = "text">
                ${project.description} ${project.description} ${project.description}
                </p>

                <img class="projectImage" src="/projects/${project.image}" alt="${project.title}">

            </div>
    `;

    return projectDiv;
}