import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: (() => {
    const user = localStorage.getItem('user');
    if (user && user !== 'undefined') {
      try {
        return JSON.parse(user);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        return null;
      }
    }
    return null;
  })(),
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload.token;

      // Persist the user and token in localStorage
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Remove user and token from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }
});

export const { setLoading, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
