import { isValidJSON } from "../utils/parseSlidesResult";

export const fetchSlides = async (deviceCode: number) => {
    try {
        const url = `https://justsigns.tv/webplayer/function_slider.php?code=${deviceCode}`;
        // const url = "https://justsigns.tv/webplayer/function_slider.php?code=34823357";
        const response = await fetch(url);
        const parsedResponse = await response.text();
        if (isValidJSON(parsedResponse)) {
            return JSON.parse(parsedResponse);
        }
        return parsedResponse;
    } catch (error) {
        throw error;
    }
};