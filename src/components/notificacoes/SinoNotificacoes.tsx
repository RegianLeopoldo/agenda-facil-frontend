"use client";

import { Bell, CheckCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useNotificacoes } from "@/hooks/useNotificacoes";
import ItemNotificacao from "./ItemNotificacao";

export default function SinoNotificacoes() {
  const [aberto, setAberto] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    notificacoes,
    naoLidas,
    carregando,
    erro,
    marcarComoLida,
    marcarTodasComoLidas,
  } = useNotificacoes();

  useEffect(() => {
    function fecharAoClicarFora(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setAberto(false);
      }
    }

    document.addEventListener("mousedown", fecharAoClicarFora);

    return () => {
      document.removeEventListener("mousedown", fecharAoClicarFora);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setAberto((estado) => !estado)}
        aria-label={
          naoLidas > 0 ? `${naoLidas} notificações não lidas` : "Notificações"
        }
        aria-expanded={aberto}
        className="relative rounded-lg p-2 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white/70"
      >
        <Bell size={24} />

        {naoLidas > 0 && (
          <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
            {naoLidas > 99 ? "99+" : naoLidas}
          </span>
        )}
      </button>

      {aberto && (
        <div className="absolute right-0 top-12 z-50 w-[360px] overflow-hidden rounded-xl border border-gray-200 bg-white text-gray-900 shadow-xl">
          <div className="flex items-center justify-between border-b p-4">
            <div>
              <h2 className="font-semibold">Notificações</h2>

              {naoLidas > 0 && (
                <p className="mt-0.5 text-xs text-gray-500">
                  {naoLidas} não lida
                  {naoLidas !== 1 ? "s" : ""}
                </p>
              )}
            </div>

            {naoLidas > 0 && (
              <button
                type="button"
                onClick={marcarTodasComoLidas}
                className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800"
              >
                <CheckCheck size={15} />
                Ler todas
              </button>
            )}
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {carregando ? (
              <div className="p-6 text-center text-sm text-gray-500">
                Carregando notificações...
              </div>
            ) : erro ? (
              <div className="p-6 text-center text-sm text-red-500">{erro}</div>
            ) : notificacoes.length === 0 ? (
              <div className="p-8 text-center">
                <Bell size={28} className="mx-auto text-gray-300" />

                <p className="mt-2 text-sm text-gray-500">
                  Nenhuma notificação.
                </p>
              </div>
            ) : (
              notificacoes.map((notificacao) => (
                <ItemNotificacao
                  key={notificacao.id}
                  notificacao={notificacao}
                  onMarcarComoLida={marcarComoLida}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
