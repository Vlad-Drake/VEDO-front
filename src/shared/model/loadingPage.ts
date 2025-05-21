import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';

export const StatusPage = {
    Loading: 'loading',
    Error: 'error',
    Done: 'done',
} as const

export type StatusPageType = typeof StatusPage[keyof typeof StatusPage];

type LoadingPageState = {
    status: StatusPageType,
    errorMessage: string,
}

const initialState: LoadingPageState = {
    status: 'loading',
    errorMessage: '',
}

const loadingPageSlice = createSlice({
    name: 'loadingPage',
    initialState,
    reducers: {
        loading(state) {
            state.status = StatusPage.Loading;
            state.errorMessage = '';
        },
        error(state, action: PayloadAction<string>) {
            state.status = StatusPage.Error;
            state.errorMessage = action.payload;
        },
        done(state) {
            state.status = StatusPage.Done;
            state.errorMessage = '';
        },
    },
});

export default loadingPageSlice.reducer;

const { loading: loadingAction, error: errorAction, done: doneAction } = loadingPageSlice.actions;

export const useLoadingPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const loadingPage = useSelector((state: RootState) => state.loadingPage);

    const loading = () => dispatch(loadingAction());
    const error = (error: string) => dispatch(errorAction(error));
    const done = () => dispatch(doneAction());

    return { loadingPage, loading, error, done };
};