"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Calendar, Clock, MapPin, Pencil, ArrowLeft } from "lucide-react";
import { formatarData } from "@/utils/formatarData";
import { statusVisual } from "@/utils/statusVisual";

interface Compromisso {
  id: number;
  titulo: string;
  descricao: string | null;
  data: string;
  horario: string;
  local: string | null;
  status: string;
}

export default function DetalhesCompromisso() {
  const params = useParams();
  const router = useRouter();

  const id = params.id;

  const [compromisso, setCompromisso] = useState<Compromisso | null>(null);

  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscar() {
      try {
        const resposta = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/compromissos/${id}`,
        );

        const dados = await resposta.json();

        setCompromisso(dados);
      } catch (error) {
        console.error(error);
      } finally {
        setCarregando(false);
      }
    }

    if (id) {
      buscar();
    }
  }, [id]);

  if (carregando) {
    return <main className="p-8">Carregando...</main>;
  }

  if (!compromisso) {
    return <main className="p-8">Compromisso não encontrado.</main>;
  }

  const status = statusVisual(compromisso.status);

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <section
        className="
          max-w-3xl
          mx-auto
          p-6
        "
      >
        <button
          onClick={() => router.back()}
          className="
            flex
            items-center
            gap-2
            mb-6
            text-gray-700
          "
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

        <article
          className="
            bg-white
            rounded-2xl
            shadow-lg
            p-8
          "
        >
          <div
            className="
              flex
              justify-between
              items-start
            "
          >
            <h1
              className="
                text-3xl
                font-bold
                text-gray-800
              "
            >
              {compromisso.titulo}
            </h1>

            <span
              className={`
                px-4
                py-2
                rounded-full
                font-semibold
                ${status.classe}
              `}
            >
              {status.texto}
            </span>
          </div>

          <p
            className="
              text-gray-600
              mt-5
              text-lg
            "
          >
            {compromisso.descricao}
          </p>

          <div
            className="
              mt-8
              space-y-4
              text-gray-700
            "
          >
            <div className="flex gap-3 items-center">
              <Calendar />

              <span>{formatarData(compromisso.data)}</span>
            </div>

            <div className="flex gap-3 items-center">
              <Clock />

              <span>{compromisso.horario}</span>
            </div>

            <div className="flex gap-3 items-center">
              <MapPin />

              <span>{compromisso.local}</span>
            </div>
          </div>

          <button
            onClick={() => router.push(`/editar/${compromisso.id}`)}
            className="
              mt-8
              flex
              items-center
              justify-center
              gap-2
              w-full
              bg-yellow-500
              text-white
              py-3
              rounded-xl
              hover:bg-yellow-600
            "
          >
            <Pencil size={18} />
            Editar compromisso
          </button>
        </article>
      </section>
    </main>
  );
}
