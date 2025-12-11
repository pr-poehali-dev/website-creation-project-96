import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Product } from '@/components/ProductCard';

interface CartItem extends Product {
  quantity: number;
}

const About = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              О магазине
            </h1>
            <p className="text-muted-foreground text-lg">Узнайте больше о ShopFlow</p>
          </div>

          <Card className="mb-8 animate-scale-in">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Наша история</h2>
              <p className="text-muted-foreground mb-4">
                ShopFlow — это современный интернет-магазин электроники и гаджетов, созданный командой энтузиастов в 2024 году. 
                Мы стремимся сделать покупку техники максимально простой и приятной для наших клиентов.
              </p>
              <p className="text-muted-foreground">
                За короткое время мы завоевали доверие тысяч покупателей благодаря качественному сервису, 
                широкому ассортименту и выгодным ценам.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4">
                  <Icon name="Target" size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Наша миссия</h3>
                <p className="text-muted-foreground">
                  Делать современные технологии доступными для каждого, предоставляя качественные товары 
                  и первоклассный сервис.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center mb-4">
                  <Icon name="Eye" size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">Наше видение</h3>
                <p className="text-muted-foreground">
                  Стать ведущим онлайн-магазином электроники в России, известным своим инновационным 
                  подходом и заботой о клиентах.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6">Наши преимущества</h2>
              <div className="grid gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Только оригинальная продукция</h4>
                    <p className="text-muted-foreground text-sm">
                      Работаем напрямую с производителями и официальными дистрибьюторами
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Быстрая доставка</h4>
                    <p className="text-muted-foreground text-sm">
                      Собственная служба доставки по Москве и сотрудничество с ведущими транспортными компаниями
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Гарантийное обслуживание</h4>
                    <p className="text-muted-foreground text-sm">
                      Официальная гарантия на все товары и собственный сервисный центр
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Профессиональная поддержка</h4>
                    <p className="text-muted-foreground text-sm">
                      Команда экспертов готова помочь с выбором и ответить на все вопросы
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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

export default About;
