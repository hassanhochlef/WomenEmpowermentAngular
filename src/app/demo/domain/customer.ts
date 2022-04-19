

export interface Representative {
    name?: string;
    image?: string;
}

export interface Customer {
    id?: number;
    name?: string;

    company?: string;
    date?: string;
    status?: string;
    activity?: number;
    representative?: Representative;
}
