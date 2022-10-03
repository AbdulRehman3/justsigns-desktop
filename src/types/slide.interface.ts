export interface Slide {
	data_timing: number
	orientation: number
	transition: string
	type: SupportedMediaType
	url: string
}

export type SupportedMediaType = "image" | "video";