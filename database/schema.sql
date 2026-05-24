-- Таблица пользователей
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birth_date DATE,
    login VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица товаров
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    image VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    compound TEXT
);

-- Таблица заказов
CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Таблица позиций заказа
CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Заполнение тестовыми данными
INSERT INTO users (first_name, last_name, birth_date, login, password_hash) VALUES
('Анна', 'Иванова', '1995-03-12', 'anna_i', 'pass123'),
('Пётр', 'Сидоров', '1990-07-21', 'p_sidorov', 'qwerty');

INSERT INTO products (name, description, category, image, price, compound) VALUES
('Увлажняющий мусс', 'Глубоко увлажняет кожу лица', 'для нормальной кожи', 'moist-mousse.png', 2750.00, 'активные комплексы, витамины C, A, E'),
('Увлажняющая маска', 'Способствует удерживанию влаги', 'для нормальной кожи', 'moist-mask.png', 3500.00, 'воски, минералы, масла'),
('Гель для умывания', 'Интенсивно очищает', 'для нормальной кожи', 'cleansing-gel.png', 1650.00, 'минералы, витамины'),
('Подарочный набор №1', 'Набор из крема и маски', 'подарочный', 'gift-set-1.png', 4750.00, 'воски, минералы, масла'),
('Подарочный набор №5', 'Полный набор средств', 'подарочный', 'gift-set-5.png', 7520.00, 'воски, минералы, масла');

-- Пример заказа
INSERT INTO orders (user_id, total_price) VALUES (1, 6250.00);
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 2, 2750.00),
(1, 2, 1, 3500.00);