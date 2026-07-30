export function verificarStatus(data: string, horario: string) {
  const agora = new Date();

  const compromisso = new Date(`${data.substring(0, 10)}T${horario}`);

  if (compromisso < agora) {
    return "CONCLUIDO";
  }

  if (compromisso.toDateString() === agora.toDateString()) {
    return "HOJE";
  }

  return "PROXIMO";
}
