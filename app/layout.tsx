import React from "react";

export const metadata = {
  title: 'Pokedex',
  description: 'Aestetic Pokedex',
}

import localFont from 'next/font/local';
const myFont = localFont({
  src: '/fonts/Changa-Regular.ttf',
  display: 'swap',
});

export default function RootLayout({

  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={myFont.className}>
      <body>{children}</body>
    </html>
  )
}
