export interface DataCompany {
  symbol: string;
  companyName: string;
}

export const DataCompanyInitialData: DataCompany = {
  symbol: '',
  companyName: ''
};

export interface DataQuote extends DataCompany {
  latestPrice: number;
  changePercent: number;
}

export const DataQuoteInitialData: DataQuote = {
  symbol: '',
  companyName: '',
  latestPrice: 0,
  changePercent: 0
};

export interface DataHistoricalPrice {
  close: number;
  date: string;
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

export interface DataValorVariacaoDinheiro {
  high: number;
  low: number;
}

export interface DataProps {
  nome_empresa: string;
  codigo_empresa: string;
  porcentagem: number;
  valor_acao: number;
  valor_variacao_dinheiro: number;
  data: {
    close: number,
    date: string
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