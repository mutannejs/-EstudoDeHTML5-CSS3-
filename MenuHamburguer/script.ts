const hamburguer = document.querySelector<HTMLButtonElement>('#hamburguer');

function toggleMenu(event: MouseEvent | TouchEvent) {
    if (window.TouchEvent && event instanceof TouchEvent) event.preventDefault();

    const nav = document.getElementById('nav');
    console.dir(nav);
    if (nav instanceof HTMLElement) {
        nav.classList.toggle('active');
        if (nav.classList.contains('active')) {
            hamburguer!.setAttribute('aria-expanded', 'true');
            hamburguer!.setAttribute('aria-label', 'Fechar Menu');
        } else {
            hamburguer!.setAttribute('aria-expanded', 'false');
            hamburguer!.setAttribute('aria-label', 'Abrir Menu');
        }
    }
}

hamburguer?.addEventListener('touchend', toggleMenu);
hamburguer?.addEventListener('click', toggleMenu);