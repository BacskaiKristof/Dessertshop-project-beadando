let cart = [];
const productGrid = document.querySelector('.product-grid');
const cartCard = document.querySelector('.cart-card');
const cartTitle = document.querySelector('.cart-title');
const cartEmptyState = document.querySelector('.cart-empty-state');

// 1. Betöltés a PHP-ból
async function loadProducts() {
    try {
        const response = await fetch('php/get_products.php');
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error("Hiba:", error);
    }
}

function renderProducts(products) {
    productGrid.innerHTML = '';
    products.forEach(p => {
        const card = `
            <article class="product-card">
                <div class="image-wrapper">
                    <img src="${p.image_url}" alt="${p.nev}" class="product-image">
                    <button class="add-to-cart-btn" onclick="addToCart(${p.id}, '${p.nev}', ${p.ar})">
                         Kosárba
                    </button>
                </div>
                <p class="category">${p.tipus} ${p.mentes_info ? `(${p.mentes_info})` : ''}</p>
                <h2 class="item-name">${p.nev}</h2>
                <p class="price">${p.ar} Ft</p>
            </article>
        `;
        productGrid.insertAdjacentHTML('beforeend', card);
    });
}

// 2. Kosár műveletek
function addToCart(id, name, price) {
    const existing = cart.find(i => i.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    document.querySelectorAll('.cart-item, .cart-total-container, .confirm-order-btn').forEach(el => el.remove());

    if (cart.length === 0) {
        cartEmptyState.style.display = 'block';
        cartTitle.innerText = `Kosarad (0)`;
        return;
    }

    cartEmptyState.style.display = 'none';
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        count += item.quantity;
        const html = `
            <div class="cart-item">
                <div class="cart-item-info">
                    <p class="item-name-bold">${item.name}</p>
                    <div class="item-details">
                        <span class="qty">${item.quantity}x</span>
                        <span class="unit-price">@ ${item.price} Ft</span>
                        <span class="item-total">${item.price * item.quantity} Ft</span>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">×</button>
            </div>`;
        cartCard.insertAdjacentHTML('beforeend', html);
    });

    const footer = `
        <div class="cart-total-container">
            <span>Összesen</span>
            <span class="total-price-value">${total} Ft</span>
        </div>
        <button class="confirm-order-btn" onclick="sendOrderToServer()">Rendelés megerősítése</button>`;
    cartCard.insertAdjacentHTML('beforeend', footer);
    cartTitle.innerText = `Kosarad (${count})`;
}

// 3. Küldés a szerverre
async function sendOrderToServer() {
    const totalValue = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    try {
        const response = await fetch('php/confirm_order.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                items: cart,
                total: totalValue
            })
        });

        const res = await response.json();
        if (res.success) {
            alert(`Sikeres rendelés! Szám: ${res.order_id}`);
            cart = [];
            updateCartUI();
        } else {
            alert("Hiba: " + res.error);
        }
    } catch (e) {
        alert("Szerver hiba történt.");
    }
}

// Kereső
function filterDesserts() {
    const val = document.getElementById('product-search').value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
        const name = card.querySelector('.item-name').innerText.toLowerCase();
        card.style.display = name.includes(val) ? 'block' : 'none';
    });
}

loadProducts();