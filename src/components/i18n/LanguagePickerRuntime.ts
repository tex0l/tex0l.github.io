import {switchLang} from "../../i18n/utils.ts";

function handleToggleLanguage (event: Event) {
    if (event.target) { // @ts-ignore
        const l = event.target.value
        window.localStorage.setItem('i18n', l)
        window.location.assign(switchLang(window.location.pathname, l))
    }
}

const languageSelector = document.getElementById('language-selector')
    if (languageSelector) languageSelector.addEventListener('change', handleToggleLanguage)
