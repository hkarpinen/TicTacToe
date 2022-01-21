import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import gameBoardSlice from './reducers/Game';

export const store = configureStore({
    reducer: {
      gameBoardSlice: gameBoardSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
