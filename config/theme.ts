export type Theme = 'light' | 'dark';

export const themeStorageKey = 'fullkeem-theme';
export const themeChangeEvent = 'fullkeem-theme-change';

// Set the saved preference before the first paint; an unavailable store defaults to light.
export const themeInitScript = `try{document.documentElement.dataset.theme=localStorage.getItem('${themeStorageKey}')==='dark'?'dark':'light'}catch{document.documentElement.dataset.theme='light'}`;
