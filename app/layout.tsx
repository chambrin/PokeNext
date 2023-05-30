
export const metadata = {
  title: 'Pokedex',
  description: 'Aestetic Pokedex',
}

import localFont from 'next/font/local';

export default function RootLayout({

  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
