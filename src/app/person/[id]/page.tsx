'use client'
import React, { useEffect, useState } from 'react'
import { getPeopleById } from '@/api/person'
import { useParams } from 'next/navigation';
import { PersonDetails } from '@/components/PersonDetails';
import { IPessoaDesaparecida } from '@/types/Person';



export default function Page() {
    const { id } = useParams<{ id: string }>();

    const [person, setPerson] = useState<IPessoaDesaparecida | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const pessoa = await getPeopleById(Number(id));
            console.log(pessoa);
            setPerson(pessoa);
        };

        fetchData();
    }, [id]);

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <PersonDetails person={person} />
                <div className="mt-8">
                    {/* <ReportForm personId={person.id} /> */}
                </div>
            </div>
        </div>
    )
}
