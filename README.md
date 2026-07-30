# 📅 Agenda Fácil - Frontend

Frontend da aplicação **Agenda Fácil**, desenvolvido com **Next.js 16**, **React**, **TypeScript** e **Tailwind CSS**.

A aplicação permite cadastrar, editar, concluir, reabrir, visualizar e excluir compromissos de forma simples e intuitiva.

---

## 📷 Demonstração

> Em breve serão adicionadas imagens da aplicação.

---

## 🚀 Tecnologias

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- React Hook Form
- SweetAlert2
- Lucide React

---

## ✨ Funcionalidades

- ✅ Cadastro de compromissos
- ✅ Listagem de compromissos
- ✅ Visualização de detalhes
- ✅ Edição de compromissos
- ✅ Exclusão de compromissos
- ✅ Marcar compromisso como concluído
- ✅ Reabrir compromisso
- ✅ Dashboard com indicadores
- ✅ Status automático (Pendente, Concluído, Atrasado e Hoje)
- ✅ Interface moderna e responsiva

---

## 📁 Estrutura do Projeto

```
src
│
├── app
│   ├── cadastrar
│   ├── compromisso
│   ├── editar
│   └── page.tsx
│
├── components
│   ├── CardCompromisso.tsx
│   ├── Dashboard.tsx
│   ├── FormCompromisso.tsx
│   └── Header.tsx
│
└── utils
    ├── formatarData.ts
    ├── situacaoCompromisso.ts
    ├── statusCompromisso.ts
    └── statusVisual.ts
```

---

## ⚙️ Instalação

Clone o projeto

```bash
git clone https://github.com/RegianLeopoldo/agenda-facil-frontend.git
```

Entre na pasta

```bash
cd agenda-facil-frontend
```

Instale as dependências

```bash
npm install
```

Crie um arquivo:

```
.env.local
```

Com o conteúdo:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

Execute o projeto

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:3000
```

---

## 🔗 Backend

Este projeto utiliza uma API desenvolvida em Node.js.

Repositório:

https://github.com/RegianLeopoldo/agenda-facil-backend

---

## 📌 Funcionalidades da Interface

- Dashboard com estatísticas
- Cards responsivos
- Atualização automática da lista
- Feedback visual com SweetAlert2
- Navegação utilizando App Router do Next.js
- Componentização seguindo boas práticas

---

## 📄 Licença

Este projeto foi desenvolvido para fins de estudo e portfólio.

---

## 👨‍💻 Desenvolvedor

**Regian Leopoldo**

GitHub

https://github.com/RegianLeopoldo

LinkedIn

https://www.linkedin.com/in/regian-vieira-463777304/