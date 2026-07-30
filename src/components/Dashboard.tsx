"use client";

import {
  CalendarDays,
  CalendarCheck,
  CheckCircle2,
  Clock3,
} from "lucide-react";

interface Props {
  total: number;
  hoje: number;
  concluidos: number;
  proximo: string;
}

export default function Dashboard({ total, hoje, concluidos, proximo }: Props) {
  return (
    <section className="max-w-6xl mx-auto p-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-lg transition">
        <div className="flex items-center justify-between">
          <p className="text-gray-500">Total</p>
          <CalendarDays className="text-blue-600" size={22} />
        </div>

        <h2 className="mt-3 text-3xl font-bold text-blue-600">{total}</h2>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-lg transition">
        <div className="flex items-center justify-between">
          <p className="text-gray-500">Hoje</p>
          <Clock3 className="text-green-600" size={22} />
        </div>

        <h2 className="mt-3 text-3xl font-bold text-green-600">{hoje}</h2>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-lg transition">
        <div className="flex items-center justify-between">
          <p className="text-gray-500">Concluídos</p>
          <CheckCircle2 className="text-emerald-600" size={22} />
        </div>

        <h2 className="mt-3 text-3xl font-bold text-emerald-600">
          {concluidos}
        </h2>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-lg transition">
        <div className="flex items-center justify-between">
          <p className="text-gray-500">Próximo</p>
          <CalendarCheck className="text-purple-600" size={22} />
        </div>

        <p
          className="
            mt-3
            font-semibold
            text-purple-600
            line-clamp-2
            break-words
          "
        >
          {proximo || "Nenhum compromisso"}
        </p>
      </div>
    </section>
  );
}
