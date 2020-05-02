window.onload = function () {
    setTimeout(() => {
        if (window.pageYOffset === 0) activateNavElement(NavElement.HOME);
    }, 10);
    const sidenav = new M.Sidenav(document.getElementById("sidenav"), {
        preventScrolling: true
    });
    document.getElementById("menu-button").onclick = sidenav.open.bind(sidenav);
    const elements = document.querySelectorAll("#sidenav li");
    for (let i = 0; i < 6; i++) {
        elements[i].onclick = function () {
            sidenav.close();
            goToPart(i);
        }
    }

    randomizeBg();

    for (const element of document.getElementsByClassName("logo")) element.onclick = randomizeBg;

    const row = document.querySelector(".cards .row");
    let cards = [...row.childNodes].filter(element => typeof element.tagName !== "undefined" && element.tagName.toLowerCase() === "div");
    cards = cards.sort(() => Math.random() - 0.5);
    while (row.firstChild) {
        row.removeChild(row.lastChild)
    }
    for (const card of cards) {
        row.appendChild(card);
    }
    console.log(cards[3]);
    cards[3].className += " last-card";
};

function randomizeBg() {
    let arr = [];
    for (let i = 0; i < 6; i++) {
        arr.push(i === 0 ? "parrot.jpg" : `parrot${i+1}.jpg`)
    }

    for (let i = 0; i < 6; i++) {
        let idx = parseInt(Math.random() * arr.length);
        let img = arr[idx];
        document.getElementsByClassName("bg-image")[i].style["background-image"] = `url(img/${img})`;
        arr.splice(idx, 1);
    }
}

const NavElement = Object.freeze({
    HOME: 0,
    SERVICE: 1,
    MERITS: 2,
    TEAM: 3,
    REVIEWS: 4,
    CONTACT: 5,
});

function activateNavElement(id) {
    for (const element in NavElement) if (NavElement.hasOwnProperty(element) && typeof NavElement[element] === "number") {
        const li = document.querySelectorAll("#nav-mobile li")[NavElement[element]];
        li.style["background-color"] = id === NavElement[element] ? "rgb(0, 0, 0)" : "";
        li.onclick = id === NavElement[element] ? () => {} : () => goToPart(NavElement[element])
    }
}

function goToPart(id) {
    window.scrollTo({
        behavior: "smooth",
        top: document.getElementsByClassName("bg-image")[id].offsetTop - document.querySelector("nav .nav-wrapper").clientHeight
    });
}

window.onscroll = function () {
    for (let i = 0; i < 5; i++) {
        if (window.pageYOffset < document.getElementsByClassName("bg-image")[i+1].offsetTop - window.innerHeight/2) {
            activateNavElement(i);
            return;
        }
    }
    activateNavElement(NavElement.CONTACT);
};
