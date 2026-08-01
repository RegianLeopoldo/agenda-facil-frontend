"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "@/components/Header";
import CardCompromisso from "@/components/CardCompromisso";
import Dashboard from "@/components/Dashboard";
import { formatarData } from "@/utils/formatarData";
import LoginGoogle from "@/components/LoginGoogle";

interface Compromisso {
  id: number;
  titulo: string;
  descricao: string | null;
  data: string;
  horario: string;
  local: string | null;
  status: string;
}
export default function Home() {
  const [compromissos, setCompromissos] = useState<Compromisso[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  async function buscarCompromissos() {
    try {
      setErro(false);
      const token = localStorage.getItem("token");

      if (!token) {
        setCompromissos([]);
        setCarregando(false);
        return;
      }

      const resposta = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/compromissos`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!resposta.ok) {
        throw new Error("Erro ao buscar compromissos");
      }

      const dados = await resposta.json();

      setCompromissos(Array.isArray(dados) ? dados : []);
    } catch (error) {
      console.error(error);
      setCompromissos([]);
      setErro(true);
    } finally {
      setCarregando(false);
    }
  }

  async function atualizarLista() {
    await buscarCompromissos();
  }

  useEffect(() => {
    buscarCompromissos();
  }, [pathname]);

  const hoje = new Date();

  const hojeFormatado = `${hoje.getFullYear()}-${String(
    hoje.getMonth() + 1,
  ).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;

  const proximoCompromisso = compromissos
    .filter((item) => item.status === "PENDENTE")
    .sort((a, b) => {
      const dataA = new Date(`${a.data.substring(0, 10)}T${a.horario}`);
      const dataB = new Date(`${b.data.substring(0, 10)}T${b.horario}`);

      return dataA.getTime() - dataB.getTime();
    })[0];

  const totalHoje = compromissos.filter(
    (item) =>
      item.data.substring(0, 10) === hojeFormatado &&
      item.status !== "CONCLUIDO",
  ).length;

  const totalConcluidos = compromissos.filter(
    (item) => item.status === "CONCLUIDO",
  ).length;

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />
      <section className="max-w-6xl mx-auto px-6 pt-4">
        <div className="flex justify-end">
          <LoginGoogle />
        </div>
      </section>
      {!carregando && (
        <Dashboard
          total={compromissos.length}
          hoje={totalHoje}
          concluidos={totalConcluidos}
          proximo={
            proximoCompromisso
              ? `${proximoCompromisso.titulo} - ${formatarData(
                  proximoCompromisso.data,
                )} às ${proximoCompromisso.horario}`
              : "Nenhum"
          }
        />
      )}

      <section className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Meus Compromissos
            </h2>

            <p className="text-gray-500">Gerencie sua agenda facilmente</p>
          </div>
        </div>

        {carregando ? (
          <div className="text-center p-10">Carregando compromissos...</div>
        ) : erro ? (
          <div
            className="
      bg-white
      rounded-xl
      shadow
      p-10
      text-center
    "
          >
            <h3 className="text-xl font-bold text-red-600">
              Não foi possível carregar seus compromissos
            </h3>

            <p className="text-gray-500 mt-2">
              Verifique sua conexão e tente novamente.
            </p>

            <button
              onClick={buscarCompromissos}
              className="
        mt-5
        bg-blue-600
        hover:bg-blue-700
        text-white
        px-5
        py-2
        rounded-lg
        transition
      "
            >
              Tentar novamente
            </button>
          </div>
        ) : compromissos.length === 0 ? (
          <div
            className="
    bg-white
    rounded-xl
    shadow
    p-10
    text-center
  "
          >
            <h3 className="text-xl font-bold text-gray-800">
              Nenhum compromisso cadastrado
            </h3>

            <p className="text-gray-500 mt-2">
              Cadastre seu primeiro compromisso para começar a organizar sua
              agenda.
            </p>

            <button
              onClick={() => router.push("/cadastrar")}
              className="
      mt-5
      bg-blue-600
      hover:bg-blue-700
      text-white
      px-5
      py-2.5
      rounded-lg
      transition
    "
            >
              Cadastrar compromisso
            </button>
          </div>
        ) : (
          <div
            className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
          >
            {compromissos.map((item) => (
              <CardCompromisso
                key={item.id}
                id={item.id}
                titulo={item.titulo}
                descricao={item.descricao}
                data={item.data}
                horario={item.horario}
                local={item.local}
                status={item.status}
                atualizarLista={atualizarLista}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
