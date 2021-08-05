import styled from "styled-components";
import stats_graph from "../../../assets/images/stats_graph.svg";
import { Item } from "../../../components/Item";
import { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import { ContainerMensagemSemDados } from "../../../components/Mensagem";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const EmpresasRecentesContainer = styled.div`
position: absolute;
background: #f1ecec;
margin-top: 39px;
width: 789px;
height: 136px;
left: 115px;
top: 575px;
`;

const TituloContainer = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 0px;
position: absolute;
width: 198px;
height: 27px;
left: 12px;
top: 0px;

img {
  position: static;
  left: 0%;
  right: 87.88%;
  top: 0%;
  bottom: 11.11%;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 8px;
}

p {
  position: static;
  width: 166px;
  height: 27px;
  left: 32px;
  top: 0px;
  font-family: Graphik;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 150%;
  display: flex;
  align-items: center;
  color: #14171A;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 8px;
}

div {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;

  position: absolute;
  width: 36px;
  height: 12px;
  left: 710px;
  top: 7px;

  img {
    width: 6px;
    height: 12px;
  }
}
`;

const ItemEstilizado = styled.div`
  margin-right: 21px;
  &:last-child {
    margin-right: 0;
  }
`;

const CardEmpresaContainer = styled.div`
  position: absolute;
  left: 15px;
  bottom: 0px;
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 96%;
`;

const CarouselEstilizado = styled(Carousel)`
  div.rec.rec-carousel {
    height: 73px;
    margin-bottom: 17px;
  }

  button.rec.rec-arrow.rec.rec-arrow-left {
    position: absolute;
    top: -40px;
    right: 25px;
    font-size: 1em;
    width: 25px;
    min-width: 25px;
    height: 25px;
    line-height: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  button.rec.rec-arrow.rec.rec-arrow-right {
    position: absolute;
    top: -40px;
    right: -10px;
    font-size: 1em;
    width: 25px;
    min-width: 25px;
    height: 25px;
    line-height: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div.rec.rec-slider-container {
    margin: 0 10px;
  }

  div.rec.rec-pagination {
    margin-top: 0;
    display: none;
  }
`;

const ContainerMensagemSemDadosEstilizado = styled(ContainerMensagemSemDados)`
  height: 73px;
  align-items: flex-end;
`;
interface DataProps {
  favorito: boolean;
  nome_empresa: string;
  codigo_empresa: string;
  porcentagem: number;
}

export function EmpresasRecentes() {
  const [data, setData] = useState<DataProps[]>([]);
  const selector = useSelector((state: RootState) => state);

  useEffect(() => {
    setData(selector.empresaRecente.empresas_recentes);
  }, [selector.empresaRecente.empresas_recentes]);

  return (
    <EmpresasRecentesContainer>
      <TituloContainer>
        <img src={stats_graph} alt="stats_graph" />
        <p>Empresas recentes</p>
      </TituloContainer>
      <CardEmpresaContainer>
        <CarouselEstilizado
          itemsToShow={2}
          isRTL={false}
        >
          {(!data || data.length === 0) ? (
            <ContainerMensagemSemDadosEstilizado>
            <h1>Sem dados</h1>
          </ContainerMensagemSemDadosEstilizado>
          ) : (
            data.map((item, index) => (
              <ItemEstilizado
                key={index}
              >
                <Item
                  favoritado={item.favorito}
                  exibeBotaoFavorito
                  empresa_dados={{
                    nome_empresa: item.nome_empresa,
                    codigo_empresa: item.codigo_empresa
                  }}
                  valor_porcentagem={{
                    porcentagem: item.porcentagem
                  }}
                />
              </ItemEstilizado>
            ))
          )}
        </CarouselEstilizado>
      </CardEmpresaContainer>
    </EmpresasRecentesContainer>
  );
}
