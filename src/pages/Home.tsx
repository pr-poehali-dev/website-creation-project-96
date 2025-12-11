import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard, { Product } from '@/components/ProductCard';
import Cart from '@/components/Cart';

interface CartItem extends Product {
  quantity: number;
}

const mockProducts: Product[] = [
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
  }
];

const Home = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Добро пожаловать в ShopFlow
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Современный интернет-магазин с широким ассортиментом качественных товаров и быстрой доставкой по всей России
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity text-base">
                  <Link to="/products">
                    <Icon name="ShoppingBag" size={20} className="mr-2" />
                    Перейти в каталог
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-base">
                  <Link to="/about">
                    <Icon name="Info" size={20} className="mr-2" />
                    О магазине
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Популярные товары</h2>
              <p className="text-muted-foreground">Самые востребованные позиции в нашем магазине</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button asChild size="lg" variant="outline">
                <Link to="/products">
                  Смотреть все товары
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 animate-fade-in">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Truck" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Быстрая доставка</h3>
                <p className="text-muted-foreground">Доставляем заказы по всей России от 1 дня</p>
              </div>
              <div className="text-center p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Гарантия качества</h3>
                <p className="text-muted-foreground">Официальная гарантия на все товары</p>
              </div>
              <div className="text-center p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Headphones" size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Поддержка 24/7</h3>
                <p className="text-muted-foreground">Всегда готовы помочь с выбором и заказом</p>
              </div>
            </div>
          </div>
        </section>
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

export default Home;
