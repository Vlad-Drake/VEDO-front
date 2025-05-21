import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";

type Session = {
  sub: string;
  jti: string;
  t1: string;
  exp: number;
  iss: string;
  aud: string;
};

type SessionState = {
  token: string | null;
  session: Session | null;
};

const TOKEN_KEY = "VEDOToken";
const initialToken = localStorage.getItem(TOKEN_KEY);
const initialSession = initialToken ? jwtDecode<Session>(initialToken) : null;

const initialState: SessionState = {
  token: initialToken,
  session: initialSession,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.token = action.payload;
      state.session = jwtDecode<Session>(action.payload);
      localStorage.setItem(TOKEN_KEY, action.payload);
    },
    logout(state) {
      state.token = null;
      state.session = null;
      localStorage.removeItem(TOKEN_KEY);
    },
  },
});

export default sessionSlice.reducer;

const { login: loginAction, logout: logoutAction } = sessionSlice.actions;

export const useSession = () => {
  const dispatch = useDispatch<AppDispatch>();
  const session = useSelector((state: RootState) => state.session.session);

  const login = (token: string) => dispatch(loginAction(token));
  const logout = () => dispatch(logoutAction());

  return { session, login, logout };
};
