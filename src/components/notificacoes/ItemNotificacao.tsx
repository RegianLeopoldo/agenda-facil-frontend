import type { Notificacao } from "@/types/notificacao";

interface ItemNotificacaoProps {
  notificacao: Notificacao;
  onMarcarComoLida: (id: number) => void;
}

export default function ItemNotificacao({
  notificacao,
  onMarcarComoLida,
}: ItemNotificacaoProps) {
  return (
    <button
      type="button"
      onClick={() => {
        if (!notificacao.lida) {
          onMarcarComoLida(notificacao.id);
        }
      }}
      className={`
        w-full
        text-left
        border-b
        border-gray-100
        p-4
        transition
        hover:bg-gray-50
        ${notificacao.lida ? "bg-white" : "bg-blue-50"}
      `}
    >
      <div className="flex gap-3">
        <span
          className={`
            mt-1.5
            h-2
            w-2
            shrink-0
            rounded-full
            ${notificacao.lida ? "bg-gray-300" : "bg-blue-600"}
          `}
        />

        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900">
            {notificacao.titulo}
          </p>

          <p className="mt-1 text-sm text-gray-600">{notificacao.mensagem}</p>

          <time
            dateTime={notificacao.criadaEm}
            className="mt-2 block text-xs text-gray-400"
          >
            {new Date(notificacao.criadaEm).toLocaleString("pt-BR")}
          </time>
        </div>
      </div>
    </button>
  );
}
