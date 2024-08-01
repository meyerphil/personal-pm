document.addEventListener('DOMContentLoaded', () => {
    // Load projects with default sorting
    loadProjects();
});

window.navigation.addEventListener("navigate", () => {
    console.log('hash refresh');
    loadProjects();
});

async function loadProjects() {
    const response = await fetch('/projects/projects.json');
    const projects = await response.json();


    const projectsContainer = document.getElementById('projectsContainer');
    projectsContainer.innerHTML = '';  // Clear any existing content

    // Extract project title from the hash fragment
    // EX. meyerphil.com/projects/p/#The%20Last%20Extraction
    const projectTitle = decodeURIComponent(window.location.hash.substring(1));
    
    let project = projects.find(p => p.title === projectTitle);

    if(project !== undefined){
        document.title = project.title;
        document.querySelector('.title').innerHTML = project.title;
        document.querySelector('.subtitle').innerHTML = project.description;

        document.getElementsByClassName('background-image')[0].style.backgroundImage = `url(${project.image})`;

        projectsContainer.appendChild(createProjectHTML(project));
    } else {
        document.title = 'No Project Found';
        document.querySelector('.title').innerHTML = 'No Project Found';
        document.querySelector('.subtitle').innerHTML = '';
        console.log('no project found');
    }

    
}

function createProjectHTML(project) {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project';

    let playButtonHTML = '';
    if (project.playLink) {
        playButtonHTML = `<a href="${project.playLink}">Play on ${project.published}</a>`;
    }

    let moreinfoHTML = '';

    if(project.more_info !== undefined){

        project.more_info.forEach(info => {
            if (info.type === 'image') {
              moreinfoHTML += `<p class="text">
                                  <img src="${info.path}" alt="${info.subtitle}">
                                  <br>
                                  <b>${info.subtitle}</b>
                               </p>`;
            } else if (info.type === 'text') {
              moreinfoHTML += `<p class="text">
                                  <b>${info.header}</b>
                                  <br>${info.data}
                               </p>`;
            } else if (info.type === 'slides') {
                moreinfoHTML += `<p class="text">
                                    <b>${info.header}</b>
                                    <br><iframe src="${info.src}/embed?start=false&loop=true&delayms=5000" frameborder="0" width="685" height="422" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
                                    
                                 </p>`;
            } else if (info.type === 'video') {
                moreinfoHTML += `<p>
                                    <iframe width="1000" height="600" src="${info.src}" title="${info.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                </p> 
                                `;
            } else if (info.type === 'projectbox') {
                moreinfoHTML += `<div class="projectBox">
                                    <center>
                                        <iframe class = "boxVideo" src="${info.src}" title="${info.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                        <p class="projectText">
                                            <b>${info.header}</b>
                                            <br> ${info.description} <i>(${project.technology})</i>
                                            <ul>${info.work.map(item => `<li>${item}</li>`).join('')}</ul>
                                        </p>
                                    </center>
                                </div>
                                `;
            }
        });

    } else {
        console.log(`Project doesn't contain more info.`);
    }


    projectDiv.innerHTML = `            
            <div class="projectBox">
                <center>
                    <img class="projectGif" src="${project.gif}" alt="${project.title}">
                    <p class="projectText">
                        <b>${project.title}</b>
                        <br> ${project.description} <i>(${project.technology})</i>
                        <br>
                        ${playButtonHTML}
                        <ul>${project.work.map(item => `<li>${item}</li>`).join('')}</ul>
                    </p>
                </center>
            </div>

            <img class="projectImage" src="${project.image}" alt="${project.title}">
            
            ${moreinfoHTML}

    `;

    return projectDiv;
}