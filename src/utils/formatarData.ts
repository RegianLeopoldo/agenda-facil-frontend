export function formatarData(data: string) {
  if (!data) return "";

  return new Date(`${data.substring(0, 10)}T12:00:00`).toLocaleDateString(
    "pt-BR",
  );
}
