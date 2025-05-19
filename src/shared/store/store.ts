import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from '@/shared/model/session';

export const useSession = configureStore({
    reducer: {
        session: sessionReducer,
    }
});

export type RootState = ReturnType<typeof useSession.getState>;
export type AppDispatch = typeof useSession.dispatch;