import { Modal } from './Modal.js';
import { Form } from './Form.js';
import { productCards } from './array-product-cards.js';

const regModal = new Modal('registrationModal');
const cartModal = new Modal('cartModal');
const regForm = new Form('registrationForm');
const catalogContainer = document.querySelector('.all-cards-container');
const template = document.getElementById('product-cards-template');
const cartCounter = document.getElementById('cartCounter');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotal = document.getElementById('cartTotal');
const regBtn = document.getElementById('openRegistration');

let cart = [];

export function renderCatalog() {
  catalogContainer.innerHTML = '';
  productCards.forEach(product => {
    const clone = template.content.cloneNode(true);
    clone.querySelector('.product-img').src = `./images/${product.img}.png`;
    clone.querySelector('.product-img').alt = product.name;
    clone.querySelector('.product-name').textContent = product.name;
    clone.querySelector('.product-description').textContent = product.description;

    const compoundList = clone.querySelector('.product-compound');
    product.compound.forEach(item => {
      const li = document.createElement('li');
      li.className = 'product-compound-item';
      li.textContent = item;
      compoundList.appendChild(li);
    });

    clone.querySelector('.product-price').innerHTML = `${product.price} &#8381;`;

    const addBtn = document.createElement('button');
    addBtn.className = 'add-to-cart-btn';
    addBtn.textContent = 'В корзину';
    addBtn.dataset.id = product.id;
    addBtn.addEventListener('click', addToCart);
    clone.querySelector('.card-container').appendChild(addBtn);

    catalogContainer.appendChild(clone);
  });
}

function addToCart(e) {
  const id = parseInt(e.target.dataset.id);
  const product = productCards.find(p => p.id === id);
  const existing = cart.find(item => item.product.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ product, quantity: 1 });
  }
  updateCartCounter();
}

function updateCartCounter() {
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCounter.textContent = total;
}

function renderCart() {
  cartItemsContainer.innerHTML = '';
  let totalPrice = 0;

  cart.forEach((item, index) => {
    totalPrice += item.product.price * item.quantity;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="cart-item-info">
        <strong>${item.product.name}</strong><br>
        ${item.product.price} ₽ × ${item.quantity}
      </div>
      <div class="cart-item-controls">
        <button class="incr" data-index="${index}">+</button>
        <span>${item.quantity}</span>
        <button class="decr" data-index="${index}">-</button>
        <button class="remove" data-index="${index}">×</button>
      </div>
    `;
    cartItemsContainer.appendChild(div);
  });

  cartTotal.textContent = totalPrice;

  document.querySelectorAll('.incr').forEach(btn => {
    btn.onclick = () => {
      cart[btn.dataset.index].quantity++;
      renderCart();
      updateCartCounter();
    };
  });
  document.querySelectorAll('.decr').forEach(btn => {
    btn.onclick = () => {
      if (cart[btn.dataset.index].quantity > 1) {
        cart[btn.dataset.index].quantity--;
      } else {
        cart.splice(btn.dataset.index, 1);
      }
      renderCart();
      updateCartCounter();
    };
  });
  document.querySelectorAll('.remove').forEach(btn => {
    btn.onclick = () => {
      cart.splice(btn.dataset.index, 1);
      renderCart();
      updateCartCounter();
    };
  });
}

document.getElementById('checkoutBtn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Корзина пуста!');
    return;
  }
  if (regBtn.textContent === 'Регистрация') {
    alert('Пожалуйста, сначала зарегистрируйтесь.');
    cartModal.close();
    regModal.open();
    return;
  }
  alert('Заказ оформлен! Спасибо за покупку.');
  cart = [];
  updateCartCounter();
  cartModal.close();
});

regForm.form.addEventListener('submit', (e) => {
  e.preventDefault();

  const password = document.getElementById('password');
  const confirm = document.getElementById('repetPassword');
  if (password.value !== confirm.value) {
    confirm.setCustomValidity('Пароли не совпадают');
  } else {
    confirm.setCustomValidity('');
  }

  if (!regForm.isValid()) {
    regForm.form.reportValidity();
    return;
  }

  const data = regForm.getValues();
  console.log('Регистрация успешна:', data);
  regModal.close();
  regForm.reset();
  regBtn.textContent = data.userFirstName;
  alert(`Добро пожаловать, ${data.userFirstName}!`);
});

document.getElementById('openRegistration').addEventListener('click', () => regModal.open());
document.getElementById('openCart').addEventListener('click', () => {
  renderCart();
  cartModal.open();
});
document.getElementById('closeCart').addEventListener('click', () => cartModal.close());
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (regModal.isOpen()) regModal.close();
    if (cartModal.isOpen()) cartModal.close();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  updateCartCounter();
});