document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.section');
    const links = document.querySelectorAll('.header nav ul li a');
    const cartButtons = document.querySelectorAll('.add-to-cart');
    const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
    const cartTotalElement = document.querySelector('.cart-total h3');

    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        observer.observe(card);
    });

    // Smooth scrolling for navigation links
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scroll({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Cart functionality
    cartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').innerText;
            const productPrice = productCard.querySelector('p').innerText;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${productCard.querySelector('.product-image').src}" alt="${productName}" class="cart-image">
                <h3>${productName}</h3>
                <p>${productPrice}</p>
                <button class="button remove-from-cart">Remove</button>
            `;
            document.querySelector('#cart').appendChild(cartItem);

            updateCartTotal();
        });
    });

    // Remove from cart functionality
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-from-cart')) {
            e.target.closest('.cart-item').remove();
            updateCartTotal();
        }
    });

    function updateCartTotal() {
        const cartItems = document.querySelectorAll('.cart-item');
        let total = 0;
        cartItems.forEach(item => {
            const price = parseFloat(item.querySelector('p').innerText.replace('$', ''));
            total += price;
        });
        cartTotalElement.innerText = `Total: $${total}`;
    }
});
