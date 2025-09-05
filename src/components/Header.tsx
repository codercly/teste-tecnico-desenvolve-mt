import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Plus } from "lucide-react"

export function Header() {
    return (
        <header className="bg-card border-b border-border sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-primary">
                        Sistema de Pessoas Desaparecidas
                    </Link>

                    <nav className="hidden md:flex items-center space-x-6">
                        <Link href="/" className="text-foreground hover:text-primary transition-colors">
                            Início
                        </Link>
                        <Link href="/missing" className="text-foreground hover:text-primary transition-colors">
                            Desaparecidos
                        </Link>
                        <Link href="/found" className="text-foreground hover:text-primary transition-colors">
                            Localizados
                        </Link>
                        <Link href="/resources" className="text-foreground hover:text-primary transition-colors">
                            Orientações
                        </Link>
                    </nav>

                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                            <Search className="w-4 h-4 mr-2" />
                            Buscar
                        </Button>
                        <Button size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Registrar Ocorrência
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}
