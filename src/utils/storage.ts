export const get = (key: string): string | null => {
    return localStorage.getItem(key);
};

export const set = (key: string, value: string): void => {
    localStorage.setItem(key, value);
};

export const rm = (key: string): void => {
    localStorage.removeItem(key);
};

export const clear = () => {
    return localStorage.clear();
};
