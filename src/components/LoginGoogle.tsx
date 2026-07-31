"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Usuario {
  id: number;
  nome: string;
  email: string;
  imagem?: string | null;
}

export default function LoginGoogle() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("usuario");

    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  async function handleLogin(credentialResponse: any) {
    if (loading) return;

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.erro || "Falha na autenticação");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      setUsuario(data.usuario);

      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    setUsuario(null);

    window.location.reload();
  }

  if (usuario) {
    return (
      <div className="flex items-center justify-between bg-white rounded-xl shadow p-4">
        <div className="flex items-center gap-3">
          {usuario.imagem && (
            <img
              src={usuario.imagem}
              alt={usuario.nome}
              className="w-10 h-10 rounded-full"
            />
          )}

          <div>
            <p className="font-semibold">{usuario.nome}</p>
            <p className="text-sm text-gray-500">{usuario.email}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Sair
        </button>
      </div>
    );
  }

  return (
    <GoogleLogin
      onSuccess={handleLogin}
      onError={() => console.log("Erro ao fazer login")}
    />
  );
}
