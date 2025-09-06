import { getPeople } from '@/api/person'
import { Header } from '@/components/Header'
import { PersonCard } from '@/components/PersonCard'
import { SearchBar } from '@/components/SearchBar'
import { PaginatedPersons } from '@/components/PaginatedPersons'
import { IFilter } from '@/types/Filters'
import { IPessoaDesaparecida } from '@/types/Person'
import { Suspense } from 'react'
import { Loader } from 'lucide-react'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<IFilter>
}) {
  const filters = await searchParams
  const data = getPeople(filters)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          {/* <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">Pessoas Desaparecidas e Localizadas</h1> */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Ajude a reunir famílias. Procure por pessoas desaparecidas ou
            registre informações sobre pessoas localizadas.
          </p>
        </div>

        <div className="flex justify-center items-center">
          <SearchBar filters={filters} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Suspense fallback={<Loader />}>
            {(await data).content.map((person: IPessoaDesaparecida) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </Suspense>
        </div>
        <div className="mt-8 flex justify-center">
          <PaginatedPersons searchParams={filters} pagination={data} />
        </div>
      </main>
    </div>
  )
}
