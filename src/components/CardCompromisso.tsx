"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  Pencil,
  Trash2,
  CheckCircle,
} from "lucide-react";
import Swal from "sweetalert2";

import { formatarData } from "@/utils/formatarData";
import { statusVisual } from "@/utils/statusVisual";
import { situacaoCompromisso } from "@/utils/situacaoCompromisso";

interface Props {
  id: number;
  titulo: string;
  descricao: string | null;
  data: string;
  horario: string;
  local: string | null;
  status: string;
  atualizarLista: () => void;
}

export default function CardCompromisso({
  id,
  titulo,
  descricao,
  data,
  horario,
  local,
  status,
  atualizarLista,
}: Props) {
  const router = useRouter();

  const [statusAtualCard, setStatusAtualCard] = useState(status);
  const [concluindo, setConcluindo] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  const statusAtual = statusVisual(statusAtualCard);

  const situacao = situacaoCompromisso(data, horario, statusAtualCard);

  async function atualizarStatus(novoStatus: string) {
    try {
      setConcluindo(true);

      const token = localStorage.getItem("token");

      const resposta = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/compromissos/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: novoStatus,
          }),
        },
      );

      if (!resposta.ok) {
        throw new Error();
      }

      setStatusAtualCard(novoStatus);

      await Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Status atualizado.",
        timer: 1200,
        showConfirmButton: false,
      });

      router.refresh();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: "Não foi possível atualizar.",
      });
    } finally {
      setConcluindo(false);
    }
  }

  async function excluirCompromisso() {
    const confirmacao = await Swal.fire({
      title: "Excluir compromisso?",
      text: "Essa ação não poderá ser desfeita.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!confirmacao.isConfirmed) return;

    try {
      setExcluindo(true);

      const token = localStorage.getItem("token");

      const resposta = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/compromissos/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!resposta.ok) {
        const erro = await resposta.json();
        console.log(erro);
        throw new Error(erro.erro || "Erro ao excluir compromisso");
      }

      await Swal.fire({
        icon: "success",
        title: "Excluído!",
        timer: 1200,
        showConfirmButton: false,
      });

      atualizarLista();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: "Não foi possível excluir.",
      });
    } finally {
      setExcluindo(false);
    }
  }

  async function reabrirCompromisso() {
    try {
      setConcluindo(true);

      const token = localStorage.getItem("token");

      const resposta = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/compromissos/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "PENDENTE",
          }),
        },
      );

      if (!resposta.ok) {
        const erro = await resposta.json();
        console.log(erro);
        throw new Error(erro.erro || "Erro ao reabrir compromisso");
      }

      setStatusAtualCard("PENDENTE");

      await Swal.fire({
        icon: "success",
        title: "Compromisso reaberto!",
        timer: 1200,
        showConfirmButton: false,
      });

      atualizarLista();
      router.refresh();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: "Não foi possível reabrir o compromisso.",
      });
    } finally {
      setConcluindo(false);
    }
  }

  return (
    <article
      className="
        bg-white
        rounded-2xl
        border
        shadow-md
        p-6
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
      "
    >
      <h2
        onClick={() => router.push(`/compromisso/${id}`)}
        className="
          text-xl
          font-bold
          text-gray-800
          cursor-pointer
          hover:text-blue-600
        "
      >
        {titulo}
      </h2>

      <div className="flex gap-2 mt-3 flex-wrap">
        <span
          className={`
            px-3
            py-1
            rounded-full
            text-sm
            font-semibold
            ${statusAtual.classe}
          `}
        >
          {statusAtual.texto}
        </span>

        <span
          className={`
            px-3
            py-1
            rounded-full
            text-sm
            font-semibold
            ${situacao.classe}
          `}
        >
          {situacao.texto}
        </span>
      </div>

      {descricao && (
        <p className="mt-4 text-gray-600 line-clamp-3">{descricao}</p>
      )}

      <div className="mt-5 space-y-3 text-gray-600">
        <div className="flex items-center gap-3">
          <Calendar size={18} />
          <span>{formatarData(data)}</span>
        </div>

        <div className="flex items-center gap-3">
          <Clock size={18} />
          <span>{horario}</span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin size={18} />
          <span>{local || "Não informado"}</span>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 flex-wrap">
        {statusAtualCard === "PENDENTE" ? (
          <>
            <button
              onClick={() => atualizarStatus("CONCLUIDO")}
              disabled={concluindo}
              className="
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-lg
          bg-green-600
          text-white
          hover:bg-green-700
          disabled:opacity-50
          transition
        "
            >
              <CheckCircle size={18} />
              {concluindo ? "Concluindo..." : "Concluir"}
            </button>

            <button
              onClick={() => router.push(`/editar/${id}`)}
              className="
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-lg
          bg-yellow-500
          text-white
          hover:bg-yellow-600
          transition
        "
            >
              <Pencil size={18} />
              Editar
            </button>
          </>
        ) : (
          <button
            onClick={reabrirCompromisso}
            disabled={concluindo}
            className="
        flex
        items-center
        gap-2
        px-4
        py-2
        rounded-lg
        bg-blue-600
        text-white
        hover:bg-blue-700
        disabled:opacity-50
        transition
      "
          >
            <Clock size={18} />
            Reabrir
          </button>
        )}

        <button
          onClick={excluirCompromisso}
          disabled={excluindo}
          className="
      flex
      items-center
      gap-2
      px-4
      py-2
      rounded-lg
      bg-red-600
      text-white
      hover:bg-red-700
      disabled:opacity-50
      transition
    "
        >
          <Trash2 size={18} />
          {excluindo ? "Excluindo..." : "Excluir"}
        </button>
      </div>
    </article>
  );
}
