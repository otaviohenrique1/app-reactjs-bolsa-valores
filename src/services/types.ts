export interface DataCompany {
  symbol: string; // codigo_empresa
  companyName: string; // nome_empresa
}

export const DataCompanyInitialData: DataCompany = {
  symbol: '',
  companyName: ''
};

export interface DataQuote {
  symbol: string; // codigo_empresa
  companyName: string; // nome_empresa
  latestPrice: number; // valor_acao
  changePercent: number; // porcentagem
}

export interface DataHistoricalPrices {
  // grafico
  data: DataHistoricalPrice[];
}

export interface DataHistoricalPrice {
  close: number; // uv => no grafico
  date: string; // name => no grafico
  high: number,
  low: number
}

export const DataHistoricalPriceInitialData: DataHistoricalPrice = {
  close: 0,
  date: '',
  high: 0,
  low: 0,
};

export const DataHistoricalPricesInitialData = [];

export const DataQuoteInitialData: DataQuote = {
  symbol: '',
  companyName: '',
  latestPrice: 0,
  changePercent: 0
};

export interface DataValorVariacaoDinheiro {
  high: number;
  low: number;
}

export interface DataProps2 {
  nome_empresa: string;
  codigo_empresa: string;
  porcentagem: number;
  valor_acao: number;
  data: DataHistoricalPrice[];
}

export interface DataProps {
  nome_empresa: string;
  codigo_empresa: string;
  porcentagem: number;
  valor_acao: number;
  valor_variacao_dinheiro: number;
  data: {
    uv: number,
    name: string
  }[];
}

export const DataPropsInitialData = {
  nome_empresa: '',
  codigo_empresa: '',
  porcentagem: 0,
  valor_acao: 0,
  valor_variacao_dinheiro: 0,
  data: []
}