import { Form, Formik } from "formik";
import styled from "styled-components";
import { CampoBusca } from "../../../components/Campo";
import * as Yup from "yup";
import { TituloDashboard } from "../../../components/Titulo";
import { Grafico, GraficoContainer } from "../../../components/Grafico";
import { EmpresasRecentes } from "../EmpresasRecentes";
import { FormEvent, useState } from "react";
import { ContainerMensagemSemDados } from "../../../components/Mensagem";
import { useDispatch, useSelector } from "react-redux";
import { setFavorito, removeFavorito } from "../../../features/favorito/favoritoSlice";
import { removeEmpresaRecente, setEmpresaRecente } from "../../../features/empresa_recente/empresaRecenteSlice";
import { RootState } from "../../../app/store";
import { Api } from "../../../services/api";
import { DataCompany, DataCompanyInitialData, DataHistoricalPrice, DataHistoricalPricesInitialData, DataProps, DataPropsInitialData, DataQuote, DataQuoteInitialData } from "../../../services/types";
import { MensagemErroTexto } from "../../../utils/utils";

const Container = styled.div`
  background-color: #C4C4C4;
  width: 100%;
`;

interface FormTypes {
  empresa_buscada: string;
}

const initialValues = {
  empresa_buscada: '',
};

export function AreaDados() {
  const [data, setData] = useState<DataProps>(DataPropsInitialData);
  const [favoritado, setFavoritado] = useState<boolean>(false);
  const [dataError, setDataError] = useState<any[]>([]);
  const [dataErro, setDataErro] = useState<any>('');
  const [dataCompany, setDataCompany] = useState<DataCompany>(DataCompanyInitialData);
  const [dataQuote, setDataQuote] = useState<DataQuote>(DataQuoteInitialData);
  const [dataHistoricalPricesGrafico, setHistoricalPricesGrafico] = useState<DataHistoricalPrice[]>(DataHistoricalPricesInitialData);
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);

  function handleSubmitFormFavoritaEmpresa(event: FormEvent) {
    event.preventDefault();
    if (data) {
      const validaSeFavoritoJaExiste = selector.favorito.favoritos.find((item) => {
        return data.codigo_empresa === item.codigo_empresa;
      });

      const novaEmpresaFavoritada = {
        favorito: favoritado,
        nome_empresa: data.nome_empresa,
        codigo_empresa: data.codigo_empresa,
        porcentagem: data.porcentagem
      };

      if (validaSeFavoritoJaExiste) {
        dispatch(removeFavorito(novaEmpresaFavoritada));
        setFavoritado(true);
        dispatch(setFavorito(novaEmpresaFavoritada));
      } else {
        setFavoritado(true);
        dispatch(setFavorito(novaEmpresaFavoritada));
      }
    } else {
      return;
    }
  }

  const validationSchema = Yup.object().shape({
    empresa_buscada: Yup.string().required(MensagemErroTexto('busca')),
  });

  async function handleSubmitFormBuscaEmpresa(values: FormTypes) {
    let symbol = values.empresa_buscada;

    Api({ symbol: symbol, type: 'company' })
      .then((data) => { setDataCompany(data.data); })
      .catch((error) => { setDataError(error); });
  
    Api({ symbol: symbol, type: 'quote' })
      .then((data) => { setDataQuote(data.data); })
      .catch((error) => { setDataError(error); });
  
    Api({ symbol: symbol, type: 'chart', conteudo: '/1m' })
      .then((data) => { setHistoricalPricesGrafico(data.data); })
      .catch((error) => { setDataError(error); });
    
    if (data) {
      let high_reduce = dataHistoricalPricesGrafico.reduce((valorAnterior, valorAtual) => {
        return (valorAnterior + valorAtual.high);
      }, 0)/dataHistoricalPricesGrafico.length;
      
      let low_reduce = dataHistoricalPricesGrafico.reduce((valorAnterior, valorAtual) => {
        return (valorAnterior + valorAtual.low);
      }, 0)/dataHistoricalPricesGrafico.length;

      let valor_variacao_dinheiro_resultado = high_reduce - low_reduce;

      setData({
        codigo_empresa: dataCompany.symbol,
        nome_empresa: dataCompany.companyName,
        porcentagem: dataQuote.changePercent,
        valor_acao: dataQuote.latestPrice,
        valor_variacao_dinheiro: valor_variacao_dinheiro_resultado,
        data: dataHistoricalPricesGrafico,
      });

      const validaSeEmpresaEstaNaLista = selector.empresaRecente.empresas_recentes.find((item) => {
        return data.codigo_empresa === item.codigo_empresa;
      });

      const buscaSeItemFoiFavoritado = selector.favorito.favoritos.find((item) => {
        return data.codigo_empresa === item.codigo_empresa;
      });

      const novaEmpresaRecente = {
        favorito: buscaSeItemFoiFavoritado?.favorito || false,
        nome_empresa: data.nome_empresa,
        codigo_empresa: data.codigo_empresa,
        porcentagem: data.porcentagem,
      };

      if (validaSeEmpresaEstaNaLista) {
        dispatch(removeEmpresaRecente(novaEmpresaRecente));
        setFavoritado(true);
        dispatch(setEmpresaRecente(novaEmpresaRecente));
      } else {
        setFavoritado(true);
        dispatch(setEmpresaRecente(novaEmpresaRecente));
      }
    } else {
      setDataErro(dataError);
      console.log(dataErro);
    }
  }

  return (
    <Container>
      <TituloDashboard titulo="Dashboard" />
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmitFormBuscaEmpresa}
      >
        {({errors, touched}) => (
          <Form>
            <CampoBusca
              name="empresa_buscada"
              erro={(errors.empresa_buscada && touched.empresa_buscada) ? (<p>{errors.empresa_buscada}</p>) : null}
            />
          </Form>
        )}
      </Formik>
      {(data) ? (
        <Grafico
          data={data}
          favoritado={favoritado}
          handleSubmitFavorito={handleSubmitFormFavoritaEmpresa}
        />
      ) : (
        <GraficoContainer>
          <ContainerMensagemSemDados>
            <h1>Sem dados</h1>
          </ContainerMensagemSemDados>
        </GraficoContainer>
      )}
      <EmpresasRecentes />
    </Container>
  );
}
