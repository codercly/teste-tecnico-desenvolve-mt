import React from 'react'
import { getPeopleById } from '@/api/person'

import { PersonDetails } from '@/components/PersonDetails'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const person = await getPeopleById(Number(id))

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <PersonDetails person={person} />
      </div>
    </div>
  )
}
