# 📅 Agenda Fácil — Frontend

Frontend da aplicação **Agenda Fácil**, desenvolvido para facilitar o cadastro e gerenciamento de compromissos.

A aplicação permite autenticar usuários, cadastrar, visualizar, editar, concluir, reabrir e excluir compromissos, além de apresentar notificações e informações organizadas em um dashboard.

---

## 🚀 Tecnologias

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* React Hook Form
* SweetAlert2
* Lucide React

---

## ✨ Funcionalidades

* ✅ Autenticação com Google
* ✅ Cadastro de compromissos
* ✅ Listagem de compromissos
* ✅ Visualização de detalhes
* ✅ Edição de compromissos
* ✅ Exclusão de compromissos
* ✅ Marcar compromisso como concluído
* ✅ Reabrir compromisso
* ✅ Dashboard com indicadores
* ✅ Identificação automática da situação do compromisso
* ✅ Status: Pendente, Concluído, Atrasado e Hoje
* ✅ Sistema de notificações
* ✅ Atualização das notificações
* ✅ Interface responsiva
* ✅ Feedback visual das ações
* ✅ Integração com API REST do backend

---

## 📁 Estrutura do Projeto

```text
src
├── app
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── providers.tsx
│   │
│   ├── cadastrar
│   │   └── page.tsx
│   │
│   ├── compromisso
│   │   └── [id]
│   │       └── page.tsx
│   │
│   └── editar
│       └── [id]
│           └── page.tsx
│
├── components
│   ├── CardCompromisso.tsx
│   ├── Dashboard.tsx
│   ├── FormCompromisso.tsx
│   ├── Header.tsx
│   ├── LoginGoogle.tsx
│   │
│   └── notificacoes
│       ├── ItemNotificacao.tsx
│       ├── ListaNotificacoes.tsx
│       └── SinoNotificacoes.tsx
│
├── hooks
│   └── useNotificacoes.ts
│
├── lib
│   └── api.ts
│
├── types
│   └── notificacao.ts
│
└── utils
    ├── formatarData.ts
    ├── situacaoCompromisso.ts
    ├── statusCompromisso.ts
    └── statusVisual.ts
```

---

## 🖼️ Recursos Públicos

A pasta `public` contém os arquivos estáticos utilizados pela aplicação.

```text
public
├── agenda-facil.png
├── file.svg
├── globe.svg
├── next.svg
├── vercel.svg
└── window.svg
```

---

## ⚙️ Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/RegianLeopoldo/agenda-facil-frontend.git
```

### 2. Entrar na pasta

```bash
cd agenda-facil-frontend
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Configurar as variáveis de ambiente

Crie um arquivo:

```text
.env.local
```

Adicione:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

A variável `NEXT_PUBLIC_API_URL` define a URL da API utilizada pelo frontend.

### 5. Executar o projeto

```bash
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:3000
```

---

## 🔗 Integração com o Backend

O frontend consome uma API REST desenvolvida com **Node.js, Express, TypeScript, Prisma e PostgreSQL**.

Repositório do backend:

https://github.com/RegianLeopoldo/agenda-facil-backend

Em ambiente de desenvolvimento:

```text
http://localhost:3333
```

Em produção:

```text
https://agenda-facil-backend-xm0w.onrender.com
```

---

## 🌐 Deploy

### Frontend

Aplicação publicada na Vercel:

```text
https://agenda-facil-frontend-omega.vercel.app
```

### Backend

API publicada no Render:

```text
https://agenda-facil-backend-xm0w.onrender.com
```

---

## 🔐 Autenticação

A aplicação possui autenticação utilizando **Google OAuth**.

O usuário pode realizar o login através da interface da aplicação e, após a autenticação, acessar seus compromissos e recursos associados à sua conta.

O componente responsável pela interface de login está localizado em:

```text
src/components/LoginGoogle.tsx
```

---

## 🔔 Sistema de Notificações

O frontend possui um sistema de notificações integrado ao backend.

Principais componentes:

```text
src/components/notificacoes
├── ItemNotificacao.tsx
├── ListaNotificacoes.tsx
└── SinoNotificacoes.tsx
```

O gerenciamento das notificações é realizado pelo hook:

```text
src/hooks/useNotificacoes.ts
```

Os tipos relacionados às notificações estão definidos em:

```text
src/types/notificacao.ts
```

---

## 🧩 Componentização

A interface foi organizada em componentes reutilizáveis, separando responsabilidades entre:

* Dashboard
* Header
* Cards de compromissos
* Formulários
* Login
* Notificações

Essa organização facilita a manutenção, reutilização e evolução da aplicação.

---

## 🧭 App Router

A aplicação utiliza o **App Router do Next.js**.

As principais rotas são:

```text
/
├── /cadastrar
├── /compromisso/[id]
└── /editar/[id]
```

As rotas dinâmicas permitem visualizar e editar compromissos específicos através do seu identificador.

---

## 📊 Dashboard

O dashboard apresenta informações relacionadas aos compromissos cadastrados, permitindo uma visualização rápida da situação atual.

A implementação está localizada em:

```text
src/components/Dashboard.tsx
```

---

## 🎨 Interface

A interface utiliza **Tailwind CSS** para estilização e foi desenvolvida com foco em:

* Responsividade
* Organização visual
* Componentização
* Facilidade de uso
* Feedback visual das ações

O **SweetAlert2** é utilizado para apresentar mensagens e confirmações ao usuário.

O **Lucide React** é utilizado para os ícones da interface.

---

## 🗓️ Situação dos Compromissos

A aplicação possui funções responsáveis por determinar e representar visualmente a situação dos compromissos.

```text
src/utils
├── formatarData.ts
├── situacaoCompromisso.ts
├── statusCompromisso.ts
└── statusVisual.ts
```

Essas funções auxiliam na padronização das informações apresentadas na interface.

---

## 🔌 Comunicação com a API

A comunicação com o backend é centralizada através do arquivo:

```text
src/lib/api.ts
```

A URL da API é definida através da variável de ambiente:

```env
NEXT_PUBLIC_API_URL
```

Isso permite utilizar diferentes endereços para desenvolvimento e produção sem alterar o código da aplicação.

---

## 📚 Objetivo do Projeto

O **Agenda Fácil** é um projeto acadêmico desenvolvido no curso de **Tecnologia em Sistemas para Internet — UESPI**, com o objetivo de aplicar conceitos de desenvolvimento web full-stack, integração entre frontend e backend, autenticação, persistência de dados e organização de software.

---

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos e de portfólio.

---

## 👨‍💻 Grupo

* **Severino Regian Leopoldo da Silva Vieira**
* **Aline Oliveira Gomes**
* **Robério Madson Dias da Cunha**
* **Taliane de Souza Louzeiro Alves**


GitHub:

https://github.com/RegianLeopoldo

LinkedIn:

https://www.linkedin.com/in/regian-vieira-463777304/
