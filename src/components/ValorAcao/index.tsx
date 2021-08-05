import styled from "styled-components";
import graph_up from "../../assets/images/graph-up.svg";
import graph_down from "../../assets/images/graph-down.svg";

export const ValorAcaoEmpresa = styled.span`
  font-weight: bold;
`;

export interface ValorAcaoVariacaoStyleProps {
  acaoCor?: 'success' | 'danger' | '';
}

export const ValorAcaoVariacao = styled.span<ValorAcaoVariacaoStyleProps>`
  font-weight: normal;
  color: ${(props) =>
    (props.acaoCor === 'success' && '#79C300') ||
    (props.acaoCor === 'danger' && '#D64B45')
  };
`;

const ImgGraficoSeta = styled.img`
  padding-left: 5px;
  text-align: end;
`;

export function ImagemGraficoSeta(props: ValorAcaoPorcentagemProps) {
  let valor = Math.sign(props.porcentagem);
  const verificaSeValorForPositivo = valor === 1;
  const verificaSeValorForNegativo = valor === -1;

  return (
    <ImgGraficoSeta
      src={((verificaSeValorForPositivo) && graph_up) ||
        ((verificaSeValorForNegativo) && graph_down) || ""}
      alt={((verificaSeValorForPositivo) && "graph_up") ||
        ((verificaSeValorForNegativo) && "graph_down") || ""}
    />
  );
}

export interface ValorAcaoPorcentagemProps {
  porcentagem: number;
}

export function ValorAcaoPorcentagem(props: ValorAcaoPorcentagemProps) {
  let valor = Math.sign(props.porcentagem);
  const verificaSeValorForPositivo = valor === 1;
  const verificaSeValorForNegativo = valor === -1;

  return (
    <ValorAcaoVariacao
      acaoCor={
        ((verificaSeValorForPositivo) && 'success') ||
        ((verificaSeValorForNegativo) && 'danger') ||
        ''}
    >
      {((verificaSeValorForPositivo) && `+${props.porcentagem}%`) ||
      ((verificaSeValorForNegativo) && `${props.porcentagem}%`)}
    </ValorAcaoVariacao>
  );
}

export function ValorAcaoPorcentagemBox(props: ValorAcaoPorcentagemProps) {
  let valor = Math.sign(props.porcentagem);
  const verificaSeValorForPositivo = valor === 1;
  const verificaSeValorForNegativo = valor === -1;

  return (
    <ValorAcaoVariacao
      acaoCor={
        ((verificaSeValorForPositivo) && 'success') ||
        ((verificaSeValorForNegativo) && 'danger') ||
        ''}
    >
      (<ValorAcaoPorcentagem porcentagem={props.porcentagem} />)
    </ValorAcaoVariacao>
  );
}

interface ValorAcaoVariacaoDinheiroProps {
  valorVariacaoDinheiro: number;
}

export function ValorAcaoVaricacaoDinheiro(props: ValorAcaoVariacaoDinheiroProps) {
  let valor = Math.sign(props.valorVariacaoDinheiro);
  const verificaSeValorForPositivo = valor === 1;
  const verificaSeValorForNegativo = valor === -1;

  return (
    <ValorAcaoVariacao
      acaoCor={
        ((verificaSeValorForPositivo) && 'success') ||
        ((verificaSeValorForNegativo) && 'danger') ||
        ''}
    >
      ${((verificaSeValorForPositivo) && `+${props.valorVariacaoDinheiro}`) ||
      ((verificaSeValorForNegativo) && `${props.valorVariacaoDinheiro}`)}
    </ValorAcaoVariacao>
  );
}
