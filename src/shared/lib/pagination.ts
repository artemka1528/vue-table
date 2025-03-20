export const persistData = <T>(key: string, data: T) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getData = <T>(key: string): T | null => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};
