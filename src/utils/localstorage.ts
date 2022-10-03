
export const getLocalstoragePairCode = (): string | null => {
    return localStorage.getItem('pair_code');
}

export const setLocalstoragePairCode = (pairCode: string) => {
    localStorage.setItem('pair_code', pairCode);
    return;
}