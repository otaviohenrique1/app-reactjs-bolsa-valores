import styled from "styled-components";
import { HTMLAttributes, useState, useEffect } from "react";
import { IoMdTrash } from "react-icons/io";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export const BotaoContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
`;
interface BotaoStyleProps {
  primary?: boolean;
  danger?: boolean;
  secondary?: boolean;
}

export const Botao = styled.button<BotaoStyleProps>`
  background: ${(props) =>
    (props.primary && '#3399ff') ||
    (props.danger && '#ff1a1a') ||
    (props.secondary && '#2eb82e') ||
    ('#595959')
  };
  color: white;
  font-size: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  width: 100px;
  height: 50px;
  &:hover {
    background: ${(props) =>
      (props.primary && 'rgba(51, 153, 255, 0.6)') ||
      (props.danger && 'rgba(255, 26, 26, 0.6)') ||
      (props.secondary && 'rgba(46, 184, 46, 0.6)') ||
      ('#bfbfbf')
    };
  }
`;

const BotaoEstilizado = styled.button`
  border: transparent;
  background: transparent;
`;

export function BotaoRemover(props: HTMLAttributes<HTMLButtonElement>) {
  const [isActive, setIsActive] = useState(false);

  return (
    <BotaoEstilizado
      type="submit"
      {...props}
    >
      <IoMdTrash
        size={24}
        onClick={() => setIsActive(!isActive)}
        color={(isActive) ? '#2c343a' : '#657786'}
      />
    </BotaoEstilizado>
  );
}

const IconBotaoFavoritoBox = styled.div`
  width: 24px;
  height: 24px;
`;

interface BotaoFavoritoProps extends HTMLAttributes<HTMLButtonElement> {
  favoritado?: boolean;
}

export function BotaoFavorito(props: BotaoFavoritoProps) {
  const [isActive, setIsActive] = useState(false);
  const [foiFavoritado, setFoiFavoritado] = useState(false);

  useEffect(() => {
    if (props.favoritado) {
      setFoiFavoritado(props.favoritado);
      setIsActive(foiFavoritado);
    } else {
      setFoiFavoritado(false);
    }
  }, [foiFavoritado, props.favoritado])

  return (
    <BotaoEstilizado
      type="submit"
    >
      <IconBotaoFavoritoBox
        onClick={() => setIsActive(!isActive)}
      >
        {(isActive) ? (
          <AiFillStar
            size={24}
            color={'#0047BB'}
          />
        ) : (
          <AiOutlineStar
            size={24}
            color={'#0047BB'}
          />
        )}
      </IconBotaoFavoritoBox>
    </BotaoEstilizado>
  );
}
