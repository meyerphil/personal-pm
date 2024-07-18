document.addEventListener('DOMContentLoaded', () => {
    const sortDropdown = document.getElementById('sortDrop');
    sortDropdown.addEventListener('change', (event) => {
        loadProjects(event.target.value);
    });

    // Load projects with default sorting
    loadProjects(sortDropdown.value);
});

async function loadProjects(sortBy = null) {
    const response = await fetch('projects.json');
    const projects = await response.json();

    // Custom order array
    const customOrder = {
        'technology' : ['Unity', 'WebGL/GLSL','WebGL/Three.JS', 'Construct3', 'Phaser', 'CrispGameLib', 'HTML/P5.JS', 'Twine'],
        'published' : ['Steam', 'Itch.io', 'Heroku', 'Github Pages', undefined],
        };
    
    const reType = {
        'WebGL/GLSL': 'WebGL',
        'WebGL/Three.JS': 'WebGL',
        'playLink': ['Not Playable', 'Playable'],
        'infoLink': ['No Further Info', 'More Info Available'],
        'published' : 'Not Published',
        '' : 'Unsorted',
        undefined : 'N/A',
    }

    if (sortBy === 'playLink' || sortBy === 'infoLink') {

        // sort by binary option(property exists)
        projects.sort((a, b) => {
            return (b[sortBy] ? 1 : 0) - (a[sortBy] ? 1 : 0);
        });
    
    } else if(customOrder[sortBy]){

        // Sort projects using custom catagory order
        projects.sort((a, b) => {
            return customOrder[sortBy].indexOf(a[sortBy]) - customOrder[sortBy].indexOf(b[sortBy]);
        });

    } else {

        // Sort projects alphabetically criterion
        projects.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return -1;
            if (a[sortBy] > b[sortBy]) return 1;
            return 0;
        });

    }




    const projectsContainer = document.getElementById('projectsContainer');
    projectsContainer.innerHTML = '';  // Clear any existing content
    
    let IDindex = 0;
    let lastType = null;
    projects.forEach(project => {
        let sortType = project[sortBy];

        if (sortBy === 'playLink' || sortBy === 'infoLink') {
            sortType = reType[sortBy][project[sortBy] ? 1 : 0];
            
        }else if(sortType === undefined){
            sortType = reType[sortBy];
            
        } else if(reType[project[sortBy]]){
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
        playButtonHTML = `<a href="${project.playLink}">Play on ${project.published}</a>`;

        if (project.infoLink) {
            infoButtonHTML = `<span style="display: inline-block; width: 2em;"></span><a href="${project.infoLink}">Info</a>`;
        }
    } else if (project.infoLink) {
        infoButtonHTML = `<a href="${project.infoLink}">Info</a>`;
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