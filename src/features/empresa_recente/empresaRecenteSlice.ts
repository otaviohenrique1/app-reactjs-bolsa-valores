import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EmpresaRecenteState {
  favorito: boolean;
  nome_empresa: string;
  codigo_empresa: string;
  porcentagem: number;
}

export interface EmpresasRecentesState {
  empresas_recentes: EmpresaRecenteState[];
}

const empresasRecenteInitialState: EmpresasRecentesState = {
  empresas_recentes: [],
};

export const empresasRecenteSlice = createSlice({
  name: 'empresa_recente',
  initialState: empresasRecenteInitialState,
  reducers: {
    setEmpresaRecente: (state, action: PayloadAction<EmpresaRecenteState>) => {
      const novaEmpresaRecente: EmpresaRecenteState = {
        favorito: action.payload.favorito,
        nome_empresa: action.payload.nome_empresa,
        codigo_empresa: action.payload.codigo_empresa,
        porcentagem: action.payload.porcentagem,
      };

      return {
        ...state,
        empresas_recentes: state.empresas_recentes.concat(novaEmpresaRecente)
      };
    },
    removeEmpresaRecente: (state, action: PayloadAction<EmpresaRecenteState>) => {
      const empresaRecenteRemovido: EmpresaRecenteState[] = state.empresas_recentes.filter(empresa_recente => empresa_recente.codigo_empresa !== action.payload.codigo_empresa);

      return {
        ...state,
        empresas_recentes: empresaRecenteRemovido
      };
    },
  }
});

export const {
  setEmpresaRecente,
  removeEmpresaRecente
} = empresasRecenteSlice.actions;

export default empresasRecenteSlice.reducer;

/*
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EmpresaRecenteState {
  id: number;
  favorito: boolean;
  src: string;
  alt: string;
  nome_empresa: string;
  codigo_empresa: string;
  porcentagem: number;
}

export interface EmpresasRecentesState {
  empresas_recentes: EmpresaRecenteState[];
}

const empresasRecenteInitialState: EmpresasRecentesState = {
  empresas_recentes: [],
};

export const empresasRecenteSlice = createSlice({
  name: 'empresa_recente',
  initialState: empresasRecenteInitialState,
  reducers: {
    setEmpresaRecente: (state, action: PayloadAction<EmpresaRecenteState>) => {
      const novaEmpresaRecente: EmpresaRecenteState = {
        id: action.payload.id,
        favorito: action.payload.favorito,
        src: action.payload.src,
        alt: action.payload.alt,
        nome_empresa: action.payload.nome_empresa,
        codigo_empresa: action.payload.codigo_empresa,
        porcentagem: action.payload.porcentagem,
      };

      return {
        ...state,
        empresas_recentes: state.empresas_recentes.concat(novaEmpresaRecente)
      };
    },
    removeEmpresaRecente: (state, action: PayloadAction<EmpresaRecenteState>) => {
      const empresaRecenteRemovido: EmpresaRecenteState[] = state.empresas_recentes.filter(empresa_recente => empresa_recente.id !== action.payload.id);

      return {
        ...state,
        empresas_recentes: empresaRecenteRemovido
      };
    },
  }
});

export const {
  setEmpresaRecente,
  removeEmpresaRecente
} = empresasRecenteSlice.actions;

export default empresasRecenteSlice.reducer;
*/
