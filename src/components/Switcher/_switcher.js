// Switcher

function taggleSwitcher() {
    const switcher = document.querySelector('.switcher');

    switcher.addEventListener('click', () => {
        switcher.classList.toggle('active');
    });
}

taggleSwitcher();
