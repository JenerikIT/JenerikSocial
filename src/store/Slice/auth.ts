import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Типы
interface AuthState {
  token: string | null;
  userData: {
    id: string;
    name: string;
    email: string;
  } | null;
  isLoading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  userData: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },

    logout: (state) => {
      state.token = null;
      state.userData = null;
      localStorage.removeItem("token");
    },

    setUserData: (state, action: PayloadAction<AuthState["userData"]>) => {
      state.userData = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Экспорт действий и редьюсера
export const { setToken, logout, setUserData, setLoading, setError } =
  authSlice.actions;
export default authSlice.reducer;
