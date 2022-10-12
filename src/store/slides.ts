import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchSlides } from '../api/slides.api';
import { Slide } from '../types/slide.interface';
import { parseSlidesResult } from '../utils/parseSlidesResult';
import { RootState } from './index';
import { setPairingStatus } from './paircode';

interface SlidesState {
	slides: Slide[],
	isLoading: boolean,
	hasError: boolean,
	refreshAfter: number | null,
}

const initialState: SlidesState = {
	slides: [],
	isLoading: true,
	hasError: false,
	refreshAfter: null,
}

export const fetchSlidesData = createAsyncThunk<Slide[]>(
	'slides/fetch',
	async (_: void, { getState, dispatch }) => {
		const { pairCode } = getState() as RootState;
		const { code } = pairCode;
		const response: any = await fetchSlides(code || -1);
		if (!response || !Array.isArray(response)) {
			dispatch(setPairingStatus(false));
			return [];
		}
		dispatch(setPairingStatus(true));

		const parsedSlides = parseSlidesResult(response);
		return parsedSlides;
	}
)

export const slidesSlice = createSlice({
	name: 'slides',
	initialState,
	reducers: {
		setSlidesData: (state, { payload }: { payload: Slide[] }) => {
			state.slides = payload;
			state.hasError = false;
			state.isLoading = false;
		},
		setRefreshInterval: (state, { payload }: { payload: number | null }) => {
			state.refreshAfter = payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchSlidesData.pending, (state) => {
			state.slides = [];
			state.hasError = false;
			state.isLoading = true;
		});

		builder.addCase(fetchSlidesData.fulfilled, (state, { payload }) => {
			state.slides = payload;
			state.hasError = false;
			state.isLoading = false;
		});

		builder.addCase(fetchSlidesData.rejected, (state, { payload }) => {
			state.slides = [];
			state.hasError = true;
			state.isLoading = false;
		})
	},
});

// Actions
export const { setRefreshInterval } = slidesSlice.actions;

// Selectors
export const selectSlidesData = (state: RootState): SlidesState => state.slides;