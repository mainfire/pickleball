import { Plus } from 'lucide-react';

interface Product {
    id: string;
    name: string;
    price: number;
    category?: string;
}

interface ProductGridProps {
    products: Product[];
    onAddToCart: (product: Product) => void;
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
                <button
                    key={product.id}
                    onClick={() => onAddToCart(product)}
                    className="flex flex-col items-start p-4 bg-white border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all text-left"
                >
                    <div className="h-24 w-full bg-gray-100 rounded-md mb-3 flex items-center justify-center text-gray-400">
                        {/* Placeholder for product image */}
                        <span className="text-xs">No Image</span>
                    </div>
                    <h3 className="font-medium text-gray-900 line-clamp-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{product.category || 'General'}</p>
                    <div className="mt-auto flex items-center justify-between w-full">
                        <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
                        <div className="p-1 bg-primary/10 rounded-full text-primary">
                            <Plus className="h-4 w-4" />
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
}
