"use strict";
const hamburguer = document.querySelector('#hamburguer');
// outra forma de criar a função seria:
// function toggleMenu(event: PointerEvent) {...}
// hamburguer?.addEventListener('pointerdown', toggleMenu);
function toggleMenu(event) {
    if (window.TouchEvent && event instanceof TouchEvent)
        event.preventDefault();
    console.log("Me clicaram!");
}
hamburguer?.addEventListener('touchend', toggleMenu);
hamburguer?.addEventListener('click', toggleMenu);
//# sourceMappingURL=script.js.map