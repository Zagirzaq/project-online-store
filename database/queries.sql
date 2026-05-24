-- 1. SELECT с условием: все товары дороже 3000 руб.
SELECT * FROM products WHERE price > 3000;

-- 2. INSERT: добавить нового пользователя
INSERT INTO users (first_name, last_name, birth_date, login, password_hash)
VALUES ('Елена', 'Петрова', '1998-11-05', 'elena_p', 'secret');

-- 3. UPDATE: изменить цену товара с id = 3 на 1800 руб.
UPDATE products SET price = 1800.00 WHERE id = 3;

-- 4. DELETE: удалить товар с id = 5 (подарочный набор №5)
DELETE FROM products WHERE id = 5;

-- 5. SELECT с JOIN: детали заказа пользователя (имя, номер заказа, товары, количество, цена)
SELECT u.first_name, u.last_name, o.id AS order_id, p.name, oi.quantity, oi.price
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p ON oi.product_id = p.id
WHERE u.id = 1;