import { useState, ReactNode } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { removeLogin } from '../../features/login/loginSlice';

export const DropdownBotao = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px;
  position: static;
  width: 354px;
  height: 40px;
  left: 20px;
  top: 32px;
  box-sizing: border-box;
  border-radius: 120px;
  margin: 32px 20px 0;
  border-top: 1px solid rgba(0, 71, 187, 0.2);
  border-left: 1px solid rgba(0, 71, 187, 0.2);
  border-right: 1px solid rgba(0, 71, 187, 1.0);
  border-bottom: 1px solid rgba(0, 71, 187, 1.0);

  &:active {
    border-top: 1px solid rgba(0, 71, 187, 1.0);
    border-left: 1px solid rgba(0, 71, 187, 1.0);
    border-right: 1px solid rgba(0, 71, 187, 0.2);
    border-bottom: 1px solid rgba(0, 71, 187, 0.2);
  }
`;

export const UsuarioDropdownAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 100px;
`;

export const UsuarioDropdownNome = styled.p`
  width: 274px;
  height: 19px;
  font-family: Graphik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  letter-spacing: -0.005em;
  color: #0047BB;
  margin-right: 10px;
`;

export const DropdownBotaoEstilizado = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
`;

interface DropdownSetaProps {
  isOpen?: boolean;
}

export function DropdownSeta(props: DropdownSetaProps) {
  return (
    <DropdownBotaoEstilizado>
      {(props.isOpen) ? (
        <TiArrowSortedUp size={16} color="#F06400" />
      ) : (
        <TiArrowSortedDown size={16} color="#F06400" />
      )}
    </DropdownBotaoEstilizado>
  );
}

export const DropdownArea = styled.div``;

export const DropdownConteudo = styled.div`
  background-color: transparent;
  width: 100%;
  height: 100%;
  width: 394px;
  position: absolute;
  top: 72px;
`;

export const DropdownConteudoLista = styled.div`
  padding: 5px 15px 10px;
  margin: 0px 40px;
  background: darkgray;
  border-end-end-radius: 5px;
  border-end-start-radius: 5px;
`;

export const DropdownConteudoBotao = styled.button`
  width: 100%;
  padding: 5px 10px;
  text-align: left;
  background: darkgray;
  border: 0;
  color: white;
  font-family: Graphik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  &:hover, &:focus {
    color: black;
    background: lightgray;
  }
`;

interface DropdownProps {
  avatarSrc: string | "";
  avatarAlt: string | "";
  usuarioNome: string;
  children?: ReactNode;
}

export function Dropdown(props: DropdownProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  const history = useHistory();

  const dispatch = useDispatch();
  
  function handleClick() {
    dispatch(removeLogin({
      id: '',
      nome: '',
    }));

    history.push('/');
  }
  
  return (
    <DropdownArea>
      <DropdownBotao onClick={() => setIsActive(!isActive)}>
        <UsuarioDropdownAvatar src={props.avatarSrc} alt={props.avatarAlt} />
        <UsuarioDropdownNome>{props.usuarioNome}</UsuarioDropdownNome>
        <DropdownSeta isOpen={isActive} />
      </DropdownBotao>
      {(isActive) && (
        <DropdownConteudo>
          <DropdownConteudoLista>
            <DropdownConteudoBotao onClick={() => handleClick()}>
              Sair
            </DropdownConteudoBotao>
          </DropdownConteudoLista>
        </DropdownConteudo>
      )}
    </DropdownArea>
  );
}
