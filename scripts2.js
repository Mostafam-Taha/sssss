let stock = JSON.parse(localStorage.getItem('stock')) || {
    'product1': 20,
    'product2': 15,
    'product3': 8
};

let ratings = JSON.parse(localStorage.getItem('ratings')) || {
    'product1': 0,
    'product2': 0,
    'product3': 0
};

function updateStock() {
    for (let productId in stock) {
        document.getElementById(`stock-${productId}`).textContent = stock[productId];
    }
    localStorage.setItem('stock', JSON.stringify(stock));
}

function updateRatings() {
    for (let productId in ratings) {
        let stars = document.getElementById(`stars-${productId}`).children;
        for (let i = 0; i < stars.length; i++) {
            stars[i].classList.remove('active');
            if (i < ratings[productId]) {
                stars[i].classList.add('active');
            }
        }
    }
    localStorage.setItem('ratings', JSON.stringify(ratings));
}

function initializePage() {
    updateStock();
    updateRatings();
}

function addToCart(productId) {
    if (stock[productId] > 0) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        stock[productId]--;
        updateStock();
        alert('تم إضافة المنتج إلى السلة');
    } else {
        alert('المنتج غير متوفر');
    }
}

function rateProduct(productId, rating) {
    ratings[productId] = rating;
    updateRatings();
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.getElementById('cartContainer');
    let productCount = {};

    cart.forEach(productId => {
        if (productCount[productId]) {
            productCount[productId]++;
        } else {
            productCount[productId] = 1;
        }
    });

    for (let productId in productCount) {
        let productName, description, price, imageUrl;
        switch (productId) {
            case 'product1':
                productName = 'المنتج الأول';
                description = 'وصف المنتج الأول.';
                price = '$10';
                imageUrl = 'product1.jpg';
                break;
            case 'product2':
                productName = 'المنتج الثاني';
                description = 'وصف المنتج الثاني.';
                price = '$20';
                imageUrl = 'product2.jpg';
                break;
            case 'product3':
                productName = 'المنتج الثالث';
                description = 'وصف المنتج الثالث.';
                price = '$30';
                imageUrl = 'product3.jpg';
                break;
            default:
                productName = productId;
                description = '';
                price = '';
                imageUrl = '';
        }
        let productHTML = `
            <div class="product">
                <img src="${imageUrl}" alt="${productName}" class="product-image">
                <h2>${productName}</h2>
                <p class="description">${description}</p>
                <p class="price">${price}</p>
                <p class="stock">متبقي: ${stock[productId]}</p>
                <p>عدد الطلبات: ${productCount[productId]}</p>
                <button class="remove-one" onclick="removeOneFromCart('${productId}')">حذف واحدة</button>
                <button class="remove-all" onclick="removeAllFromCart('${productId}')">إلغاء الطلب</button>
            </div>
        `;
        cartContainer.innerHTML += productHTML;
    }
}

function removeOneFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let index = cart.indexOf(productId);
    if (index > -1) {
        cart.splice(index, 1);
        stock[productId]++;
        updateStock();
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

function removeAllFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let count = cart.filter(id => id === productId).length;
    cart = cart.filter(id => id !== productId);
    stock[productId] += count;
    updateStock();
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

function loadCartForContact() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartContainer = document.getElementById('cartContainer');
    let cartDetails = document.getElementById('cartDetails');
    let productCount = {};

    cart.forEach(productId => {
        if (productCount[productId]) {
            productCount[productId]++;
        } else {
            productCount[productId] = 1;
        }
    });

    let cartSummary = '';

    for (let productId in productCount) {
        let productName, description, price, imageUrl;
        switch (productId) {
            case 'product1':
                productName = 'المنتج الأول';
                description = 'وصف المنتج الأول.';
                price = '$10';
                imageUrl = 'product1.jpg';
                break;
            case 'product2':
                productName = 'المنتج الثاني';
                description = 'وصف المنتج الثاني.';
                price = '$20';
                imageUrl = 'product2.jpg';
                break;
            case 'product3':
                productName = 'المنتج الثالث';
                description = 'وصف المنتج الثالث.';
                price = '$30';
                imageUrl = 'product3.jpg';
                break;
            default:
                productName = productId;
                description = '';
                price = '';
                imageUrl = '';
        }
        let productHTML = `
            <div class="product">
                <img src="${imageUrl}" alt="${productName}" class="product-image">
                <h2>${productName}</h2>
                <p class="description">${description}</p>
                <p class="price">${price}</p>
                <p class="stock">متبقي: ${stock[productId]}</p>
                <p>عدد الطلبات: ${productCount[productId]}</p>
            </div>
        `;
        cartContainer.innerHTML += productHTML;
        cartSummary += `${productName}: ${productCount[productId]} مرات\n`;
    }

    cartDetails.value = cartSummary;
}

function submitForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const cartDetails = document.getElementById('cartDetails').value;

    const message = `الاسم: ${name}\nالبريد الإلكتروني: ${email}\nالعنوان: ${address}\nالاختيارات:\n${cartDetails}`;

    alert(message); // عرض الرسالة للتأكيد (يمكن استبدالها بإرسال بريد إلكتروني)

    // حساب مدة التسليم
    let deliveryDays = address.includes('مركز') ? 3 : 8;
    let deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + deliveryDays);
    showCountdown(deliveryDate);

    // إرسال رسالة لصاحب المنتج
    sendEmail(message);
}

function sendEmail(message) {
    fetch('http://localhost:3000/api/sendMessage', {  // تأكد من أن الرابط يشير إلى خادمك المحلي
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    })
    .then(response => response.json())
    .then(data => {
        alert('تم إرسال طلبك. سنتواصل معك قريبًا.');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function showCountdown(deliveryDate) {
    let countdownContainer = document.createElement('div');
    countdownContainer.id = 'countdown';
    document.body.appendChild(countdownContainer);

    let interval = setInterval(() => {
        let now = new Date().getTime();
        let distance = deliveryDate - now;

        if (distance < 0) {
            clearInterval(interval);
            countdownContainer.innerHTML = "الطلب وصل!";
            return;
        }

        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownContainer.innerHTML = `
            <img src="contact.jpg" alt="تواصل" class="contact-image">
            <p>الوقت المتبقي لتسليم الطلب:</p>
            <p>${days} يوم ${hours} ساعة ${minutes} دقيقة ${seconds} ثانية</p>
        `;
    }, 1000);
}
