import { useState } from "react";
import { Api, Api2, DataCompany, DataCompanyInitialData, DataHistoricalPrice, DataHistoricalPricesInitialData, DataProps2, DataQuote, DataQuoteInitialData } from "../services/api";

export function BuscaEmpresa(symbol: string) {
  const [dataCompany, setDataCompany] = useState<DataCompany>(DataCompanyInitialData);
  const [dataQuote, setDataQuote] = useState<DataQuote>(DataQuoteInitialData);
  const [dataHistoricalPricesGrafico, setHistoricalPricesGrafico] = useState<DataHistoricalPrice[]>(DataHistoricalPricesInitialData);
  const [dataError, setDataError] = useState<any[]>([]);
  const [dataBuscaEmpresa, setDataBuscaEmpresa] = useState<DataProps2>();
  
  Api({
    symbol: symbol,
    type: 'company'
  }).then((data) => {
    setDataCompany(data.data);
    // console.log(data.data);
  }).catch((error) => {
    setDataError(error);
  });

  Api({
    symbol: symbol,
    type: 'quote'
  }).then((data) => {
    setDataQuote(data.data);
    // console.log(data.data);
  }).catch((error) => {
    setDataError(error);
  });

  Api2({
    symbol: symbol,
    type: 'chart',
    conteudo: '/1m'
    // conteudo: '/5d'
  }).then((data) => {
    setHistoricalPricesGrafico(data.data);
    // console.log(data.data);
    
  }).catch((error) => {
    setDataError(error);
  });
  
  setDataBuscaEmpresa({
    nome_empresa: dataCompany.companyName,
    codigo_empresa: dataCompany.symbol,
    valor_acao: dataQuote.latestPrice,
    porcentagem: dataQuote.changePercent,
    data: dataHistoricalPricesGrafico,
  });

  return {
    data: dataBuscaEmpresa,
    error: dataError
  };
}