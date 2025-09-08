import { getPersons } from '@/api/persons'
import { Header } from '@/components/Header'
import { PersonCard } from '@/components/PersonCard'
import { SearchBar } from '@/components/SearchBar'
import { PaginatedPersons } from '@/components/PaginatedPersons'
import { Filter } from '@/types/filters'
import { IPessoaDesaparecida } from '@/types/person'
import { Suspense } from 'react'
import { Loader } from 'lucide-react'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Filter>
}) {
  const filters = await searchParams
  const data = getPersons(filters)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
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
