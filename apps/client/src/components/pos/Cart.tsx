import { Trash2, Minus, Plus, ShoppingCart } from 'lucide-react';

interface CartItem {
    product: {
        id: string;
        name: string;
        price: number;
    };
    quantity: number;
}

interface CartProps {
    items: CartItem[];
    onUpdateQuantity: (productId: string, delta: number) => void;
    onRemove: (productId: string) => void;
    onCheckout: () => void;
    loading?: boolean;
}

export function Cart({ items, onUpdateQuantity, onRemove, onCheckout, loading }: CartProps) {
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    if (items.length === 0) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8 text-center border-l border-gray-200 bg-gray-50">
                <ShoppingCart className="h-12 w-12 mb-4 opacity-20" />
                <p>Cart is empty</p>
                <p className="text-sm mt-2">Select products to start an order</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col bg-white border-l border-gray-200">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Current Order
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.map((item) => (
                    <div key={item.product.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                            <p className="text-sm text-gray-500">${item.product.price.toFixed(2)}</p>
                        </div>

                        <div className="flex items-center space-x-3">
                            <div className="flex items-center bg-white rounded-md border border-gray-200">
                                <button
                                    onClick={() => onUpdateQuantity(item.product.id, -1)}
                                    className="p-1 hover:bg-gray-100 text-gray-600"
                                >
                                    <Minus className="h-3 w-3" />
                                </button>
                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                <button
                                    onClick={() => onUpdateQuantity(item.product.id, 1)}
                                    className="p-1 hover:bg-gray-100 text-gray-600"
                                >
                                    <Plus className="h-3 w-3" />
                                </button>
                            </div>
                            <button
                                onClick={() => onRemove(item.product.id)}
                                className="text-red-500 hover:text-red-700 p-1"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
                </div>

                <button
                    onClick={onCheckout}
                    disabled={loading}
                    className="w-full py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Processing...' : `Checkout ($${total.toFixed(2)})`}
                </button>
            </div>
        </div>
    );
}
