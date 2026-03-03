# Bajhang (Chainpur) Campus Website

A modern, responsive campus website built with **Next.js + TypeScript + Tailwind**.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Where to edit content

- `src/content/site.ts`: campus name, affiliation, contact, navigation
- `src/content/staff.ts`: staff list
- `src/content/notices.ts`: notices/announcements
- `src/content/events.ts`: events

## Pages

- Home: `src/app/page.tsx`
- About: `src/app/about/page.tsx`
- Staff: `src/app/staff/page.tsx`
- Admissions: `src/app/admissions/page.tsx`
- Events: `src/app/events/page.tsx`
- Notices: `src/app/notices/page.tsx`
- Gallery: `src/app/gallery/page.tsx`
- Contact: `src/app/contact/page.tsx`

## Production build (low-resource Windows safe)

```bash
npm run build
npm start
```

## Configure your real domain for sitemap

Set `NEXT_PUBLIC_SITE_URL` (example: `https://your-campus.edu.np`) before building.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
