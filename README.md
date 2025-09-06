This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). The default homepage has been replaced with a Tailwind CSS Hero section mirroring the shadcn/21st.dev component. In environments where running `npx shadcn@latest add` is restricted, the Hero is implemented locally.

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


## Home Page Structure

The home page now includes:
- Hero (shader-based, animated), with rounded buttons and glass details.
- Features section (#learn-more) with glass cards and subtle motion.
- Highlights section with three concise value props.
- Call-to-Action band (#get-started) with primary/secondary rounded buttons.
- Footer with columns and social icons.

Notes:
- Dark/Light theme supported via a glassy toggle (with a liquid/gooey effect) in the Hero header. Preference is persisted in localStorage.
- Smooth scrolling is enabled for in-page anchors (Get Started / Learn More).
