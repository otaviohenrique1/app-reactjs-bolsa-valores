import styled from "styled-components";

export const ErroMensagem = styled.p`
  background-color: #ff8080;
  border-width: 2px;
  border-style: solid;
  border-color: red;
  padding: 10px;
  line-height: 20px;
  text-align: start;
  color: white;
  margin-top: 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

export const ContainerMensagemSemDados = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
