import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FavoritoState {
  favorito: boolean;
  nome_empresa: string;
  codigo_empresa: string;
  porcentagem: number;
}

export interface FavoritosState {
  favoritos: FavoritoState[];
}

const favoritoInitialState: FavoritosState = {
  favoritos: [],
};

export const favoritoSlice = createSlice({
  name: 'favorito',
  initialState: favoritoInitialState,
  reducers: {
    setFavorito: (state, action: PayloadAction<FavoritoState>) => {
      const novoFavorito: FavoritoState = {
        favorito: action.payload.favorito,
        nome_empresa: action.payload.nome_empresa,
        codigo_empresa: action.payload.codigo_empresa,
        porcentagem: action.payload.porcentagem,
      };

      return {
        ...state,
        favoritos: state.favoritos.concat(novoFavorito)
      };
    },
    removeFavorito: (state, action: PayloadAction<FavoritoState>) => {
      const favoritoRemovido: FavoritoState[] = state.favoritos.filter(favorito => favorito.codigo_empresa !== action.payload.codigo_empresa);

      return {
        ...state,
        favoritos: favoritoRemovido
      };
    },
  }
});

export const {
  setFavorito,
  removeFavorito
} = favoritoSlice.actions;

export default favoritoSlice.reducer;
