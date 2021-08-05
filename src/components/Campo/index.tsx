import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";
import { Field } from 'formik';
import search from "../../assets/images/search.svg";

const ContainerCampoBusca = styled.div``;

const BotaoBusca = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  position: absolute;
  width: 40px;
  height: 40px;
  left: 460px;
  top: 100px;
  background: #0047BB;
  border-radius: 8px;
`;

const FieldBusca = styled(Field)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 8px 16px;
  position: absolute;
  width: 364px;
  height: 40px;
  left: 116px;
  top: 92px;
  background: #FFFFFF;
  border: 1px solid #E1E0E7;
  border-radius: 8px;
`;

const MensagemErroCampoBusca = styled.div`
  position: absolute;
  left: 125px;
  top: 150px;
  background: #ff5050;
  color: white;
  line-height: 5px;
  width: 28%;
  text-align: center;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  z-index: 1;
`;

interface CampoBuscaProps {
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  name?: string;
  erro?: any;
}

export function CampoBusca(props: CampoBuscaProps) {
  return (
    <>
      <ContainerCampoBusca>
        <FieldBusca
          type="text"
          placeholder="Buscar empresa"
          name={props.name}
        />
        <BotaoBusca
          type="submit"
          {...props.buttonProps}
        >
          <img src={search} alt="search" />
        </BotaoBusca>
        <MensagemErroCampoBusca>{props.erro}</MensagemErroCampoBusca>
      </ContainerCampoBusca>
    </>
  );
}

export const CampoFormulario = styled(Field)`
  width: 350px;
  line-height: 25px;
`;

export const CampoContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

export const LabelCampo = styled.label`
  margin-bottom: 10px;
`;

interface CampoProps {
  htmlFor: string;
  labelCampo: string
  erro: any;
  type: string;
  name: string;
  id: string;
  placeholder: string;
}

export function Campo(props: CampoProps) {
  return (
    <CampoContainer>
      <LabelCampo htmlFor={props.htmlFor}>{props.labelCampo}</LabelCampo>
      <CampoFormulario
        type={props.type}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
      />
      {props.erro}
    </CampoContainer>
  );
}
