

export const metadata = {
  title: 'Ecommerce/admin',
  description: 'Admin pannel by sanity',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
