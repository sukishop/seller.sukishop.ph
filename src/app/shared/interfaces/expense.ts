export interface expense {
    id: number;
    name: string;
    amount: number;
    account_id: number;
    expense_category_id: number;
    filename: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export interface expensesCategory {
    id: number;
    expense_category_name: string;
    account_id: string;
    expense_category_id: string;
}

export interface account {
    id: number;
    account_name: string;
}

export interface pagination {
    prev: string,
    next: string,
    first: string,
    last: string,
    page: string,
    perPage: number;
    currentPage: number;
}

export interface image {
    filename: any;
}