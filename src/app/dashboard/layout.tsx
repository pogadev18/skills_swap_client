import { Navbar } from '@/components/ui/navbar'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className="dashboard-layout flex min-h-screen">
      <aside className="w-[300px] px-4 py-10 bg-slate-200 flex flex-col  justify-between">
        <Navbar />
      </aside>
      <section className="main-content flex-1 px-4 py-10">{children}</section>
    </main>
  )
}
