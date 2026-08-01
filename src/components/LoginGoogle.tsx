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
      <div
        className="
        inline-flex
        items-center
        gap-3
        bg-white
        border
        border-gray-200
        rounded-xl
        shadow-sm
        px-3
        py-2
      "
      >
        {usuario.imagem && (
          <img
            src={usuario.imagem}
            alt={usuario.nome}
            className="w-8 h-8 rounded-full"
          />
        )}

        <div className="leading-tight">
          <p className="font-semibold text-sm text-gray-800">{usuario.nome}</p>

          <p className="text-xs text-gray-500">{usuario.email}</p>
        </div>

        <button
          onClick={logout}
          className="
          ml-2
          px-3
          py-1.5
          rounded-lg
          text-xs
          font-medium
          text-gray-600
          bg-gray-100
          hover:bg-red-50
          hover:text-red-600
          transition
        "
        >
          Sair
        </button>
      </div>
    );
  }

  return (
    <GoogleLogin
      onSuccess={handleLogin}
      onError={() => {
        alert("Não foi possível fazer login com o Google.");
      }}
    />
  );
}
