import Link from "next/link";
import { CalendarDays, Plus } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-5">
        <div className="flex items-center gap-3">
          <CalendarDays size={32} />
          <div>
            <h1 className="text-2xl font-bold">Agenda Fácil</h1>
            <p className="text-sm opacity-90">Organize seus compromissos</p>
          </div>
        </div>

        <Link
          href="/cadastrar"
          className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          <Plus size={18} />
          Novo Compromisso
        </Link>
      </div>
    </header>
  );
}
