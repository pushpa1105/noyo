type FilterType = {
    keyword?: string;
    [key: string]: any;
}

type ImageItem = {
    _id: string;
    public_id: string;
    url: string;
}

type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    skinType: string[];
    stock: number;
    images?: ImageItem[];
}

type CommonFilter = {
    keyword?: string;
    [key: string]: any;
}