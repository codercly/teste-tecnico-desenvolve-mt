import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Clock, User } from 'lucide-react'
import { IPessoaDesaparecida } from '@/types/Person'

export function PersonCard({ person }: { person: IPessoaDesaparecida }) {
  const statusColor = person.ultimaOcorrencia.dataLocalizacao
    ? 'secondary'
    : 'destructive'
  const statusText = person.ultimaOcorrencia.dataLocalizacao
    ? 'LOCALIZADO'
    : 'DESAPARECIDO'

  return (
    <Link href={`/person/${person.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 border-0 shadow-md bg-gradient-to-br from-background to-background/95">
        <CardContent className="p-0">
          <div className="relative overflow-hidden">
            {person.urlFoto ? (
              <div className="relative h-56 overflow-hidden">
                <img
                  src={person.urlFoto || '/placeholder.svg'}
                  alt={`Foto de ${person.nome}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            ) : (
              <div className="h-56 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                <User className="w-16 h-16 text-muted-foreground/50" />
              </div>
            )}

            <Badge
              variant={statusColor}
              className="absolute top-3 right-3 font-bold text-xs px-4 py-2 shadow-lg"
            >
              {statusText}
            </Badge>
          </div>

          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-bold text-lg text-card-foreground">
                {person.nome}
              </h3>
              <p className="text-muted-foreground font-semibold">
                {person?.idade ? `${person?.idade} anos` : 'não informado'}
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">
                  {' '}
                  local do desaparecimento:{' '}
                  {person.ultimaOcorrencia?.localDesaparecimentoConcat ||
                    'Desconhecido'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {person.ultimaOcorrencia.dataLocalizacao ? (
                  <span>
                    Encontrado em{' '}
                    {new Date(
                      person.ultimaOcorrencia.dataLocalizacao
                    ).toLocaleDateString('pt-BR')}
                  </span>
                ) : (
                  <span>
                    Desaparecido em{' '}
                    {new Date(
                      person.ultimaOcorrencia.dtDesaparecimento
                    ).toLocaleDateString('pt-BR')}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
