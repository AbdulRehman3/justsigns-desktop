import { Slide, SupportedMediaType } from "../types/slide.interface"

export const parseSlidesResult = (slidesResult: any[]) => {
	const slides: Slide[] = slidesResult.filter(item => item.url).map(item => {
		const parseItem = {
			data_timing: parseInt(item.data_timing),
			orientation: parseInt(item.orientation),
			transition: item.transition,
			type: (item.type as string).includes("image") ? "image" : "video" as SupportedMediaType,
			url: (item.url as string).replace("http:", "https:"),
		}
		return parseItem;
	});
	return slides;
}