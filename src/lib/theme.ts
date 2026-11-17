export type Theme = "dark" | "light";
export const THEME_STORAGE_KEY = "ew-theme";

/**
 * Script executado antes da pintura para aplicar o tema guardado
 * e evitar o "flash" de tema errado. O tema escuro é o principal.
 */
export const themeInitScript = `(function(){document.documentElement.classList.add("js");try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t;}else{document.documentElement.dataset.theme="dark";}}catch(e){document.documentElement.dataset.theme="dark";}})();`;
