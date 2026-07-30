export function situacaoCompromisso(
  data: string,
  horario: string,
  status: string,
) {
  if (status === "CONCLUIDO") {
    return {
      texto: "Concluído",
      classe: "bg-green-100 text-green-700",
    };
  }

  const hoje = new Date().toISOString().split("T")[0];

  const dataCompromisso = data.substring(0, 10);

  if (dataCompromisso === hoje) {
    return {
      texto: "Hoje",
      classe: "bg-yellow-100 text-yellow-700",
    };
  }

  const agora = new Date();
  const dataHora = new Date(`${dataCompromisso}T${horario}`);

  if (dataHora < agora) {
    return {
      texto: "Atrasado",
      classe: "bg-red-100 text-red-700",
    };
  }

  return {
    texto: "Agendado",
    classe: "bg-blue-100 text-blue-700",
  };
}
