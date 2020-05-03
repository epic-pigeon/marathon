window.onload = function () {
    translate();

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
    randomizeCards();

    for (const element of document.getElementsByClassName("logo")) element.onclick = randomizeBg;

    const teamList = new M.Collapsible(document.getElementById("team-list"), {});

    const serviceTabs = new M.Tabs(document.getElementById("service-tabs"), {
        //swipeable: true
    });

    const accountDropdown = new M.Dropdown(document.getElementById("account-dropdown-trigger"), {});

    const adDropdown = new M.Dropdown(document.getElementById("ads-dropdown-trigger"), {});

    const signInModal = new M.Modal(document.getElementById("sign-in-modal"), {
        preventScrolling: false
    });
    const signUpModal = new M.Modal(document.getElementById("sign-up-modal"), {
        preventScrolling: false
    });
    const languageModal = new M.Modal(document.getElementById("languages-modal"), {
        preventScrolling: false
    });

    const languageCollection = document.querySelector("#languages-modal .modal-content .collection");
    for (const lang in Translation) if (Translation.hasOwnProperty(lang) && lang !== "default" && typeof Translation[lang] === "object") {
        const translation = Translation[lang];
        const text = `${translation.LANGUAGE_NAME_TRANSLATED} (${translation.LANGUAGE_NAME})`;
        const a = document.createElement("a");
        a.className = "collection-item white-text";
        a.innerText = text;
        if (Translation.defaultLang === lang) {
            a.className += " active";
        } else {
            a.onclick = function () {
                Translation.setLanguage(lang);
                window.location.reload();
            }
        }
        languageCollection.appendChild(a);
    }

    resizeVideo();
    window.onresize = resizeVideo;

    fingerprint().then(r => {
        window.__fingerprint = r;
        closePreloader();
    }).catch(e => {
        console.log(e);
        new M.Modal(document.getElementById("adblock-modal"), { dismissible: false }).open();
    });
};

function closePreloader() {
    document.getElementById("preloader").style.opacity = "0";
    setTimeout(() => document.getElementById("preloader").style.display = "none", 200)
}

function resizeVideo() {
    const video = document.getElementById("video");
    if (video) video.style.height = (video.clientWidth / 16 * 9) + "px";
}

function randomizeCards() {
    const row = document.querySelector(".cards .row");
    let cards = [...row.childNodes].filter(element => typeof element.tagName !== "undefined" && element.tagName.toLowerCase() === "div");
    cards[3].className = cards[3].className.split(" ").filter(val => val !== "last-card").join(" ");
    cards = cards.sort(() => Math.random() - 0.5);
    while (row.firstChild) {
        row.removeChild(row.lastChild)
    }
    for (const card of cards) {
        row.appendChild(card);
    }
    cards[3].className += " last-card";
}

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
    REVIEW: 4,
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

let id;

async function fingerprint() {
    return await new Promise((resolve, reject) => {
        setTimeout(() => {
            if (window.Fingerprint2) window.Fingerprint2.getV18({}, r => {
                id = r;
                resolve(r)
            }); else reject(new Error("Fingerprint not found"))
        }, 500);
    });
}

function translate() {
    let initialBody = document.getElementsByTagName("body")[0].innerHTML;
    let result = "";
    for (let i = 0; i < initialBody.length; i++) {
        if (initialBody[i] === "{") {
            if (initialBody[i+1] === "{") {
                let js = "";
                for (let j = i+2; j < initialBody.length; j++) {
                    if (initialBody[j] === "}") {
                        if (initialBody[j+1] === "}") {
                            i = j+1;
                            try {
                                result += eval(js);
                            } catch (e) {
                                console.log(js);
                                throw e;
                            }
                            break;
                        } else js += "}"
                    } else js += initialBody[j];
                }
            } else result += "{";
        } else result += initialBody[i];
    }
    document.getElementsByTagName("body")[0].innerHTML = result;
}
