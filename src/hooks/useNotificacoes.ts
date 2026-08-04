"use client";

import { useCallback, useEffect, useState } from "react";
import type { Notificacao } from "@/types/notificacao";

interface UseNotificacoes {
  notificacoes: Notificacao[];
  naoLidas: number;
  carregando: boolean;
  erro: string | null;
  recarregar: () => Promise<void>;
  marcarComoLida: (id: number) => Promise<void>;
  marcarTodasComoLidas: () => Promise<void>;
}

interface RespostaNaoLidas {
  quantidade: number;
}

export function useNotificacoes(): UseNotificacoes {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [naoLidas, setNaoLidas] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const obterToken = useCallback(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem("token");
  }, []);

  /*const recarregar = useCallback(async () => {
    const token = obterToken();

    if (!API_URL) {
      setErro("URL da API não configurada.");
      setCarregando(false);
      return;
    }

    if (!token) {
      setErro("Usuário não autenticado.");
      setCarregando(false);
      return;
    }

    try {
      setCarregando(true);
      setErro(null);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [respostaNotificacoes, respostaNaoLidas] = await Promise.all([
        fetch(`${API_URL}/notificacoes`, {
          headers,
        }),

        fetch(`${API_URL}/notificacoes/nao-lidas`, {
          headers,
        }),
      ]);

      if (!respostaNotificacoes.ok) {
        throw new Error(
          `Erro ao buscar notificações: ${respostaNotificacoes.status}`,
        );
      }

      if (!respostaNaoLidas.ok) {
        throw new Error(`Erro ao buscar contador: ${respostaNaoLidas.status}`);
      }

      const dados: Notificacao[] = await respostaNotificacoes.json();

      const dadosNaoLidas: RespostaNaoLidas = await respostaNaoLidas.json();

      setNotificacoes(dados);
      setNaoLidas(dadosNaoLidas.quantidade);
    } catch (error) {
      console.error("Erro ao carregar notificações:", error);

      setErro("Não foi possível carregar as notificações.");
    } finally {
      setCarregando(false);
    }
  }, [API_URL, obterToken]);*/

  const recarregar = useCallback(async () => {
    const token = obterToken();

    if (!API_URL) {
      setErro("URL da API não configurada.");
      setCarregando(false);
      return;
    }

    if (!token) {
      setErro("Usuário não autenticado.");
      setCarregando(false);
      return;
    }

    try {
      // Só mostra "Carregando..." no primeiro carregamento.
      // As atualizações automáticas acontecem silenciosamente.
      if (notificacoes.length === 0) {
        setCarregando(true);
      }

      setErro(null);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [respostaNotificacoes, respostaNaoLidas] = await Promise.all([
        fetch(`${API_URL}/notificacoes`, {
          headers,
        }),

        fetch(`${API_URL}/notificacoes/nao-lidas`, {
          headers,
        }),
      ]);

      if (!respostaNotificacoes.ok) {
        throw new Error(
          `Erro ao buscar notificações: ${respostaNotificacoes.status}`,
        );
      }

      if (!respostaNaoLidas.ok) {
        throw new Error(`Erro ao buscar contador: ${respostaNaoLidas.status}`);
      }

      const dados: Notificacao[] = await respostaNotificacoes.json();

      const dadosNaoLidas: RespostaNaoLidas = await respostaNaoLidas.json();

      setNotificacoes(dados);
      setNaoLidas(dadosNaoLidas.quantidade);
    } catch (error) {
      console.error("Erro ao carregar notificações:", error);

      setErro("Não foi possível carregar as notificações.");
    } finally {
      setCarregando(false);
    }
  }, [API_URL, obterToken, notificacoes.length]);

  const marcarComoLida = useCallback(
    async (id: number) => {
      const token = obterToken();

      if (!token || !API_URL) {
        return;
      }

      try {
        const resposta = await fetch(`${API_URL}/notificacoes/${id}/lida`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!resposta.ok) {
          throw new Error(`Erro ao marcar notificação: ${resposta.status}`);
        }

        setNotificacoes((atuais) =>
          atuais.map((notificacao) =>
            notificacao.id === id
              ? {
                  ...notificacao,
                  lida: true,
                }
              : notificacao,
          ),
        );

        setNaoLidas((quantidade) => Math.max(0, quantidade - 1));
      } catch (error) {
        console.error("Erro ao marcar notificação como lida:", error);
      }
    },
    [API_URL, obterToken],
  );

  const marcarTodasComoLidas = useCallback(async () => {
    const token = obterToken();

    if (!token || !API_URL) {
      return;
    }

    try {
      const resposta = await fetch(`${API_URL}/notificacoes/lidas/todas`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!resposta.ok) {
        throw new Error(`Erro ao marcar notificações: ${resposta.status}`);
      }

      setNotificacoes((atuais) =>
        atuais.map((notificacao) => ({
          ...notificacao,
          lida: true,
        })),
      );

      setNaoLidas(0);
    } catch (error) {
      console.error("Erro ao marcar todas as notificações como lidas:", error);
    }
  }, [API_URL, obterToken]);

  useEffect(() => {
    recarregar();

    const intervalo = window.setInterval(() => {
      recarregar();
    }, 30_000);

    return () => {
      window.clearInterval(intervalo);
    };
  }, [recarregar]);

  return {
    notificacoes,
    naoLidas,
    carregando,
    erro,
    recarregar,
    marcarComoLida,
    marcarTodasComoLidas,
  };
}
