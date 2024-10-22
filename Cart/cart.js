document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    let cartItems = [];

    try {
        cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (error) {
        console.error("Error parsing cart data from localStorage:", error);
        cartItems = []; // Fallback to an empty array if parsing fails
    }

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ''; // Clear current items
        let total = 0;

        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            const img = document.createElement('img');
            img.setAttribute('src', item.images[0]); // Ensure you get the first image

            const details = document.createElement('div');
            details.classList.add('cart-item-details');

            const title = document.createElement('div');
            title.classList.add('cart-item-title');
            title.innerText = item.name;

            const price = document.createElement('div');
            price.classList.add('cart-item-price');
            price.innerText = `$${item.price.toFixed(2)}`;

            details.append(title, price);

            const quantityContainer = document.createElement('div');
            quantityContainer.classList.add('cart-item-quantity');

            const quantityLabel = document.createElement('span');
            quantityLabel.innerText = `Quantity: ${item.quantity}`;

            const incrementButton = document.createElement('button');
            incrementButton.innerText = '+';
            incrementButton.classList.add('quantity-button');
            incrementButton.addEventListener('click', () => {
                item.quantity += 1;
                updateCartItem(index, item);
            });

            const decrementButton = document.createElement('button');
            decrementButton.innerText = '-';
            decrementButton.classList.add('quantity-button');
            decrementButton.addEventListener('click', () => {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                    updateCartItem(index, item);
                } else {
                    // Remove item if quantity is 1 and decrement is clicked
                    cartItems.splice(index, 1);
                    localStorage.setItem('cart', JSON.stringify(cartItems));
                    updateCartDisplay();
                }
            });

            quantityContainer.append(decrementButton, quantityLabel, incrementButton);
            cartItem.append(img, details, quantityContainer);
            cartItemsContainer.appendChild(cartItem);

            total += item.price * item.quantity;
        });

        cartTotalElement.innerText = `Total: $${total.toFixed(2)}`;
    }

    function updateCartItem(index, item) {
        cartItems[index] = item; // Update the item in the cartItems array
        localStorage.setItem('cart', JSON.stringify(cartItems)); // Update local storage
        updateCartDisplay(); // Refresh the display
    }

    updateCartDisplay();

    document.getElementById('checkoutButton').addEventListener('click', () => {
        if (cartItems.length > 0) {
            // Clear the cart
            cartItems = [];
            localStorage.removeItem('cart'); // Clear cart from local storage
            alert('Your order is placed'); // Show order confirmation alert
            updateCartDisplay(); // Update the display to reflect the empty cart
        } else {
            alert('Your cart is empty!');
        }
    });
});
