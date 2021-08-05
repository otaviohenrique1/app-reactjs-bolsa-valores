export function MensagemErroTexto(texto: string): string {
  return `O campo ${texto} é obrigatorio`;
}

export function FormataValorComVirgula(valor: number): string {
  // return (valor).toString().replace('.', ',');
  return (valor).toFixed(2).replace('.', ',');
}
