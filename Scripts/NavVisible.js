document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');

    document.addEventListener('mousemove', (event) => {
        const screenWidth = window.innerWidth;
        const threshold = 200; // Distancia en píxeles desde el borde derecho para mostrar la barra

        if (screenWidth - event.clientX < threshold) {
            nav.classList.add('visible');
        } else {
            nav.classList.remove('visible');
        }
    });
});

