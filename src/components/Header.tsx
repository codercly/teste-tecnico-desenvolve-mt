import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Link href="/" className="text-3xl font-bold text-foreground">
              Pessoas Desaparecidas
            </Link>
            <p className="text-muted-foreground mt-1">
              Ajude a encontrar pessoas desaparecidas no estado de Mato Grosso
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex flex-row gap-2">
              <Phone className="w-4 h-4 mr-2" />
                Emergência: 190
            </Button>
            <Button className='hover:bg-red-400 flex flex-row gap-2 bg-destructive' >
              <Phone className="w-4 h-4 mr-2"  />
              Disque Denúncia: 181
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
