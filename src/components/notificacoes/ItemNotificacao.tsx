"use client";

import { useRouter } from "next/navigation";
import type { Notificacao } from "@/types/notificacao";

interface ItemNotificacaoProps {
  notificacao: Notificacao;
  onMarcarComoLida: (id: number) => Promise<void> | void;
  onAbrir: () => void;
}

function formatarDataNotificacao(data: string) {
  const agora = new Date();
  const criadaEm = new Date(data);

  const diferencaMs = agora.getTime() - criadaEm.getTime();
  const diferencaMinutos = Math.floor(diferencaMs / (1000 * 60));

  if (diferencaMinutos < 1) {
    return "Agora mesmo";
  }

  if (diferencaMinutos < 60) {
    return `Há ${diferencaMinutos} minuto${diferencaMinutos !== 1 ? "s" : ""}`;
  }

  const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());

  const dataCriada = new Date(
    criadaEm.getFullYear(),
    criadaEm.getMonth(),
    criadaEm.getDate(),
  );

  const diferencaDias = Math.floor(
    (hoje.getTime() - dataCriada.getTime()) / (1000 * 60 * 60 * 24),
  );

  const horario = criadaEm.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (diferencaDias === 0) {
    return `Hoje às ${horario}`;
  }

  if (diferencaDias === 1) {
    return `Ontem às ${horario}`;
  }

  return `${criadaEm.toLocaleDateString("pt-BR")} às ${horario}`;
}

export default function ItemNotificacao({
  notificacao,
  onMarcarComoLida,
  onAbrir,
}: ItemNotificacaoProps) {
  const router = useRouter();

  async function handleClick() {
    if (!notificacao.lida) {
      await onMarcarComoLida(notificacao.id);
    }

    onAbrir();

    if (notificacao.compromissoId) {
      router.push(`/editar/${notificacao.compromissoId}`);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`
        w-full
        border-b
        border-gray-100
        p-4
        text-left
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
            {formatarDataNotificacao(notificacao.criadaEm)}
          </time>
        </div>
      </div>
    </button>
  );
}
