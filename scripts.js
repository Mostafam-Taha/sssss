function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('تم إضافة المنتج إلى السلة');
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
        let product = document.createElement('div');
        let productName, description, price, stock, imageUrl;
        switch (productId) {
            case 'product1':
                productName = 'المنتج الأول';
                description = 'وصف المنتج الأول.';
                price = '$10';
                stock = '20';
                imageUrl = 'product1.jpg';
                break;
            case 'product2':
                productName = 'المنتج الثاني';
                description = 'وصف المنتج الثاني.';
                price = '$20';
                stock = '15';
                imageUrl = 'product2.jpg';
                break;
            case 'product3':
                productName = 'المنتج الثالث';
                description = 'وصف المنتج الثالث.';
                price = '$30';
                stock = '8';
                imageUrl = 'product3.jpg';
                break;
            default:
                productName = productId;
                description = '';
                price = '';
                stock = '';
                imageUrl = '';
        }
        product.innerHTML = `
            <img src="${imageUrl}" alt="${productName}" class="product-image">
            <h2>${productName}</h2>
            <p class="description">${description}</p>
            <p class="price">${price}</p>
            <p class="stock">متبقي: ${stock}</p>
            <p>عدد الطلبات: ${productCount[productId]}</p>
            <button onclick="removeOneFromCart('${productId}')">حذف واحدة</button>
            <button onclick="removeAllFromCart('${productId}')">إلغاء الطلب</button>
        `;
        cartContainer.appendChild(product);
    }
}

function removeOneFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let index = cart.indexOf(productId);
    if (index > -1) {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

function removeAllFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(id => id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

function submitForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const cartDetails = document.getElementById('cartDetails').value;

    const message = `الاسم: ${name}\nالبريد الإلكتروني: ${email}\nالعنوان: ${address}\nالاختيارات: ${cartDetails}`;
    alert(message); // عرض الرسالة للتأكيد (يمكن استبدالها بإرسال بريد إلكتروني)

    // حساب مدة التسليم
    if (address.includes('مركزالعياط')) {
        alert('سيصلك المنتج في غضون 3 أيام');
    } else {
        alert('سيصلك المنتج بعد 8 أيام');
    }

    // إرسال رسالة لصاحب المنتج
    sendEmail(message);
}

function sendEmail(message) {
    fetch('https://www.instagram.com/direct/inbox', {  // استبدل بالرابط الفعلي للخادم الخاص بك
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


// 

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
        let productName, description, price, stock, imageUrl;
        switch (productId) {
            case 'product1':
                productName = 'المنتج الأول';
                description = 'وصف المنتج الأول.';
                price = '$10';
                stock = '20';
                imageUrl = 'product1.jpg';
                break;
            case 'product2':
                productName = 'المنتج الثاني';
                description = 'وصف المنتج الثاني.';
                price = '$20';
                stock = '15';
                imageUrl = 'product2.jpg';
                break;
            case 'product3':
                productName = 'المنتج الثالث';
                description = 'وصف المنتج الثالث.';
                price = '$30';
                stock = '8';
                imageUrl = 'product3.jpg';
                break;
            default:
                productName = productId;
                description = '';
                price = '';
                stock = '';
                imageUrl = '';
        }
        let productHTML = `
            <div class="product">
                <img src="${imageUrl}" alt="${productName}" class="product-image">
                <h2>${productName}</h2>
                <p class="description">${description}</p>
                <p class="price">${price}</p>
                <p class="stock">متبقي: ${stock}</p>
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
    if (address.includes('مركز')) {
        alert('سيصلك المنتج في غضون 3 أيام');
    } else {
        alert('سيصلك المنتج بعد 8 أيام');
    }

    // إرسال رسالة لصاحب المنتج
    sendEmail(message);
}

function sendEmail(message) {
    // قم بتبديل الرابط الموجود أدناه برابط فعلي لخادم البريد الإلكتروني الخاص بك
    fetch('https://mail.google.com/mail/u/0/#inbox', {  
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    })
    .then(response => response.json())
    .then(data => {
        alert('تم إرسال طلبك. سنتواصل معك قريبًا.');
        alert('تم إرسال طلبك. سنتواصل معك قريبًا.');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
