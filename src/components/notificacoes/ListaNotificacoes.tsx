"use client";

import { Check, Clock, X } from "lucide-react";

export interface Notificacao {
  id: number;
  titulo: string;
  mensagem: string;
  lida: boolean;
  criadaEm: string;
  compromisso?: {
    id: number;
    titulo: string;
    data: string;
    horario: string;
  } | null;
}

interface ListaNotificacoesProps {
  notificacoes: Notificacao[];
  carregando?: boolean;
  onMarcarComoLida: (id: number) => void;
}

function formatarData(data: string) {
  return new Date(data).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ListaNotificacoes({
  notificacoes,
  carregando = false,
  onMarcarComoLida,
}: ListaNotificacoesProps) {
  if (carregando) {
    return (
      <div className="p-6 text-center text-gray-500">
        Carregando notificações...
      </div>
    );
  }

  if (notificacoes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
        <Clock className="mb-3 text-gray-400" size={36} />

        <h3 className="font-semibold text-gray-700">Nenhuma notificação</h3>

        <p className="mt-1 text-sm text-gray-500">
          Você não possui novas notificações no momento.
        </p>
      </div>
    );
  }

  return (
    <div className="max-h-[420px] overflow-y-auto">
      {notificacoes.map((notificacao) => (
        <div
          key={notificacao.id}
          className={`border-b border-gray-100 px-4 py-4 transition ${
            notificacao.lida ? "bg-white" : "bg-blue-50/70"
          }`}
        >
          <div className="flex gap-3">
            <div
              className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                notificacao.lida
                  ? "bg-gray-100 text-gray-500"
                  : "bg-blue-100 text-blue-600"
              }`}
            >
              <Clock size={18} />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-3">
                <h4
                  className={`text-sm ${
                    notificacao.lida
                      ? "font-medium text-gray-700"
                      : "font-semibold text-gray-900"
                  }`}
                >
                  {notificacao.titulo}
                </h4>

                {!notificacao.lida && (
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                )}
              </div>

              <p className="mt-1 text-sm leading-5 text-gray-600">
                {notificacao.mensagem}
              </p>

              {notificacao.compromisso && (
                <div className="mt-2 rounded-md bg-gray-50 px-3 py-2 text-xs text-gray-500">
                  <strong className="text-gray-700">
                    {notificacao.compromisso.titulo}
                  </strong>

                  <div className="mt-1">
                    {new Date(notificacao.compromisso.data).toLocaleDateString(
                      "pt-BR",
                    )}{" "}
                    às {notificacao.compromisso.horario}
                  </div>
                </div>
              )}

              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-xs text-gray-400">
                  {formatarData(notificacao.criadaEm)}
                </span>

                {!notificacao.lida && (
                  <button
                    type="button"
                    onClick={() => onMarcarComoLida(notificacao.id)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 transition hover:text-blue-800"
                  >
                    <Check size={14} />
                    Marcar como lida
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
