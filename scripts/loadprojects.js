document.addEventListener('DOMContentLoaded', loadProjects("technology"));

async function loadProjects(sortBy = null) {
    const response = await fetch('projects.json');
    const projects = await response.json();

    // Custom order array
    const customOrder = {
        'technology' : ['Unity', 'WebGL/GLSL','WebGL/Three.JS', 'Construct3', 'Phaser', 'CrispGameLib', 'HTML/P5.JS', 'Twine'],

        };
    
    const reType = {
        'WebGL/GLSL': 'WebGL',
        'WebGL/Three.JS': 'WebGL',
        undefined : 'My Work!',
    }

    if(customOrder[sortBy]){

        projects.sort((a, b) => {
            console.log(customOrder[sortBy].indexOf(a[sortBy]));
            console.log(customOrder[sortBy].indexOf(b[sortBy]));
            return customOrder[sortBy].indexOf(a[sortBy]) - customOrder[sortBy].indexOf(b[sortBy]);
        });

    } else {

        // Sort projects based on the sortBy criterion
        projects.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return -1;
            if (a[sortBy] > b[sortBy]) return 1;
            return 0;
        });

    }




    const projectsContainer = document.getElementById('projectsContainer');
    
    let IDindex = 0;
    let lastType = null;
    projects.forEach(project => {
        let sortType = project[sortBy];

        if(reType[project[sortBy]]){
            sortType = reType[project[sortBy]];
        }
        
        if(lastType === null || lastType !== sortType){
            const headerDiv = document.createElement('div');
            headerDiv.className = 'title';
            headerDiv.innerHTML = `${sortType}`;
            projectsContainer.appendChild(headerDiv);

            IDindex++;
            const projectGrid = document.createElement('div');
            projectGrid.className = 'projectGrid';
            projectGrid.id = `p${IDindex}`;
            projectsContainer.appendChild(projectGrid);
        }
        document.getElementById(`p${IDindex}`).appendChild(createProjectHTML(project));
        lastType = sortType;
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
                        <br> ${project.description} <i>(${project.technology})</i>
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