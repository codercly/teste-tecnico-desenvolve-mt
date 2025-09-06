import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Calendar,
  MapPin,
  Clock,
  Phone,
  AlertTriangle,
  CheckCircle,
  User,
  ArrowLeft,
  Pen,
} from 'lucide-react'
import { IPessoaDesaparecida } from '@/types/Person'
import { Button } from './ui/button'
import ReportForm from './ReportForm'

export function PersonDetails({
  person,
}: {
  person: IPessoaDesaparecida | null
}) {
  const statusColor = person?.ultimaOcorrencia?.dataLocalizacao
    ? 'secondary'
    : 'destructive'
  const statusText = person?.ultimaOcorrencia?.dataLocalizacao
    ? 'LOCALIZADO'
    : 'DESAPARECIDO'
  const StatusIcon = person?.ultimaOcorrencia?.dataLocalizacao
    ? AlertTriangle
    : CheckCircle

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-foreground">
          Detalhes da Pessoa
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <div className="relative">
                {person?.urlFoto ? (
                  <img
                    src={person?.urlFoto || '/placeholder.svg'}
                    alt={person?.nome}
                    className="w-full h-80 object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="h-80 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center rounded-t-lg">
                    <User className="w-16 h-16 text-muted-foreground/50" />
                  </div>
                )}
                <Badge
                  variant={statusColor}
                  className="absolute top-4 right-4 text-lg px-4 py-2 font-semibold flex items-center gap-2"
                >
                  <StatusIcon className="w-5 h-5" />
                  {statusText}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Informações Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Nome Completo
                  </label>
                  <p className="text-lg font-semibold">{person?.nome}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Idade
                  </label>
                  <p className="text-lg font-semibold">
                    {person?.idade ? `${person?.idade} anos` : 'não informado'}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Sexo
                  </label>
                  <p className="text-lg font-semibold">{person?.sexo}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Características
                </label>
                <p className="text-base mt-1">
                  {
                    person?.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.informacao
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Informações de Localização
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Local de desaparecimento
                  </label>
                  <p className="text-base font-medium">
                    {person?.ultimaOcorrencia?.localDesaparecimentoConcat}
                  </p>
                </div>
                <div>
                  {person?.ultimaOcorrencia?.dataLocalizacao ? (
                    <>
                      <label className="text-sm font-medium text-muted-foreground">
                        Data localização
                      </label>
                      <p className="text-base font-medium">
                        {new Date(
                          person?.ultimaOcorrencia?.dataLocalizacao
                        ).toLocaleDateString('pt-BR')}
                      </p>
                    </>
                  ) : (
                    <>
                      <label className="text-sm font-medium text-muted-foreground">
                        Data desaparecimento
                      </label>
                      <p className="text-base font-medium">
                        {new Date(
                          person?.ultimaOcorrencia?.dtDesaparecimento
                        ).toLocaleDateString('pt-BR')}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Descrição
                </label>
                <p className="text-base mt-1">
                  {
                    person?.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO?.vestimentasDesaparecido
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mt-4">
            <ReportForm ocoId={person?.ultimaOcorrencia?.ocoId} />
          </div>
        </div>
      </div>
    </div>
  )
}
