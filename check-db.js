import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database(':memory:');

// Загружаем схему и данные из schema.sql
const schema = fs.readFileSync(path.join(__dirname, 'database', 'schema.sql'), 'utf8');
db.exec(schema);
console.log('Таблицы созданы и заполнены.\n');

// Массив из 5 обязательных запросов
const queries = [
  {
    desc: '1. SELECT с условием: товары дороже 3000 руб.',
    sql: 'SELECT * FROM products WHERE price > 3000',
    isSelect: true
  },
  {
    desc: '2. INSERT: добавить пользователя',
    sql: "INSERT INTO users (first_name, last_name, birth_date, login, password_hash) VALUES ('Елена', 'Петрова', '1998-11-05', 'elena_p', 'secret')",
    isSelect: false
  },
  {
    desc: '3. UPDATE: изменить цену товара с id = 3',
    sql: 'UPDATE products SET price = 1800.00 WHERE id = 3',
    isSelect: false
  },
  {
    desc: '4. DELETE: удалить товар с id = 5',
    sql: 'DELETE FROM products WHERE id = 5',
    isSelect: false
  },
  {
    desc: '5. SELECT с JOIN: детали заказа пользователя',
    sql: `SELECT u.first_name, u.last_name, o.id AS order_id, p.name, oi.quantity, oi.price
          FROM users u
          JOIN orders o ON u.id = o.user_id
          JOIN order_items oi ON o.id = oi.order_id
          JOIN products p ON oi.product_id = p.id
          WHERE u.id = 1`,
    isSelect: true
  }
];

for (const query of queries) {
  console.log(`▶ ${query.desc}`);
  console.log(query.sql);
  try {
    if (query.isSelect) {
      const rows = db.prepare(query.sql).all();
      console.table(rows);
    } else {
      const result = db.prepare(query.sql).run();
      console.log(`Изменений: ${result.changes}`);
    }
  } catch (err) {
    console.error('Ошибка:', err.message);
  }
  console.log('---');
}

db.close();
console.log('Все запросы выполнены.');