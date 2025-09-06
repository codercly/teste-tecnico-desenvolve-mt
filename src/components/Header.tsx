import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, Plus, Shield } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-destructive p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </Link>

          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">
              Portal de Pessoas Desaparecidas
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
