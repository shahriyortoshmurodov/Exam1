document.addEventListener('DOMContentLoaded', (event) => {
    const menuToggle = document.getElementById('menuToggle');
    const menuIcon = document.getElementById('menuIcon');
    const menu = document.querySelector('.menu');

    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('menu-active');
        if (menu.classList.contains('menu-active')) {
            menuIcon.textContent = '×';
        } else {
            menuIcon.textContent = '+';
        }
    });
});
