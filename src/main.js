import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------------------------
    // Slider Logic
    // ----------------------------------------------------------------------
    const slider = document.getElementById('comparison-slider');
    const overlay = document.getElementById('slider-overlay');
    const handle = document.getElementById('slider-handle');
    const imgOverlay = document.getElementById('img-overlay');
    const labelCanarinho = document.getElementById('label-canarinho');
    const labelSinistro = document.getElementById('label-sinistro');

    const updateSlider = (e) => {
        if (!slider) return;
        const rect = slider.getBoundingClientRect();
        let x = 0;

        if (e.type.includes('mouse')) {
            x = e.pageX - rect.left - window.scrollX;
        } else if (e.type.includes('touch')) {
            x = e.touches[0].pageX - rect.left - window.scrollX;
        }

        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;

        const position = (x / rect.width) * 100;
        if (overlay) overlay.style.width = position + '%';
        if (handle) handle.style.left = position + '%';

        if (imgOverlay) imgOverlay.style.width = rect.width + 'px';

        // Hide labels when dragged to full view
        if (labelSinistro) {
            labelSinistro.style.opacity = position >= 98 ? '0' : '1';
        }
        if (labelCanarinho) {
            labelCanarinho.style.opacity = position <= 2 ? '0' : '1';
        }
    };

    if (slider) {
        const resizeOverlay = () => {
            const rect = slider.getBoundingClientRect();
            if (imgOverlay) imgOverlay.style.width = rect.width + 'px';
        };

        window.addEventListener('load', resizeOverlay);
        window.addEventListener('resize', resizeOverlay);
        slider.addEventListener('mousemove', updateSlider);
        slider.addEventListener('touchmove', updateSlider, { passive: true });
    }

    // ----------------------------------------------------------------------
    // E-commerce & Cart Logic
    // ----------------------------------------------------------------------
    let cart = [];

    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-drawer-overlay');
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const cartBadge = document.getElementById('cart-badge');
    const goToCheckoutBtn = document.getElementById('go-to-checkout-btn');

    const checkoutSection = document.getElementById('checkout');
    const checkoutItemsContainer = document.getElementById('checkout-items-container');
    const checkoutSubtotalEl = document.getElementById('checkout-subtotal');
    const checkoutTotalEl = document.getElementById('checkout-total');

    const formatPrice = (price) => `R$ ${price.toFixed(2).replace('.', ',')}`;

    const openDrawer = () => {
        if (!cartOverlay || !cartDrawer) return;
        cartOverlay.classList.remove('hidden');
        setTimeout(() => cartOverlay.classList.remove('opacity-0'), 10);
        cartDrawer.classList.remove('translate-x-full');
    };

    const closeDrawer = () => {
        if (!cartOverlay || !cartDrawer) return;
        cartDrawer.classList.add('translate-x-full');
        cartOverlay.classList.add('opacity-0');
        setTimeout(() => cartOverlay.classList.add('hidden'), 300);
    };

    if (openCartBtn) openCartBtn.addEventListener('click', openDrawer);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeDrawer);
    if (cartOverlay) cartOverlay.addEventListener('click', closeDrawer);

    const renderCart = () => {
        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-on-surface-variant text-center mt-10 font-bold uppercase tracking-widest text-xs">Seu carrinho está vazio.</p>';
            if (cartBadge) cartBadge.classList.add('hidden');
            if (goToCheckoutBtn) {
                goToCheckoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
            }
        } else {
            if (cartBadge) {
                cartBadge.classList.remove('hidden');
                cartBadge.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
            }
            if (goToCheckoutBtn) {
                goToCheckoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            }

            cart.forEach((item, index) => {
                subtotal += item.price * item.quantity;

                // Construct Size Radios
                const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
                const sizeRadios = sizes.map(s => `
                    <label class="cursor-pointer flex-1">
                        <input type="radio" name="size-${index}" value="${s}" class="peer sr-only" ${item.size === s ? 'checked' : ''} data-index="${index}">
                        <div class="py-2 text-center border border-on-background/10 bg-white font-black text-xs hover:border-on-background transition-colors peer-checked:border-primary peer-checked:bg-primary peer-checked:text-black">${s}</div>
                    </label>
                `).join('');

                const itemHTML = `
                    <div class="flex gap-4 p-5 bg-on-background/5 border border-on-background/10 rounded-xl relative group">
                        <button class="remove-item-btn absolute top-3 right-3 text-on-surface-variant hover:text-red-500 transition-colors" data-index="${index}">
                            <span class="material-symbols-outlined text-lg">delete</span>
                        </button>
                        <div class="w-24 h-28 bg-white p-2 rounded-lg flex items-center justify-center flex-shrink-0 border border-on-background/10">
                            <img src="${item.image}" class="w-full h-auto object-contain">
                        </div>
                        <div class="flex-1 filter drop-shadow-sm">
                            <span class="text-[8px] font-black uppercase tracking-widest text-secondary bg-on-background px-2 py-0.5 rounded-sm inline-block mb-1">${item.theme}</span>
                            <h4 class="font-black text-sm uppercase leading-tight mb-1 pr-6">${item.name}</h4>
                            <span class="text-on-background font-black text-base block mb-3">${formatPrice(item.price)}</span>
                            
                            <!-- Quantity -->
                            <div class="flex items-center gap-3 mb-4">
                                <span class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Qtd:</span>
                                <div class="flex items-center border border-on-background/20 bg-white rounded-md overflow-hidden">
                                    <button class="qty-btn px-3 py-1 text-on-surface-variant hover:bg-surface-variant transition-colors" data-index="${index}" data-delta="-1">-</button>
                                    <span class="text-xs font-black min-w-[24px] text-center">${item.quantity}</span>
                                    <button class="qty-btn px-3 py-1 text-on-surface-variant hover:bg-surface-variant transition-colors" data-index="${index}" data-delta="1">+</button>
                                </div>
                            </div>
                            
                            <!-- Size -->
                            <div class="mb-4">
                                <div class="flex items-center justify-between mb-2">
                                    <span class="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Tamanho</span>
                                </div>
                                <div class="flex gap-1 w-full">
                                    ${sizeRadios}
                                </div>
                            </div>

                            <!-- Personalization -->
                            <div class="pt-3 mt-3 border-t border-on-background/10">
                                <span class="text-[9px] font-black uppercase tracking-widest text-on-surface-variant block mb-2">Personalização (Opcional)</span>
                                <div class="flex gap-2">
                                    <input type="text" placeholder="NOME" class="pers-name w-2/3 border border-on-background/10 py-2 px-3 text-xs uppercase font-bold focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all rounded-md" maxlength="12" data-index="${index}" value="${item.customName}">
                                    <input type="text" placeholder="Nº" class="pers-number w-1/3 border border-on-background/10 py-2 px-3 text-xs font-bold text-center focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all rounded-md" maxlength="2" data-index="${index}" value="${item.customNumber}">
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
            });
        }

        if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(subtotal);
    };

    // Event Delegation for Cart Items
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (e) => {
            const qtyBtn = e.target.closest('.qty-btn');
            if (qtyBtn) {
                const index = parseInt(qtyBtn.getAttribute('data-index'));
                const delta = parseInt(qtyBtn.getAttribute('data-delta'));
                cart[index].quantity = Math.max(1, cart[index].quantity + delta);
                renderCart();
            }

            const removeBtn = e.target.closest('.remove-item-btn');
            if (removeBtn) {
                const index = parseInt(removeBtn.getAttribute('data-index'));
                cart.splice(index, 1);
                renderCart();
            }
        });

        cartItemsContainer.addEventListener('change', (e) => {
            if (e.target.name && e.target.name.startsWith('size-')) {
                const index = parseInt(e.target.getAttribute('data-index'));
                cart[index].size = e.target.value;
            }
        });

        cartItemsContainer.addEventListener('input', (e) => {
            if (e.target.classList.contains('pers-name')) {
                const index = parseInt(e.target.getAttribute('data-index'));
                cart[index].customName = e.target.value;
            }
            if (e.target.classList.contains('pers-number')) {
                const index = parseInt(e.target.getAttribute('data-index'));
                cart[index].customNumber = e.target.value.replace(/[^0-9]/g, '');
                e.target.value = cart[index].customNumber;
            }
        });
    }

    const renderCheckoutSummary = () => {
        if (cart.length === 0) return;

        let subtotal = 0;
        let totalQty = 0;
        cart.forEach((i) => {
            subtotal += i.price * i.quantity;
            totalQty += i.quantity;
        });

        const checkoutDynamicItems = document.getElementById('checkout-dynamic-items');
        if (checkoutDynamicItems) {
            checkoutDynamicItems.innerHTML = '';

            cart.forEach((item, index) => {
                const itemHTML = `
                <div class="mb-10 pb-10 border-b border-on-background/10 last:border-0 last:pb-0 last:mb-0">
                  <div class="flex gap-6 items-start mb-8">
                    <div class="w-24 md:w-32 bg-white p-2 flex-shrink-0">
                      <img alt="Kit Selection" class="w-full h-auto object-contain" src="${item.image}" />
                    </div>
                    <div class="flex-1">
                      <span class="text-[10px] font-black uppercase tracking-widest text-secondary">${item.theme}</span>
                      <h4 class="font-black text-lg md:text-xl uppercase leading-tight mb-2 font-headline">${item.name}</h4>
                      <p class="text-on-surface-variant text-xs md:text-sm font-bold uppercase tracking-widest">Tam: ${item.size} &nbsp;|&nbsp; Qtd: ${item.quantity}</p>
                      <span class="text-on-background font-black text-xl md:text-2xl block mt-4">${formatPrice(item.price * item.quantity)}</span>
                    </div>
                  </div>
      
                  <!-- Personalization Block -->
                  <div class="p-6 bg-white border border-dashed border-on-background/20 font-sans">
                    <h5 class="text-xs font-black uppercase tracking-widest mb-4 flex items-center justify-between">
                      Personalize seu Manto
                      <span class="text-[9px] font-bold text-on-surface-variant/60">OPCIONAL</span>
                    </h5>
                    <div class="grid grid-cols-3 gap-4">
                      <div class="col-span-2">
                        <label class="text-[9px] font-black text-on-surface-variant/70 mb-1 block">NOME (MÁX 12)</label>
                        <input class="w-full border-b border-on-background/20 py-2 px-4 text-xs uppercase font-black tracking-widest focus:border-primary outline-none transition-colors chk-pers-name" data-index="${index}" maxlength="12" placeholder="EX: NEYMAR JR" type="text" value="${item.customName || ''}" />
                      </div>
                      <div>
                        <label class="text-[9px] font-black text-on-surface-variant/70 mb-1 block">NÚMERO</label>
                        <input class="w-full border-b border-on-background/20 py-2 px-4 text-xs font-black text-center focus:border-primary outline-none transition-colors chk-pers-number" data-index="${index}" maxlength="2" placeholder="10" type="text" value="${item.customNumber || ''}" />
                      </div>
                    </div>
                  </div>
                </div>
                `;
                checkoutDynamicItems.insertAdjacentHTML('beforeend', itemHTML);
            });
        }

        const checkoutSubtotal = document.getElementById('checkout-subtotal');
        const checkoutTotal = document.getElementById('checkout-total');
        if (checkoutSubtotal) checkoutSubtotal.textContent = formatPrice(subtotal);
        if (checkoutTotal) checkoutTotal.textContent = formatPrice(subtotal);
    };

    // Bind Static Personalization globally if modified in checkout page
    const checkoutDynamicItems = document.getElementById('checkout-dynamic-items');
    if (checkoutDynamicItems) {
        checkoutDynamicItems.addEventListener('input', (e) => {
            if (e.target.classList.contains('chk-pers-name')) {
                const index = parseInt(e.target.dataset.index);
                cart[index].customName = e.target.value;
                renderCart();
            }
            if (e.target.classList.contains('chk-pers-number')) {
                const index = parseInt(e.target.dataset.index);
                let val = e.target.value.replace(/[^0-9]/g, '');
                e.target.value = val;
                cart[index].customNumber = val;
                renderCart();
            }
        });
    }

    if (goToCheckoutBtn) {
        goToCheckoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return;
            closeDrawer();
            if (checkoutSection) {
                checkoutSection.classList.remove('hidden');
                renderCheckoutSummary();
                setTimeout(() => {
                    checkoutSection.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }
        });
    }

    const addToCart = (product) => {
        cart.push({ ...product, quantity: 1, size: 'M', customName: '', customNumber: '' });
        renderCart();
        openDrawer();
    };

    // Handle standard Add to Cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const product = {
                name: btn.getAttribute('data-name'),
                price: parseFloat(btn.getAttribute('data-price')),
                image: btn.getAttribute('data-image'),
                theme: btn.getAttribute('data-theme')
            };
            addToCart(product);
        });
    });

    // Check for product in URL for cross-page checkout
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');

    // Centralized Product Map for Search and Checkout Redirects
    const productMap = {
        'tradic-jogador': {
            name: 'Uniforme I - Aero Fit (Jogador)',
            price: 190.00,
            theme: 'Tradição Canarinho',
            image: 'https://lh3.googleusercontent.com/aida/ADBb0ujb4279ZdQAcuuv1DZXOu3lXJPZCh3U3IQ4_CIo2VVJKFbS8HodGiMBonrNl-zs0NULpXQcOrU6_mTXaqfAIO6s231vprP8NUhXld2qbJO_EJnBuSSlMI1CHcwwtz5n1XnZrR7N2NHx9xx8nD9n7T92YinPsm_l_BhzCNT55bYCHBhUBLjtPGtRmPJM8AIer1jEfUH7s_TytmkPyaCoQtq3at1OlWqzEV3U3zA5LgROdo8oWLX-HNPbJNMTezG2EFVHbMzQ4dXFmgk',
            url: '/tradicao-canarinho.html'
        },
        'tradic-torcedor': {
            name: 'Uniforme I - Aero Fit (Torcedor)',
            price: 160.00,
            theme: 'Tradição Canarinho',
            image: 'https://lh3.googleusercontent.com/aida/ADBb0ujfFWtNXpvbEZAwGlLJSxvSWbudJHMxjObXFaGdxPlqp2VhOBYgyNqkthuAdVKpT5QtkBZUKPmb-zsSRSJbqgVYhpea5NANAL4gIAebhusUvDUj444TgvOC3VqzP-rf95NeuesHiMx_KT-M4ZteydLNj7zz-pdrTnzSBFcGUn_Bq6xdq2QKh_jD3l27-2n8KhDePfscwBoSLY5jIkKiNE0ORRpQnsjM-XZUe9Di20TEb7XDjTACMSsPfoR_FfQG0pmtf3E7ga6FKw',
            url: '/tradicao-canarinho.html'
        },
        'azul-jogador': {
            name: 'Uniforme II - Aero Fit (Jogador)',
            price: 210.00,
            theme: 'Azul Sinistro',
            image: 'https://lh3.googleusercontent.com/aida/ADBb0uh0Bg1Dwg47MLuKSqTYmsy2Gmciwp51UfvvakJ4DZ4lPZ2gtKYpumR0QCAGvpJPpJe2CM4PhCaK9DZAaWlXH2Z4vWcuDmGk6RuvO6DzEvm_F-rcUlDfNjVlIpmVPMnja1VJhcJlpoibtd-FOfVY-vdNCAkyT-mfq56TLn2vMvqTPE44p60jeWgtNLUw71WvBgJ4owISThsnJsMz9sS920j0ikACwHkp2l4Oibdldw-TtyZsuB5cxoS3DDa_E1TmGMc2Uy70Uqe_jw0',
            url: '/azul-sinistro.html'
        },
        'azul-torcedor': {
            name: 'Uniforme II - Aero Fit (Torcedor)',
            price: 170.00,
            theme: 'Azul Sinistro',
            image: 'https://lh3.googleusercontent.com/aida/ADBb0uh0Bg1Dwg47MLuKSqTYmsy2Gmciwp51UfvvakJ4DZ4lPZ2gtKYpumR0QCAGvpJPpJe2CM4PhCaK9DZAaWlXH2Z4vWcuDmGk6RuvO6DzEvm_F-rcUlDfNjVlIpmVPMnja1VJhcJlpoibtd-FOfVY-vdNCAkyT-mfq56TLn2vMvqTPE44p60jeWgtNLUw71WvBgJ4owISThsnJsMz9sS920j0ikACwHkp2l4Oibdldw-TtyZsuB5cxoS3DDa_E1TmGMc2Uy70Uqe_jw0',
            url: '/azul-sinistro.html'
        }
    };

    if (productId) {
        const prod = productMap[productId];
        if (prod) {
            addToCart(prod);
            // Clean URL so it doesn't re-add on refresh
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    // ----------------------------------------------------------------------
    // Mobile Menu Overlay Logic
    // ----------------------------------------------------------------------
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && closeMenuBtn && mobileMenuOverlay && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('hidden');
            void mobileMenuOverlay.offsetWidth; // trigger reflow
            mobileMenuOverlay.classList.remove('opacity-0');
            mobileMenu.classList.remove('translate-x-full');
        });

        const closeMobileMenu = () => {
            mobileMenuOverlay.classList.add('opacity-0');
            mobileMenu.classList.add('translate-x-full');
            setTimeout(() => {
                mobileMenuOverlay.classList.add('hidden');
            }, 300);
        };

        closeMenuBtn.addEventListener('click', closeMobileMenu);
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) closeMobileMenu();
        });
    }

    // ----------------------------------------------------------------------
    // Search Modal Logic
    // ----------------------------------------------------------------------
    const searchModalHTML = `
      <div id="search-modal" class="fixed inset-0 bg-white z-[60] hidden flex-col transition-all duration-300 opacity-0 font-sans">
        <div class="px-6 py-4 border-b border-surface-variant/20 flex items-center gap-4 bg-white shadow-sm z-10">
          <span class="material-symbols-outlined text-on-surface-variant text-2xl">search</span>
          <input type="text" id="search-input" class="flex-1 bg-transparent border-none outline-none text-xl md:text-2xl font-black uppercase tracking-tighter placeholder:text-on-surface-variant/40 text-on-background focus:ring-0" placeholder="Buscar camisas..." autocomplete="off">
          <button id="close-search-btn" class="outline-none text-gray-400 hover:text-red-500 transition-colors">
            <span class="material-symbols-outlined text-3xl">close</span>
          </button>
        </div>
        <div class="flex-1 overflow-y-auto p-6 bg-surface">
          <div class="max-w-4xl mx-auto">
            <h3 class="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/50 mb-6">Resultados</h3>
            <div id="search-results" class="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', searchModalHTML);

    const searchModal = document.getElementById('search-modal');
    const closeSearchBtn = document.getElementById('close-search-btn');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    const renderSearchResults = (query) => {
        searchResults.innerHTML = '';
        const lowerQuery = query.toLowerCase();
        const products = Object.values(productMap);

        const filtered = products.filter(p =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.theme.toLowerCase().includes(lowerQuery)
        );

        if (filtered.length === 0) {
            searchResults.innerHTML = '<p class="text-on-surface-variant font-bold text-sm">Nenhuma camisa encontrada.</p>';
            return;
        }

        filtered.forEach(p => {
            const el = `
                <a href="${p.url}" class="flex gap-4 p-4 bg-white rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] transition-all border border-surface-variant/20 items-center group cursor-pointer text-left">
                    <img src="${p.image}" alt="${p.name}" class="w-20 h-20 object-contain group-hover:scale-110 transition-transform duration-500" />
                    <div>
                        <span class="text-[9px] font-black uppercase tracking-widest text-on-surface-variant block mb-1">${p.theme}</span>
                        <h4 class="font-black text-[15px] uppercase leading-tight text-on-background">${p.name}</h4>
                        <span class="text-black font-black text-sm mt-1 block">R$ ${p.price.toFixed(2).replace('.', ',')}</span>
                    </div>
                </a>
            `;
            searchResults.insertAdjacentHTML('beforeend', el);
        });
    };

    const openSearch = () => {
        searchModal.classList.remove('hidden');
        void searchModal.offsetWidth;
        searchModal.classList.remove('opacity-0');
        searchInput.value = '';
        searchInput.focus();
        renderSearchResults('');
    };

    const closeSearch = () => {
        searchModal.classList.add('opacity-0');
        setTimeout(() => searchModal.classList.add('hidden'), 300);
    };

    const searchBtnsArray = document.querySelectorAll('#search-btn');
    searchBtnsArray.forEach(btn => btn.addEventListener('click', openSearch));

    if (closeSearchBtn) closeSearchBtn.addEventListener('click', closeSearch);

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderSearchResults(e.target.value);
        });
    }
});
