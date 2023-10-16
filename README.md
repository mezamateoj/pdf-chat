<p align="center">
<a href=https://github.com/mezamateoj/pdf-chat target="_blank">
<img src='/placeholder.jpg' width="100%" alt="Banner" />
</a>
</p>



<p align="center">
<img src="https://img.shields.io/github/languages/code-size/mezamateoj/pdf-chat" alt="GitHub code size in bytes" />
<img src="https://img.shields.io/github/last-commit/mezamateoj/pdf-chat" alt="GitHub last commit" />
<img src="https://img.shields.io/github/commit-activity/m/mezamateoj/pdf-chat" alt="GitHub commit activity month" />
<img src="https://img.shields.io/github/license/mezamateoj/pdf-chat" alt="GitHub license" />
</p>

<p></p>
<p></p>

# 📌 Overview

pdf-chat is a simple app that enables users to chat with their PDFs using langchain and openai. It relies on essential dependencies such as AWS SDK, Next.js, Pinecone, React Query, and more.

## 🔍 Table of Contents

* [📁 Project Structure](#project-structure)

* [📝 Project Summary](#project-summary)

* [💻 Stack](#stack)

* [⚙️ Setting Up](#setting-up)

* [🚀 Run Locally](#run-locally)

* [🙌 Contributors](#contributors)

* [☁️ Deploy](#deploy)

## 📁 Project Structure

```bash
├── .eslintrc.json
├── .gitignore
├── README.md
├── components.json
├── drizzle.config.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── next.svg
│   └── vercel.svg
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── chat
│   │   │   │   └── route.ts
│   │   │   ├── create-chat
│   │   │   │   └── route.ts
│   │   │   ├── delete-chat
│   │   │   │   └── route.ts
│   │   │   ├── get-messages
│   │   │   │   └── route.ts
│   │   │   ├── stripe
│   │   │   │   └── route.ts
│   │   │   └── webhook
│   │   │       └── route.ts
│   │   ├── chat
│   │   │   └── [chat_id]
│   │   │       └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── sign-in
│   │   │   └── [[...sign-in]]
│   │   │       └── page.tsx
│   │   └── sign-up
│   │       └── [[...sign-up]]
│   │           └── page.tsx
│   ├── components
│   │   ├── ChatComponent.tsx
│   │   ├── ChatSideBar.tsx
│   │   ├── FileUpload.tsx
│   │   ├── MessageList.tsx
│   │   ├── PDFViewer.tsx
│   │   ├── Provider.tsx
│   │   ├── SubButton.tsx
│   │   └── ui
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       └── progress.tsx
│   ├── lib
│   │   ├── context.ts
│   │   ├── db
│   │   │   ├── index.ts
│   │   │   └── schema.ts
│   │   ├── embeddings.ts
│   │   ├── pinecone.ts
│   │   ├── s3-server.ts
│   │   ├── s3.ts
│   │   ├── stripe.ts
│   │   ├── subscription.ts
│   │   └── utils.ts
│   └── middleware.ts
├── tailwind.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## 📝 Project Summary

- [src](src): Root directory of the TypeScript project.
- [src/app](src/app): Contains the core application logic and components.
- [src/app/api](src/app/api): Handles API-related functionalities.
- [src/app/chat](src/app/chat): Manages chat functionality.
- [src/app/sign-in](src/app/sign-in): Handles user sign-in functionality.
- [src/app/sign-up](src/app/sign-up): Manages user sign-up functionality.
- [src/components](src/components): Contains reusable UI components.
- [src/components/ui](src/components/ui): Houses UI-specific components.
- [src/lib](src/lib): Contains project-specific libraries.
- [src/lib/db](src/lib/db): Manages database-related functionalities.

## 💻 Stack

- [aws-sdk](https://aws.amazon.com/sdk-for-javascript/): JavaScript library for interacting with AWS services, including S3 for storage.
- [clerk/nextjs](https://clerk.dev/): Authentication and user management for Next.js applications.
- [neondatabase/serverless](https://github.com/neondatabase/serverless): Serverless framework for deploying and managing serverless functions.
- [pinecone-database/pinecone](https://www.pinecone.io/): Vector similarity search engine for efficient data retrieval.
- [radix-ui/react-progress](https://modulz.app/): UI component for displaying progress indicators.
- [tanstack/react-query](https://react-query.tanstack.com/): Data fetching and caching library for React applications.
- [uploadthing/react](https://www.uploadthingy.com/): React component for handling file uploads.
- [vercel/analytics](https://vercel.com/docs/analytics): Analytics package for tracking usage and performance metrics.

## ⚙️ Setting Up

#### Your Environment Variable

- Step 1

- Step 2

## 🚀 Run Locally
1.Clone the pdf-chat repository:
```sh
git clone https://github.com/mezamateoj/pdf-chat
```
2.Install the dependencies with one of the package managers listed below:
```bash
pnpm install
bun install
npm install
yarn install
```
3.Start the development mode:
```bash
pnpm dev
bun dev
npm run dev
yarn dev
```

## 🙌 Contributors
<a href="https://github.com/mezamateoj/pdf-chat/graphs/contributors">
<img src="https://contrib.rocks/image?repo=mezamateoj/pdf-chat" />
</a>

## ☁️ Deploy

`[Chat PDF](https://ai-pdfchat.vercel.app/)`


