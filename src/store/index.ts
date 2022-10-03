import { configureStore } from '@reduxjs/toolkit'
import { pairCodeSlice } from './paircode';
import { slidesSlice } from './slides';

export const store = configureStore({
  reducer: {
    pairCode: pairCodeSlice.reducer,
    slides: slidesSlice.reducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;