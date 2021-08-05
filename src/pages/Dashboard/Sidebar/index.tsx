import styled from 'styled-components';
import Home from "../../../assets/images/icon-home.svg";
import { HTMLAttributes } from 'react';
import { RiExchangeFill } from "react-icons/ri";

const Aside = styled.nav`
  background-color: #F5F8FA;
  width: 100%;
`;

const LogoEstilizado = styled(RiExchangeFill)`
  position: absolute;
  width: 50px;
  height: 50px;
  left: 25px;
  top: 20px;
`;

const BotaoHomeEstilizado = styled.button`
  position: absolute;
  left: 0;
  top: 112px;
  width: 96px;
  height: 48px;
  border-left: 4px solid #F06400;
  border-right: 0;
  border-top: 0;
  border-bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: transparent;

  img {
    width: 32px;
    height: 32px;
  }
`;

function BotaoHome(props: HTMLAttributes<HTMLButtonElement>) {
  return (
    <BotaoHomeEstilizado type="button">
      <img src={Home} alt="Home" />
    </BotaoHomeEstilizado>
  );
}

export function Sidebar() {
  return (
    <Aside>
      <LogoEstilizado color={"#0047BB"} />
      <BotaoHome />
    </Aside>
  );
}
