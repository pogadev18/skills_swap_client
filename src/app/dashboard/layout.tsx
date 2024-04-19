import { Navbar } from '@/components/ui/navbar'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className="dashboard-layout flex min-h-screen">
      <aside className="w-[300px] px-4 py-10 bg-slate-200 flex flex-col justify-between">
        <p className="font-bold mb-10">LOGO</p>
        <Navbar />
      </aside>
      <section className="main-content flex-1 px-8 py-10">{children}</section>
    </main>
  )
}
