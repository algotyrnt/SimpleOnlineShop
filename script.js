let cart = [];

// Function to add a product to the cart
function addToCart(productId) {
    const productElement = document.querySelector(`.product[data-id='${productId}']`);
    const productName = productElement.querySelector('h2').innerText;
    const productPrice = parseFloat(productElement.querySelector('p').innerText.replace('$', ''));

    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }
    Cart();
}

// Function to render the cart on the shop page
function Cart() {
    const cartElement = document.getElementById('cart');
    cartElement.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerText = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        cartElement.appendChild(itemElement);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').innerText = `Total: $${totalPrice.toFixed(2)}`;
}

// Mock function to simulate sending an email
function sendEmail(email, subject, body) {
    console.log(`Email sent to ${email} with subject "${subject}" and body: ${body}`);
}

// Function to handle the form submission on the checkout page
document.getElementById('checkout-form').addEventListener('submit', function(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert('Your cart is empty.');
        return;
    }else{
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const paymentMethod = document.getElementById('payment-method').value;

        const orderDetails = cart.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n');
        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

        const order = `
        New order details:
        Name: ${name}
        Email: ${email}
        Phone Number: ${phone}
        ${orderDetails}
        Total: $${totalPrice}
        Payment Method: ${paymentMethod}`;

        console.log(order);

        const feedback = document.getElementById('feedback');
        feedback.innerText = 'Thank you for your purchase!';
        cart = []; // Clear the cart
        Cart(); // Refresh the cart display
    }
});

// Initial render of the cart
Cart();
