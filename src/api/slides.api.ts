export const fetchSlides = async (deviceCode: number) => {
    try {
        // const url = `https://justsigns.tv/webplayer/function_slider.php?code=${deviceCode}`;
        const url = "https://justsigns.tv/webplayer/function_slider.php?code=34823357";
        const response = await fetch(url);
        const slidesData = await response.json();
        return slidesData;
    } catch (error) {
        throw error;
    }
};