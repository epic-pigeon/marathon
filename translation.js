const Translation = Object.freeze({
    en: {
        HOME: "Home",
        SERVICE: "Service",
        MERITS: "Merits",
        TEAM: "Team",
        REVIEWS: "Reviews",
        CONTACT: "Contact",
        ACCOUNT: "Account",
        SIGN_IN: "Sign In",
        SIGN_UP: "Sign Up",
        FORM_LOGIN: "Login",
        FORM_LOGIN_OR_EMAIL: "Login or Email",
        FORM_FIRST_NAME: "First Name",
        FORM_LAST_NAME: "Last Name",
        FORM_EMAIL: "Email",
        FORM_PASSWORD: "Password",
        FORM_REPEAT_PASSWORD: "Repeat Password",
        FORM_ENTER_INFORMATION: "Enter your information",
        HOME_TITLE: "Introducing Quack-Duck",
        HOME_CONTENT: "company that helps people as well as parrots",
        SERVICE_APPLICATIONS: "Applications",
        SERVICE_APPLICATIONS_TEXT: "Quick, functional and well-designed multi-platform applications",
        SERVICE_TESTS: "Tests",
        SERVICE_TESTS_TEXT: "Detailed solutions for any kind of tests",
        SERVICE_COURSEWORKS: "Courseworks",
        SERVICE_COURSEWORKS_TEXT: "Well-written, unique and informative courseworks in any area",
        MERITS_PRICE: "Price",
        MERITS_PRICE_TEXT: "Lowest prices on the market",
        MERITS_QUALITY: "Quality",
        MERITS_QUALITY_TEXT: "Best specialists in the areas you need",
        MERITS_CHARITY: "Charity",
        MERITS_CHARITY_TEXT: "10% of your money is used to help endangered parrot species",
        MERITS_SPEED: "Speed",
        MERITS_SPEED_TEXT: "First results are to be delivered in a matter of days",
        TEAM_NIKITA: "Nikita \"a_void\" Ostapliuk",
        TEAM_NIKITA_TEXT: "An experienced programmer with thousands of hours of experience in various languages, including C++, Java, HTML, CSS, JS, Python, PHP, ...",
        TEAM_ANTON: "Anton \"professorik\" Boreiko",
        TEAM_ANTON_TEXT: "An wonderful programmer with a great experience in Java, Python as well as an outstanding mathematician",
        CONTACT_TEXT: "contact us via ",
        LANGUAGE: "Language",
        LANGUAGE_NAME: "English",
        LANGUAGE_NAME_TRANSLATED: "English",
    },
    ru: {
        HOME: "Главная",
        SERVICE: "Сервис",
        MERITS: "Преимущества",
        TEAM: "Команда",
        REVIEWS: "Обзоры",
        CONTACT: "Контакты",
        ACCOUNT: "Аккаунт",
        SIGN_IN: "Войти",
        FORM_LOGIN: "Логин",
        FORM_LOGIN_OR_EMAIL: "Логин или емейл",
        FORM_FIRST_NAME: "Имя",
        FORM_LAST_NAME: "Фамилия",
        FORM_EMAIL: "Емейл",
        FORM_PASSWORD: "Пароль",
        FORM_REPEAT_PASSWORD: "Повторите пароль",
        FORM_ENTER_INFORMATION: "Введите информацию о вас",
        SIGN_UP: "Зарегистрироваться",
        HOME_TITLE: "Представляем Quack-Duck,",
        HOME_CONTENT: "компанию, которая помогает и людям, и попугаям",
        SERVICE_APPLICATIONS: "Приложения",
        SERVICE_APPLICATIONS_TEXT: "Быстрые, функциональные приложения с хорошим дизайном и под все платформы",
        SERVICE_TESTS: "Контрольные работы",
        SERVICE_TESTS_TEXT: "Детальные решения для любой контрольной",
        SERVICE_COURSEWORKS: "Курсовые работы",
        SERVICE_COURSEWORKS_TEXT: "Уникальные, информативные и хорошо написанные курсовые по любой теме",
        MERITS_PRICE: "Цена",
        MERITS_PRICE_TEXT: "Самые низкие цены на рынке",
        MERITS_QUALITY: "Качество",
        MERITS_QUALITY_TEXT: "Лучшие специалисты в любых областях",
        MERITS_CHARITY: "Благотворительность",
        MERITS_CHARITY_TEXT: "10% ваших денег идет на помощь видам попугаев под угрозой вымирания",
        MERITS_SPEED: "Скорость",
        MERITS_SPEED_TEXT: "Первые результаты будут в первые же несколько дней",
        TEAM_NIKITA: "Никита \"a_void\" Остаплюк",
        TEAM_NIKITA_TEXT: "Опытный программист с тысячами часов опыта в различных языках программирования, включая C++, Java, HTML, CSS, JS, Python, PHP, ...",
        TEAM_ANTON: "Антон \"professorik\" Борейко",
        TEAM_ANTON_TEXT: "Отличный программист с большим опытом в Java, Python, также выдающийся математик",
        CONTACT_TEXT: "свяжитесь с нами по ",
        LANGUAGE: "Язык",
        LANGUAGE_NAME: "Russian",
        LANGUAGE_NAME_TRANSLATED: "Русский",
    },
    get default() {
        return Translation[Translation.defaultLang]
    },
    get defaultLang() {
        let lang;
        if (localStorage.getItem("language") && Translation[localStorage.getItem("language")]) {
            lang = localStorage.getItem("language");
        }
        if (!lang) {
            lang = "en";
            const navigatorLang = navigator.language.split("-")[0];
            if (Translation[navigatorLang]) {
                lang = navigatorLang;
            }
            localStorage.setItem("language", lang);
        }
        return lang;
    },
    setLanguage(lang) {
        if (Translation[lang]) {
            localStorage.setItem("language", lang);
        } else throw new Error(`Language ${lang} does not exist!`);
    }
});
