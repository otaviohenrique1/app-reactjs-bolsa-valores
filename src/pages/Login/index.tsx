import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import * as Yup from "yup";
import { Botao, BotaoContainer } from '../../components/Botao';
import { Campo } from '../../components/Campo';
import { FormularioContainer } from '../../components/Formulario';
import { ErroMensagem } from '../../components/Mensagem';
import { Titulo } from '../../components/Titulo';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../features/login/loginSlice';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { MensagemErroTexto } from '../../utils/utils';

interface FormTypes {
  email: string;
  senha: string;
}

const initialValues = {
  email: '',
  senha: '',
};

export function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const loginDados = useSelector((state: RootState) => state);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(MensagemErroTexto('email')),
    senha: Yup.string().min(8).max(32).required(MensagemErroTexto('senha')),
  });

  async function handleSubmitForm(values: FormTypes) {
    const email = loginDados.usuario.email;
    const senha = loginDados.usuario.senha;
    
    const validaEmail = email === values.email;
    const validaSenha = senha === values.senha;
    const validaLogin = validaEmail || validaSenha;
    
    if (!validaLogin) {
      alert('Email ou senha estao invalidos');
      return;
    } else {
      dispatch(setLogin({
        id: `${loginDados.usuario.id}`,
        nome: loginDados.usuario.nome,
      }));
      history.push('/dashboard');
    }
  }

  return (
    <FormularioContainer>
      <Titulo titulo={"Login"} />
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
      >
        {({errors, touched}) => (
          <Form>
            <Campo
              htmlFor="email"
              labelCampo="Email"
              type="email"
              name="email"
              id="email"
              placeholder="Digite o email"
              erro={(errors.email && touched.email) ? (
                <ErroMensagem>{errors.email}</ErroMensagem>
              ) : null}
            />
            <Campo
              htmlFor="senha"
              labelCampo="Senha"
              type="password"
              name="senha"
              id="senha"
              placeholder="Digite a senha"
              erro={(errors.senha && touched.senha) ? (
                <ErroMensagem>{errors.senha}</ErroMensagem>
              ) : null}
            />
            <BotaoContainer>
              <Botao primary type="submit">Entrar</Botao>
              <Botao danger type="reset">Limpar</Botao>
              <Link to={'/novo_usuario'}>
                <Botao secondary type="button">Novo Usuario</Botao>
              </Link>
            </BotaoContainer>
          </Form>
        )}
      </Formik>
    </FormularioContainer>
  );
}
