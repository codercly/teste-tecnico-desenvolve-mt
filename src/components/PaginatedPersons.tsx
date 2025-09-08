"use client";
import { Filter } from "@/types/filters";
import { use, useState } from "react";
import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    MoreHorizontalIcon,
} from "lucide-react";

import { IPessoaDesaparecida } from "@/types/person";
import { IPaginatedResponse } from "@/types/pagination";
export function PaginatedPersons({
    searchParams,
    pagination: paginatedPersons,
}: {
    searchParams: Filter;
    pagination: Promise<IPaginatedResponse<IPessoaDesaparecida>>;
}) {
    const pagination = use(paginatedPersons);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(
        searchParams.pagina ? Number(searchParams.pagina) : 0
    );

    const getPaginationItems = () => {
        const items: (number | "ellipsis")[] = [];
        const maxVisiblePages = 5;

        if (pagination.totalPages <= maxVisiblePages) {
            for (let i = 1; i <= pagination.totalPages; i++) {
                items.push(i);
            }
        } else {
            // sempre motrar a pagina 1
            items.push(1);

            if (currentPage <= 2) {
                // mostrar primeiras 3 paginas + ellipsis + ultima pagina
                items.push(2, 3, 4);
                if (pagination.totalPages > 4) {
                    items.push("ellipsis");
                    items.push(pagination.totalPages);
                }
            } else if (currentPage >= pagination.totalPages - 2) {
                // mostrar ellipsis +  antepenultima + penultima + ultima
                items.push("ellipsis");
                items.push(
                    pagination.totalPages - 2,
                    pagination.totalPages - 1,
                    pagination.totalPages
                );
            } else {
                // mostrar ellipsis + pagina atual + proxima + ellipsis + ultima
                items.push(
                    "ellipsis",
                    currentPage,
                    currentPage + 1,
                    currentPage + 2,
                    "ellipsis",
                    pagination.totalPages
                );
            }
        }

        return items;
    };

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams as unknown as string);
        params.set("pagina", page.toString());
        router.push(`?${params.toString()}`);
        setCurrentPage(page);
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage > 0) {
                                handlePageChange(currentPage - 1);
                            }
                        }}
                        variant={"ghost"}
                        disabled={currentPage === 0}
                    >
                        <ChevronLeftIcon />
                        Anterior
                    </Button>
                </PaginationItem>

                {getPaginationItems().map((item, index) => (
                    <PaginationItem key={index}>
                        {item === "ellipsis" ? (
                            <MoreHorizontalIcon />
                        ) : (
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    handlePageChange((item - 1) as number);
                                }}
                                variant={item - 1 === currentPage ? "default" : "ghost"}
                            >
                                {item}
                            </Button>
                        )}
                    </PaginationItem>
                ))}

                <PaginationItem>
                    <Button
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentPage < pagination.totalPages) {
                                handlePageChange(currentPage + 1);
                            }
                        }}
                        variant={"ghost"}
                        disabled={currentPage + 1 === pagination.totalPages}
                    >
                        Próximo
                        <ChevronRightIcon />
                    </Button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}