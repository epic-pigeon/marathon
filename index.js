window.onload = function () {
    window.sidenav = new M.Sidenav(document.getElementById("sidenav"), {
        draggable: true,
        preventScrolling: true
    });
    document.getElementById("menu-button").onclick = sidenav.open.bind(sidenav);
    sidenav.open();
};
