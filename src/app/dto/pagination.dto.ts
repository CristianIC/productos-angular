export interface PaginationDTO {

    currentPage: number;

    numberOfElementsPerPage: number;

    pageSize: number;

    totalElements: number;

    totalPages: number;

    elements: any[];
}