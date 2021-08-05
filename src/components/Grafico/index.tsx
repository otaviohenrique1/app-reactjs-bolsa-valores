import styled from "styled-components";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { EmpresaDados } from "../Empresa";
import { ImagemGraficoSeta, ValorAcaoEmpresa, ValorAcaoPorcentagemBox, ValorAcaoVaricacaoDinheiro } from "../ValorAcao";
import { BotaoFavorito } from "../Botao";
import { FormEvent, useState, useEffect } from "react";
import { DataProps } from "../../services/types";
import { FormataValorComVirgula } from "../../utils/utils";

export const GraficoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 25px 20px;

  position: absolute;
  width: 748px;
  height: 380px;
  left: 116px;
  top: 156px;

  background: #FFFFFF;
  box-shadow: 0px 4px 12px rgba(222, 222, 231, 0.4);
  border-radius: 8px;
`;

const AreaDadosBox = styled.div`
  position: static;
  width: 708px;
  height: 46px;
  left: 20px;
  top: 25px;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 10px 0px;
`;

const AreaDadosEmpresa = styled.div``;

const BotaoFavoritoBox = styled.form`
  position: absolute;
  left: 2.67%;
  right: 94.12%;
  top: 10%;
  bottom: 83.68%;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: row;
`;

const EmpresaDadosBox = styled.div`
  position: absolute;
  left: 7.09%;
  right: 83.42%;
  top: 7.89%;
  bottom: 81.32%;
  font-family: Graphik;
  font-style: normal;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.005em;
  color: #14171A;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 70%;
`;

const AreaDadosAcoes = styled.div`
  position: absolute;
  width: 110px;
  height: 45px;
  left: 623px;
  top: 25px;
  text-align: end;
`;

const AreaGraficoBox = styled.div`
  position: static;
  width: 748px;
  height: 380px;
  left: 20px;
  top: 81px;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 10px 0px;
`;

interface DataGraficoProps {
  date: string;
  close: number;
}

interface DataEmpresaProps {
  nome_empresa: string;
  codigo_empresa: string;
  porcentagem: number;
  valor_acao: number;
  valor_variacao_dinheiro: number
}

const dataEmpresaDadosIniciais = {
  nome_empresa: '',
  codigo_empresa: '',
  porcentagem: 0,
  valor_acao: 0,
  valor_variacao_dinheiro: 0
}

interface GraficoProps {
  data: DataProps;
  favoritado: boolean;
  handleSubmitFavorito: (event: FormEvent) => void;
}

export function Grafico(props: GraficoProps) {
  const [dataGrafico, setDataGrafico] = useState<DataGraficoProps[]>([]);
  const [dataEmpresa, setDataEmpresa] = useState<DataEmpresaProps>(dataEmpresaDadosIniciais);

  useEffect(() => {
    setDataEmpresa({
      codigo_empresa: props.data.codigo_empresa,
      nome_empresa: props.data.nome_empresa,
      porcentagem: props.data.porcentagem,
      valor_acao: props.data.valor_acao,
      valor_variacao_dinheiro: props.data.valor_variacao_dinheiro
    });
    setDataGrafico(props.data.data);
  }, [props.data.codigo_empresa, props.data.data, props.data.nome_empresa, props.data.porcentagem, props.data.valor_acao, props.data.valor_variacao_dinheiro]);

  return (
    <GraficoContainer>
      <AreaDadosBox>
        <AreaDados
          handleSubmitFavorito={props.handleSubmitFavorito}
          favoritado={props.favoritado}
          data={dataEmpresa}
        />
      </AreaDadosBox>
      <AreaGraficoBox>
        <AreaGrafico data={dataGrafico} />
      </AreaGraficoBox>
    </GraficoContainer>
  );
}

interface AreaDadosProps {
  favoritado?: boolean;
  handleSubmitFavorito?: (event: FormEvent) => void;
  data: DataEmpresaProps;
}

function AreaDados(props: AreaDadosProps) {
  return(
    <>
      <AreaDadosEmpresa>
        <BotaoFavoritoBox
          onSubmit={props.handleSubmitFavorito}
        >
          <BotaoFavorito
            favoritado={(props.favoritado) ? true : false}
          />
        </BotaoFavoritoBox>
        <EmpresaDadosBox>
          <EmpresaDados
            codigo_empresa={props.data.codigo_empresa}
            nome_empresa={props.data.nome_empresa}
          />
        </EmpresaDadosBox>
      </AreaDadosEmpresa>
      <AreaDadosAcoes>
        <ValorAcaoEmpresa>
          <ImagemGraficoSeta porcentagem={props.data.porcentagem || 0} />
          {' '}
          {`$${FormataValorComVirgula(props.data.valor_acao)}`}
        </ValorAcaoEmpresa>
        <div>
          <ValorAcaoVaricacaoDinheiro valorVariacaoDinheiro={props.data.valor_variacao_dinheiro} />
          {' '}
          <ValorAcaoPorcentagemBox porcentagem={props.data.porcentagem}/>
        </div>
      </AreaDadosAcoes>
    </>
  );
}

interface AreaGraficoProps {
  data: DataGraficoProps[];
}

function AreaGrafico(props: AreaGraficoProps) {
  return(
    <LineChart width={700} height={300} data={props.data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
      <Line type="monotone" dataKey="close" stroke="#0047BB" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip
        itemStyle={styleTooltip}
        labelStyle={styleTooltip}
        contentStyle={styleTooltip}
        wrapperStyle={styleTooltip}
      />
    </LineChart>
  );
}

const styleTooltip: React.CSSProperties = {
  color: 'white',
  background: '#0047BB',
};


















