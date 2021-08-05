import styled from "styled-components";
import { Sidebar } from "./Sidebar";
import { AreaUsuario } from "./AreaUsuario";
import { AreaDados } from "./AreaDados";

const Container = styled.div`
  height: 801px;
  display: grid;
  grid-template-columns: 0.5fr 4.5fr 2fr;
  background-color: #C4C4C4;
`;

export function Dashboard() {
  return (
    <Container>
      <Sidebar />
      <AreaDados />
      <AreaUsuario />
    </Container>
  );
}
