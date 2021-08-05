import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice";
import usuarioReducer from "../features/usuario/usuarioSlice";
import favoritoReducer from "../features/favorito/favoritoSlice";
import empresaRecenteReducer from "../features/empresa_recente/empresaRecenteSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    usuario: usuarioReducer,
    favorito: favoritoReducer,
    empresaRecente: empresaRecenteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
