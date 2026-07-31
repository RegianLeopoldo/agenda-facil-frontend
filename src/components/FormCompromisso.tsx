"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

interface CompromissoForm {
  titulo: string;
  descricao: string;
  data: string;
  horario: string;
  local: string;
}

interface Props {
  id?: number;
  modo: "criar" | "editar";
  dadosIniciais?: CompromissoForm;
}

export default function FormCompromisso({ id, modo, dadosIniciais }: Props) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CompromissoForm>({
    defaultValues: dadosIniciais,
    mode: "onBlur",
  });

  useEffect(() => {
    if (dadosIniciais) {
      reset(dadosIniciais);
    }
  }, [dadosIniciais, reset]);

  async function salvar(dados: CompromissoForm) {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        await Swal.fire({
          icon: "warning",
          title: "Faça login",
          text: "Você precisa entrar com sua conta Google para salvar compromissos.",
        });

        return;
      }

      const resposta = await fetch(
        modo === "editar"
          ? `${process.env.NEXT_PUBLIC_API_URL}/compromissos/${id}`
          : `${process.env.NEXT_PUBLIC_API_URL}/compromissos`,
        {
          method: modo === "editar" ? "PUT" : "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(dados),
        },
      );

      if (!resposta.ok) {
        const erro = await resposta.json();

        console.error("Erro da API:", erro);

        throw new Error(erro.erro || "Erro ao salvar compromisso");
      }

      await Swal.fire({
        title: modo === "editar" ? "Atualizado!" : "Cadastrado!",

        text:
          modo === "editar"
            ? "Compromisso atualizado com sucesso."
            : "Compromisso cadastrado com sucesso.",

        icon: "success",

        timer: 1500,

        showConfirmButton: false,
      });

      router.push("/");
    } catch (error) {
      console.error(error);

      await Swal.fire({
        title: "Erro!",
        text: "Não foi possível salvar o compromisso.",
        icon: "error",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(salvar)}
      className="
  bg-white
  rounded-xl
  shadow-md
  p-6
  space-y-5
  text-gray-800
"
    >
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Título</label>

        <input
          {...register("titulo", {
            required: "Título é obrigatório",
          })}
          placeholder="Digite o título do compromisso"
          className="
    w-full
    border
    border-gray-300
    rounded-lg
    p-3
    text-gray-800
    placeholder:text-gray-400
    outline-none
    focus:ring-2
    focus:ring-blue-500
  "
        />

        {errors.titulo && (
          <p className="text-red-600 text-sm">{errors.titulo.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Descrição
        </label>

        <textarea
          {...register("descricao", {
            required: "Descrição é obrigatória",
          })}
          placeholder="Digite a descrição do compromisso"
          rows={4}
          className="
    w-full
    border
    border-gray-300
    rounded-lg
    p-3
    text-gray-800
    placeholder:text-gray-400
    outline-none
    focus:ring-2
    focus:ring-blue-500
  "
        />

        {errors.descricao && (
          <p className="text-red-600 text-sm">{errors.descricao.message}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Data</label>

          <input
            type="date"
            {...register("data", {
              required: "Data é obrigatória",
            })}
            className="
        w-full
        border
        border-gray-300
        rounded-lg
        p-3
        text-gray-800
        outline-none
        focus:ring-2
        focus:ring-blue-500
      "
          />

          {errors.data && (
            <p className="text-red-600 text-sm mt-1">{errors.data.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Horário
          </label>

          <input
            type="time"
            {...register("horario", {
              required: "Horário é obrigatório",
            })}
            className="
        w-full
        border
        border-gray-300
        rounded-lg
        p-3
        text-gray-800
        outline-none
        focus:ring-2
        focus:ring-blue-500
      "
          />

          {errors.horario && (
            <p className="text-red-600 text-sm mt-1">
              {errors.horario.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Local</label>

        <input
          {...register("local", {
            required: "Local é obrigatório",
          })}
          placeholder="Digite o local do compromisso"
          className="
      w-full
      border
      border-gray-300
      rounded-lg
      p-3
      text-gray-800
      placeholder:text-gray-400
      outline-none
      focus:ring-2
      focus:ring-blue-500
    "
        />

        {errors.local && (
          <p className="text-red-600 text-sm mt-1">{errors.local.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full
          bg-blue-600
          text-white
          py-3
          rounded-lg
          hover:bg-blue-700
          transition
          disabled:opacity-50
        "
      >
        {isSubmitting
          ? "Salvando..."
          : modo === "editar"
            ? "Salvar Alterações"
            : "Salvar Compromisso"}
      </button>
    </form>
  );
}
