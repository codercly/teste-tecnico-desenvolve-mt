// Interface para informações de ordenação
interface Sort {
	unsorted: boolean;
	sorted: boolean;
	empty: boolean;
}

// Interface para informações de paginação
interface Pageable {
	pageNumber: number;
	pageSize: number;
	sort: Sort;
	offset: number;
	unpaged: boolean;
	paged: boolean;
}

// Interface principal para a resposta paginada
export interface IPaginatedResponse<T> {
	totalElements: number;
	totalPages: number;
	pageable: Pageable;
	numberOfElements: number;
	first: boolean;
	last: boolean;
	size: number;
	content: T[];
	number: number;
	sort: Sort;
	empty: boolean;
}