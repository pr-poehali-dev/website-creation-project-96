import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard, { Product } from '@/components/ProductCard';
import Cart from '@/components/Cart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CartItem extends Product {
  quantity: number;
}

const allProducts: Product[] = [
  {
    id: 1,
    name: 'Беспроводные наушники',
    price: 8990,
    image: 'https://cdn.poehali.dev/projects/61d1dbc3-fa81-41a9-aa8c-99df65439d01/files/8efd0a25-27bb-4c9e-9824-0a5e4fec83a3.jpg',
    category: 'Аудио',
    badge: 'Хит продаж'
  },
  {
    id: 2,
    name: 'Умные часы',
    price: 15990,
    image: 'https://cdn.poehali.dev/projects/61d1dbc3-fa81-41a9-aa8c-99df65439d01/files/5ecc10b7-3685-486b-9378-7a1d20a9871f.jpg',
    category: 'Гаджеты',
    badge: 'Новинка'
  },
  {
    id: 3,
    name: 'Ноутбук',
    price: 79990,
    image: 'https://cdn.poehali.dev/projects/61d1dbc3-fa81-41a9-aa8c-99df65439d01/files/ec414420-e8ae-4dcf-84e5-7695d55c0e52.jpg',
    category: 'Компьютеры'
  },
  {
    id: 4,
    name: 'Портативная колонка',
    price: 4990,
    image: 'https://cdn.poehali.dev/projects/61d1dbc3-fa81-41a9-aa8c-99df65439d01/files/8efd0a25-27bb-4c9e-9824-0a5e4fec83a3.jpg',
    category: 'Аудио'
  },
  {
    id: 5,
    name: 'Механическая клавиатура',
    price: 12990,
    image: 'https://cdn.poehali.dev/projects/61d1dbc3-fa81-41a9-aa8c-99df65439d01/files/ec414420-e8ae-4dcf-84e5-7695d55c0e52.jpg',
    category: 'Компьютеры'
  },
  {
    id: 6,
    name: 'Игровая мышь',
    price: 3990,
    image: 'https://cdn.poehali.dev/projects/61d1dbc3-fa81-41a9-aa8c-99df65439d01/files/5ecc10b7-3685-486b-9378-7a1d20a9871f.jpg',
    category: 'Компьютеры'
  },
  {
    id: 7,
    name: 'Фитнес-браслет',
    price: 5990,
    image: 'https://cdn.poehali.dev/projects/61d1dbc3-fa81-41a9-aa8c-99df65439d01/files/5ecc10b7-3685-486b-9378-7a1d20a9871f.jpg',
    category: 'Гаджеты'
  },
  {
    id: 8,
    name: 'Студийные наушники',
    price: 24990,
    image: 'https://cdn.poehali.dev/projects/61d1dbc3-fa81-41a9-aa8c-99df65439d01/files/8efd0a25-27bb-4c9e-9824-0a5e4fec83a3.jpg',
    category: 'Аудио',
    badge: 'Premium'
  }
];

const categories = ['Все', 'Аудио', 'Гаджеты', 'Компьютеры'];

const Products = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const filteredProducts = selectedCategory === 'Все'
    ? allProducts
    : allProducts.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemove = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemsCount={cartItemsCount} onCartClick={() => setIsCartOpen(true)} />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Каталог товаров
            </h1>
            <p className="text-muted-foreground text-lg">Выберите то, что вам нужно</p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-gradient-to-r from-primary to-secondary' : ''}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">Товары не найдены</p>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default Products;
