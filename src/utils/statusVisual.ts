export function statusVisual(status: string) {
  switch (status) {
    case "CONCLUIDO":
      return {
        texto: "Concluído",
        classe: "bg-green-100 text-green-700",
      };

    default:
      return {
        texto: "Pendente",
        classe: "bg-yellow-100 text-yellow-700",
      };
  }
}
