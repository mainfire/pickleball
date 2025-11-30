import { useState, useEffect } from 'react';
import { ProductGrid } from '../../components/pos/ProductGrid';
import { Cart } from '../../components/pos/Cart';
import { endpoints } from '../../lib/api';
import { Search } from 'lucide-react';

export function POSPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [cart, setCart] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [search, setSearch] = useState('');

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const data = await endpoints.pos.getProducts();
            setProducts(data);
        } catch (error) {
            console.error('Failed to load products', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = (product: any) => {
        setCart(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, quantity: 1 }];
        });
    };

    const updateQuantity = (productId: string, delta: number) => {
        setCart(prev => {
            return prev.map(item => {
                if (item.product.id === productId) {
                    const newQuantity = item.quantity + delta;
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
                }
                return item;
            });
        });
    };

    const removeFromCart = (productId: string) => {
        setCart(prev => prev.filter(item => item.product.id !== productId));
    };

    const handleCheckout = async () => {
        try {
            setProcessing(true);
            const orderData = {
                items: cart.map(item => ({
                    productId: item.product.id,
                    quantity: item.quantity
                }))
            };

            await endpoints.pos.createOrder(orderData);

            // Success! Clear cart
            setCart([]);
            alert('Order processed successfully!');
        } catch (error) {
            console.error('Checkout failed', error);
            alert('Failed to process order');
        } finally {
            setProcessing(false);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="h-[calc(100vh-4rem)] flex overflow-hidden">
            {/* Main Content - Product Grid */}
            <div className="flex-1 flex flex-col min-w-0 bg-gray-50">
                <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="relative max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <div className="flex justify-center py-10">Loading products...</div>
                    ) : (
                        <ProductGrid
                            products={filteredProducts}
                            onAddToCart={addToCart}
                        />
                    )}
                </div>
            </div>

            {/* Sidebar - Cart */}
            <div className="w-96 flex-shrink-0 bg-white shadow-xl z-10">
                <Cart
                    items={cart}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                    onCheckout={handleCheckout}
                    loading={processing}
                />
            </div>
        </div>
    );
}
