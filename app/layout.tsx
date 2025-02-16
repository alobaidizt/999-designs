import './globals.css'
import ClientLayout from '@/components/client-layout'

export const metadata = {
  title: 'Festival Lights',
  description: 'A celebration of festivals',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}