import { Nav } from '@components/Nav'
import { Provider } from '@components/Provider'
import '@styles/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Promptops',
  description: 'Discover & Share AI Prompts Ideas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
        <div className='main'>
          <div className='gradient'/>
        </div>
        <main className='app'>
          <Nav/>
        {children}
        </main>
        </Provider>
        </body>
    </html>
  )
}
