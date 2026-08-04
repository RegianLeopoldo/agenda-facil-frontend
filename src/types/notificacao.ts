export interface Notificacao {
  id: number;
  titulo: string;
  mensagem: string;
  lida: boolean;
  criadaEm: string;
  usuarioId: number;
  compromissoId: number | null;
}
