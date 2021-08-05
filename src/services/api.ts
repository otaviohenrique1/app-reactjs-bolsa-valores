import axios from "axios";

const api = axios.create({
  baseURL: 'https://cloud.iexapis.com/stable/stock/',
});

interface ApiProps {
  symbol: string;
  type: 'chart' | 'company' | 'quote';
  conteudo?: string;
  opcoes?: string
}

export function Api({ symbol, type, conteudo, opcoes }: ApiProps) {
  const url = `${symbol}/${type}${conteudo || ''}?token=${process.env.REACT_APP_API_KEY}${opcoes || ''}`;
  return api.get(url);
};
