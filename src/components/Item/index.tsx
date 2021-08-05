import { FormEvent } from "react";
import styled from "styled-components";
import { BotaoRemover } from "../Botao";
import { BotaoFavorito } from "../Botao";
import { CardEmpresa, EmpresaDados, EmpresaDadosProps, LogoEmpresa } from "../Empresa";
import { ImagemGraficoSeta, ValorAcaoPorcentagem, ValorAcaoPorcentagemProps } from "../ValorAcao";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorito } from "../../features/favorito/favoritoSlice";
import { RootState } from "../../app/store";
import empresa from "../../assets/images/empresa.svg";

interface ItemProps {
  empresa_dados: EmpresaDadosProps;
  valor_porcentagem: ValorAcaoPorcentagemProps;
  favoritado?: boolean;
  exibeBotaoFavorito?: boolean;
}

interface ItemBoxProps {
  valor_flex?: number;
}

const ItemBox = styled.div<ItemBoxProps>`
  flex: ${(props) => props.valor_flex};
`;

const CardEmpresaEstilizado = styled(CardEmpresa)`
  padding: 0 16px;
`;

const BotaoFavoritoEstilizado = styled(BotaoFavorito)`
  flex: 1;
`;

export function Item(props: ItemProps) {
  return (
    <CardEmpresaEstilizado>
      {(props.exibeBotaoFavorito) && (
        <BotaoFavoritoEstilizado
          favoritado={props.favoritado}
        />
      )}
      <ItemBox valor_flex={1.5}>
        <LogoEmpresa
          src={empresa}
          alt={'empresa'}
        />
      </ItemBox>
      <ItemBox valor_flex={5}>
        <EmpresaDadosEstilisado>
          <EmpresaDados
            codigo_empresa={props.empresa_dados.codigo_empresa}
            nome_empresa={props.empresa_dados.nome_empresa}
          />
        </EmpresaDadosEstilisado>
      </ItemBox>
      <ItemBox valor_flex={3}>
        <ValorAcaoPorcentagem porcentagem={props.valor_porcentagem.porcentagem} />
        <ImagemGraficoSeta porcentagem={props.valor_porcentagem.porcentagem}  />
      </ItemBox>
    </CardEmpresaEstilizado>
  );
}

const EmpresaDadosEstilisado = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemFavoritadoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`;

const ItemEstilizado = styled(Item)`
  padding-right: 8px;
`;

interface ItemFavoritadoProps extends ItemProps {
  codigoEmpresaFavorito: string;
}

export function ItemFavoritado(props: ItemFavoritadoProps) {
  const dispatch = useDispatch();

  const selector = useSelector((state: RootState) => state);

  async function handleSubmitFavorito(event: FormEvent) {
    event.preventDefault();
    const data = selector.favorito.favoritos.find((item) => {
      return props.codigoEmpresaFavorito === item.codigo_empresa;
    });
    
    if (data) {
      dispatch(removeFavorito(data));
    } else {
      return;
    }
  }

  return (
    <ItemFavoritadoBox>
      <ItemEstilizado
        favoritado={props.favoritado}
        empresa_dados={{
          nome_empresa: props.empresa_dados.codigo_empresa,
          codigo_empresa: props.empresa_dados.nome_empresa
        }}
        valor_porcentagem={{
          porcentagem: props.valor_porcentagem.porcentagem
        }}
      />
      <form
        onSubmit={handleSubmitFavorito}
      >
        <BotaoRemover />
      </form>
    </ItemFavoritadoBox>
  );
}