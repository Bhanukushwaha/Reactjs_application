import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from './config';

const initialState = {
  token: '',
  loading: false,
  user_data: null,
  message: '',
};
const fetch2 = async (api, body, token = '') => {
  const res = await fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return await res.json();
};
export const signupUser = createAsyncThunk('signupUser', async (body) => {
  try {
    const result = await fetch2(`${BASE_URL}/api/users`, body);
    return result;
  } catch (error) {
    throw new Error('Error signing up user: ' + error.message);
  }
});

export const signinUser = createAsyncThunk('signinUser', async (body) => {  
  try {
    const result = await fetch2(`${BASE_URL}/api/auth/login`, body);
    return result;
  } catch (error) {
    throw new Error('Error signing in user: ' + error.message);
  }
});
export const logout = createAsyncThunk('api/auth/logout', async () => {
  return true;
});

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(signupUser.fulfilled, (state, action) => {
      state.loading = false;
      debugger
      if (action.payload.errors && action.payload.errors !== null) {
        if (action.payload.errors.email && (action.payload.errors.email !== null)){
          state.message = "Email " + action.payload.errors.email.join(", ");
        } else if (action.payload.errors.password && (action.payload.errors.password !== null)){
          state.message =  action.payload.errors.password.join(", ");
        }
      } else {
        state.message = "successfull sign up";
        state.user_data = action.payload;
        localStorage.setItem('login_user', JSON.stringify(action.payload));
      }
    })
    .addCase(signupUser.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(signupUser.rejected, (state, action) => {
      debugger
      state.loading = true;
    })
    .addCase(signinUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.error != null) {
        state.message = action.payload.error;
      } else {
        state.message = "successfull login";
        state.user_data = action.payload.user;
        localStorage.setItem('login_user', JSON.stringify(action.payload.user));
      }
    })
    .addCase(signinUser.rejected, (state, action) => {
      state.message = action.payload.error;
      state.loading = false;
    })
    .addCase(signinUser.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(logout.fulfilled, (state, action) => {
      state.user_data = null;
      state.token = '';
      state.message = "Signed out successfully.";
      // localStorage.removeItem('login_user');
    });
  },
});
export default authReducer.reducer;
