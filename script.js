let cards = [
    { img: 'Pictures/hamburger.png', id: 1, name: 'همبرگر معمولی', price: 8000 },
    { img: 'Pictures/hamburger.png', id: 2, name: 'همبرگر مخصوص', price: 10000 },
    { img: 'Pictures/hamburger.png', id: 3, name: 'همبرگر معمولی با قارچ و پنیر', price: 10000 },
    { img: 'Pictures/hamburger.png', id: 4, name: 'همبرگر مخصوص با قارچ و پنیر', price: 20000 },
    { img: 'Pictures/french_fries.png', id: 5, name: 'سیب زمینی سرخ کرده ویژه', price: 25000 },
    { img: 'Pictures/french_fries.png', id: 6, name: 'سیب زمینی سرخ کرده', price: 10000 },
    { img: 'Pictures/soda.png', id: 7, name: 'نوشابه رژیمی', price: 6000 },
    { img: 'Pictures/soda.png', id: 8, name: 'نوشابه', price: 5000 },
    { img: 'Pictures/salad.png', id: 9, name: 'سالاد فصل', price: 8000 },
    { img: 'Pictures/ceasar.png', id: 10, name: 'سالاد سزار', price: 25000 },
];

let menuContainer = document.querySelector(".menu-container");
let cardsContainer = document.querySelector(".menu");
let totalPriceElement = document.getElementById("total-price");
let discountCodeElement = document.getElementById("discount-code");
let discountErrorElement = document.getElementById("discount-error");
let discountAmountElement = document.getElementById("discount-amount");
let finalTotalElement = document.getElementById("final-total");
let submitButton = document.getElementById("submit-order");
let discountSubmit = document.querySelector(".discount-submit");

const validDiscountCodes = {
    'GOLD': 0.30,
    'SILVER': 0.20,
    'BRONZE': 0.10
};

function createMenu() {
    cards.forEach((card) => {
        let cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.id = card.id;
        cardElement.innerHTML = `
            <img src="${card.img}" class="food-pic">
            <h3 class="food-name">${card.name}</h3>
            <div class="price">${card.price}</div>
            <div class="price-container">
                <div class="quantity-container">
                    <button class="decrement">-</button>
                    <input type="number" class="quantity" min="0" value="0" data-price="${card.price}" data-id="${card.id}">
                    <button class="increment">+</button>
                </div>
                <p class="food-price" id="price-${card.id}">${priceDisplay(card.price, 0)} تومان</p>
            </div>
        `;

        cardsContainer.appendChild(cardElement);
    });

    document.querySelectorAll('.quantity').forEach(input => {
        input.addEventListener('input', (event) => {
            updatePrice(event.target);
            updateOrderSummary();
        });
    });

    document.querySelectorAll('.increment').forEach(button => {
        button.addEventListener('click', (event) => {
            let input = event.target.previousElementSibling;
            input.value = parseInt(input.value) + 1;
            updatePrice(input);
            updateOrderSummary();
        });
    });

    document.querySelectorAll('.decrement').forEach(button => {
        button.addEventListener('click', (event) => {
            let input = event.target.nextElementSibling;
            if (parseInt(input.value) > 0) {
                input.value = parseInt(input.value) - 1;
            }
            updatePrice(input);
            updateOrderSummary();
        });
    });

    discountSubmit.addEventListener('click', () => {
        const discountCode = discountCodeElement.value.trim().toUpperCase();
        const discountRate = validDiscountCodes[discountCode] || 0;

        if (discountRate > 0) {
            discountErrorElement.innerHTML = '';
            discountAmountElement.innerHTML = (discountRate * 100).toFixed(0);
            let totalOrderPrice = calculateTotalOrderPrice();
            let discountAmount = totalOrderPrice * discountRate;
            finalTotalElement.innerHTML = (totalOrderPrice + 6200 - discountAmount).toFixed(0);
        } else {
            discountErrorElement.innerHTML = 'کد تخفیف معتبر نیست.';
        }
    });

    discountCodeElement.addEventListener('input', () => {
        discountErrorElement.innerHTML = '';
    });

    submitButton.addEventListener('click', () => {
        alert("سفارش شما با موفقیت ثبت شد");
    });
}

function priceDisplay(price, quantity) {
    return (quantity >= 1 ? price * quantity : price).toFixed(0);
}

function updatePrice(inputElement) {
    let quantity = parseInt(inputElement.value);
    let price = parseInt(inputElement.getAttribute('data-price'));
    let priceElement = document.getElementById(`price-${inputElement.getAttribute('data-id')}`);
    priceElement.innerHTML = `${priceDisplay(price, quantity)} تومان`;
}

function updateOrderSummary() {
    let total = calculateTotalOrderPrice();
    totalPriceElement.innerHTML = total.toFixed(0);
    finalTotalElement.innerHTML = (total + 6200).toFixed(0);
}

function calculateTotalOrderPrice() {
    return [...document.querySelectorAll('.quantity')].reduce((total, input) => {
        let quantity = parseInt(input.value);
        let price = parseInt(input.getAttribute('data-price'));
        return total + quantity * price;
    }, 0);
}

createMenu();