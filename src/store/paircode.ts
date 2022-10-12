import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchPairCodeFromServer } from '../api/pairCode.api';
import { generateUniqueId } from '../utils/deviceId';
import { setLocalstoragePairCode } from '../utils/localstorage';
import { RootState } from './index';
import { fetchSlidesData } from './slides';

interface PairCodeState {
	deviceId?: string;
	code: number | null;
	isLoading: boolean,
	hasError: boolean,
	isPaired: boolean,
	pairingChecked: boolean,
}

const initialState: PairCodeState = {
	code: null,
	isLoading: true,
	hasError: false,
	deviceId: undefined,
	isPaired: false,
	pairingChecked: false,
}

export const fetchPairCode = createAsyncThunk<number>(
	'paircode/fetch',
	async (_: void, { getState, dispatch }) => {
		const { pairCode } = getState() as RootState;
		let uniqueDeviceId: string;
		
		if (pairCode.deviceId) {
			uniqueDeviceId = pairCode.deviceId;
		} else {
			uniqueDeviceId = generateUniqueId();
			dispatch(setDeviceId(uniqueDeviceId));
		}

		const response = await fetchPairCodeFromServer(uniqueDeviceId);
		setLocalstoragePairCode(response);
		dispatch(fetchSlidesData());
		return parseInt(response);
	}
)

export const pairCodeSlice = createSlice({
	name: 'paircode',
	initialState,
	reducers: {
		setPairCode: (state, { payload }: { payload: number }) => {
			state.code = payload;
			state.hasError = false;
			state.isLoading = false;
		},
		setDeviceId: (state, { payload }: { payload: string }) => {
			state.deviceId = payload;
		},
		setPairingStatus: (state, { payload }: { payload: boolean }) => {
			state.pairingChecked = true;
			state.isPaired = payload;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPairCode.pending, (state) => {
			state.code = null;
			state.hasError = false;
			state.isLoading = true;
		});

		builder.addCase(fetchPairCode.fulfilled, (state, { payload }) => {
			state.code = payload;
			state.hasError = false;
			state.isLoading = false;
		});

		builder.addCase(fetchPairCode.rejected, (state, { payload }) => {
			state.code = null;
			state.hasError = true;
			state.isLoading = false;
		})
	},
});

// Actions
export const { setPairCode, setDeviceId, setPairingStatus } = pairCodeSlice.actions;

// Selectors
export const selectPairCodeData = (state: RootState): PairCodeState => state.pairCode;
export const selectPairCode = createSelector(selectPairCodeData, (pairCodeData) => {
	return pairCodeData.code;
});