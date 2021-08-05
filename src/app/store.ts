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
