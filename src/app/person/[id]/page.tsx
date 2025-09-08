import React from 'react'
import { getPersonsById } from '@/api/persons'

import { PersonDetails } from '@/components/PersonDetails'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const person = await getPersonsById(Number(id))

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <PersonDetails person={person} />
      </div>
    </div>
  )
}
