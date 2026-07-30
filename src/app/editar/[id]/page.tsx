"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Header from "@/components/Header";
import FormCompromisso from "@/components/FormCompromisso";

interface Compromisso {
  titulo: string;
  descricao: string;
  data: string;
  horario: string;
  local: string;
}

export default function EditarCompromisso() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const [compromisso, setCompromisso] = useState<Compromisso | null>(null);

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarCompromisso() {
      try {
        const resposta = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/compromissos/${id}`,
        );

        if (!resposta.ok) {
          throw new Error("Compromisso não encontrado");
        }

        const dados = await resposta.json();

        setCompromisso({
          titulo: dados.titulo,

          descricao: dados.descricao ?? "",

          data: dados.data.substring(0, 10),

          horario: dados.horario,

          local: dados.local ?? "",
        });
      } catch (error) {
        console.error(error);

        router.push("/");
      } finally {
        setCarregando(false);
      }
    }

    if (id) {
      buscarCompromisso();
    }
  }, [id, router]);

  if (carregando) {
    return (
      <main className="min-h-screen bg-gray-100">
        <Header />

        <div className="p-8 text-center">Carregando compromisso...</div>
      </main>
    );
  }

  if (!compromisso) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <section className="max-w-xl mx-auto p-6">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="
            mb-5
            px-4
            py-2
            rounded-lg
            bg-gray-700
            text-white
            hover:bg-gray-800
            transition
          "
        >
          ← Voltar
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Editar Compromisso
        </h1>

        <FormCompromisso modo="editar" id={id} dadosIniciais={compromisso} />
      </section>
    </main>
  );
}
