import styled from "styled-components";
import avatar from "../../../assets/images/avatar.svg";
import { ItemFavoritado } from "../../../components/Item";
import { Dropdown } from "../../../components/Dropdown";
import { AiFillStar } from "react-icons/ai";
import { useEffect, useState } from "react";
import { RootState } from '../../../app/store';
import { useSelector } from 'react-redux';
import { ContainerMensagemSemDados } from "../../../components/Mensagem";

const AreaUsuarioBox = styled.div`
  background-color: #FFFFFF;
  width: 100%;
`;

const AreaListaFavoritos = styled.div`
  margin-top: 32px;
`;

const EmpresasFavoritasTitulo = styled.div`
  font-family: Graphik;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 150%;
  color: #14171A;
  margin-top: 0px;
  margin-bottom: 32px;
  margin-left: 32px;
  margin-right: 32px;
  display: flex;

  span {
    padding-left: 11.64px;
  }
`;

interface DataProps {
  favorito: boolean;
  nome_empresa: string;
  codigo_empresa: string;
  porcentagem: number;
}

export function AreaUsuario() {
  const [data, setData] = useState<DataProps[]>([]);
  const selector = useSelector((state: RootState) => state);
  
  useEffect(() => {
    setData(selector.favorito.favoritos);
  }, [selector.favorito.favoritos]);
  
  return (
    <AreaUsuarioBox>
      <Dropdown
        avatarSrc={avatar}
        avatarAlt="Avatar usuario"
        usuarioNome={selector.login.nome || 'João da Silva Almeida Magalhães'}
      />
      <AreaListaFavoritos>
        <EmpresasFavoritasTitulo>
          <AiFillStar
            size={24}
            color={'#0047BB'}
          />
          <span>Empresas favoritas</span>
        </EmpresasFavoritasTitulo>
        {
          (data.length === 0) ? (
            <ContainerMensagemSemDados>
              <h1>Sem dados</h1>
            </ContainerMensagemSemDados>
          ) : (
            data.map((item, index) => {
              return (
                <ItemFavoritado
                  key={index}
                  exibeBotaoFavorito={false}
                  favoritado={item.favorito}
                  empresa_dados={{
                    nome_empresa: item.nome_empresa,
                    codigo_empresa: item.codigo_empresa
                  }}
                  valor_porcentagem={{
                    porcentagem: item.porcentagem
                  }}
                  codigoEmpresaFavorito={item.codigo_empresa}
                />
              );
            })
          )
        }
      </AreaListaFavoritos>
    </AreaUsuarioBox>
  );
}
