function loadComponent(url, elementId) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading component:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    const components = document.querySelectorAll('[data-component]');
    components.forEach(component => {
        const url = component.getAttribute('data-component');
        loadComponent(url, component.id);
    });
});