let cart = [];
let total = 0;

function addToCart(item, price) {
    const existingItem = cart.find(cartItem => cartItem.item === item);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ item, price, quantity: 1 });
    }
    total += price;
    updateCart();
}

function removeFromCart(item) {
    const index = cart.findIndex(cartItem => cartItem.item === item);
    if (index !== -1) {
        total -= cart[index].price * cart[index].quantity;
        cart.splice(index, 1);
        updateCart();
    }
}

function updateCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    cart.forEach((cartItem) => {
        const li = document.createElement('li');
        li.textContent = `${cartItem.item} - R$ ${cartItem.price.toFixed(2)} x ${cartItem.quantity}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeFromCart(cartItem.item);
        li.appendChild(removeButton);
        cartList.appendChild(li);
    });
    document.getElementById('total-price').textContent = total.toFixed(2);
    document.getElementById('cart-link').textContent = `Carrinho (${cart.length})`;
}

function checkout() {
    if (cart.length === 0) {
        alert('Seu carrinho está vazio!');
    } else {
        alert(`Pedido finalizado! Total: R$ ${total.toFixed(2)}`);
        cart = [];
        total = 0;
        updateCart();
    }
}
