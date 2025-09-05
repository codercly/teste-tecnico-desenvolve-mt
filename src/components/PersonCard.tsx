import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, User } from "lucide-react"
import { IPessoaDesaparecida } from "@/types/Person"

export function PersonCard({ person }: { person: IPessoaDesaparecida }) {
    const statusColor = person.ultimaOcorrencia.dataLocalizacao ? "secondary" : "destructive"
    const statusText = person.ultimaOcorrencia.dataLocalizacao ? "LOCALIZADO" : "DESAPARECIDO"

    console.log('person', person);

    return (
        <Link href={`/person/${person.id}`}>
            <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-primary/20 bg-card">
                <CardContent className="p-0">
                    <div className="relative">
                        {person.urlFoto ? (
                            <img
                                src={person.urlFoto || '../../public/placeholder-hbej6.png'}
                                alt={`Foto de ${person.nome}`}
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                        ) : (
                            <User className="w-full h-48 object-cover rounded-t-lg text-muted-foreground bg-gray-300" />
                        )}

                        <Badge variant={statusColor} className="absolute top-3 right-3 font-bold text-xs px-4 py-2 shadow-lg">
                            {statusText}
                        </Badge>
                    </div>

                    <div className="p-4 space-y-3">
                        <div>
                            <h3 className="font-bold text-lg text-card-foreground">{person.nome}</h3>
                            <p className="text-muted-foreground font-semibold">{person.idade} anos</p>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span className="font-medium"> local do desaparecimento: {person.ultimaOcorrencia?.localDesaparecimentoConcat || "Desconhecido"}</span>
                            </div>
                            {/* 
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span className="font-medium">
                                    Último avistamento: {new Date(person.ultimaOcorrencia?.localDesaparecimentoConcat || "Desconhecido").toLocaleDateString("pt-BR")}
                                </span>
                            </div> */}

                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                {person.ultimaOcorrencia.dataLocalizacao ? (
                                    <span>
                                        Encontrado em{" "}
                                        {new Date(person.ultimaOcorrencia.dataLocalizacao).toLocaleDateString("pt-BR")}
                                    </span>
                                ) : (
                                    <span>
                                        Desaparecido em{" "}
                                        {new Date(person.ultimaOcorrencia.dtDesaparecimento).toLocaleDateString("pt-BR")}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* <p className="text-sm text-muted-foreground line-clamp-2 font-medium">{person.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO.informacao || "Desconhecido"}</p> */}
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
