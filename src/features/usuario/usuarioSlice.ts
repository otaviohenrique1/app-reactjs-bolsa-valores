import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UsuarioState {
  id: string;
  nome: string;
  email: string;
  senha: string;
}

const usuarioInitialState: UsuarioState = {
  id: '',
  nome: '',
  email: '',
  senha: ''
};

export const usuarioSlice = createSlice({
  name: 'usuario',
  initialState: usuarioInitialState,
  reducers: {
    setUsuario: (state, action: PayloadAction<UsuarioState>) => {
      return {
        ...state,
        ...action.payload
      };
    },
    updateUsuario: (state, action: PayloadAction<UsuarioState>) => {
      return {
        ...state,
        ...action.payload
      };
    },
  }
});

export const {
  setUsuario,
  updateUsuario
} = usuarioSlice.actions;

export default usuarioSlice.reducer;
