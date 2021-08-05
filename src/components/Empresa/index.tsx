import styled from "styled-components";

export const CardEmpresa = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 73px;
  background: #FFFFFF;
  box-shadow: 0px 8px 20px -2px rgba(43, 37, 63, 0.1);
  border-radius: 8px;
`;

export const CodigoEmpresa = styled.span`
  font-weight: bold;
`;

export const NomeEmpresa = styled.span`
  font-weight: normal;
`;

export interface EmpresaDadosProps {
  codigo_empresa: string;
  nome_empresa: string;
}

export function EmpresaDados(props: EmpresaDadosProps) {
  return (
    <>
      <CodigoEmpresa>{props.codigo_empresa}</CodigoEmpresa><br />
      <NomeEmpresa>{props.nome_empresa}</NomeEmpresa>
    </>
  );
}

export interface LogoEmpresaProps {
  src: string;
  alt: string;
}

export function LogoEmpresa(props: LogoEmpresaProps) {
  return (
    <img
      src={props.src}
      alt={props.alt}
      width={'36px'}
      height={'36px'}
    />
  );
}
