import Header from "@/components/Header";
import FormCompromisso from "@/components/FormCompromisso";

export default function Cadastrar() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <section className="max-w-xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Cadastrar Compromisso
        </h1>

        <FormCompromisso modo="criar" />
      </section>
    </main>
  );
}
