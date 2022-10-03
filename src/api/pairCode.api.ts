export const fetchPairCodeFromServer = async (uniqueId: string) => {
    try {
        const response = await fetch('https://justsigns.tv/webplayer/pair_id.php?ip=' + uniqueId);
        const pairCode = await response.text();
        return pairCode;
    } catch (error) {
        throw error;
    }
};