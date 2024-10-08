var swiper1 = new Swiper(".mySwiper-1", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});

var swiper2 = new Swiper(".mySwiper-2", {
    slidesPerView: 3,
    spaceBetween: 20,
    loop: true,
    loopFillGroupWithBlank: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        }
    }
});

let tabInputs = document.querySelectorAll(".tabInput");

tabInputs.forEach(function(input) {
    input.addEventListener('change', function() {
        let id = input.ariaValueMax;
        let thisSwiper = document.getElementById('swiper' + id);
        thisSwiper.swiper.update();
    });
});




// FUNCIONES DEL MODAL DE ENTREGA
function openDeliveryModal() {
    const deliveryModal = document.getElementById('delivery-modal');
    deliveryModal.style.display = 'flex'; // Mostrar modal
    deliveryModal.classList.add('modal--visible');
    deliveryModal.classList.remove('modal--hidden'); // Asegúrate de que el modal no tenga la clase hidden
}

function closeDeliveryModal() {
    const deliveryModal = document.getElementById('delivery-modal');
    deliveryModal.classList.add('modal--hidden');
    setTimeout(() => {
        deliveryModal.style.display = 'none';
        deliveryModal.classList.remove('modal--hidden', 'modal--visible');
    }, 600); // Duración de la transición
}

// Event listeners para abrir/cerrar modal
document.getElementById('open-modal').addEventListener('click', openDeliveryModal);
document.getElementById('close-delivery-modal').addEventListener('click', closeDeliveryModal);

// Cerrar el modal al hacer clic fuera de él
window.addEventListener('click', function(event) {
    const deliveryModal = document.getElementById('delivery-modal');
    if (event.target === deliveryModal) {
        closeDeliveryModal();
    }
});

// FUNCIONES DEL MODAL DE ENTREGA
function openDeliveryModal() {
    const deliveryModal = document.getElementById('delivery-modal');
    deliveryModal.style.display = 'flex'; // Mostrar modal
    deliveryModal.classList.add('modal--visible');
    deliveryModal.classList.remove('modal--hidden'); // Asegúrate de que el modal no tenga la clase hidden
}

function closeDeliveryModal() {
    const deliveryModal = document.getElementById('delivery-modal');
    deliveryModal.classList.add('modal--hidden');
    setTimeout(() => {
        deliveryModal.style.display = 'none';
        deliveryModal.classList.remove('modal--hidden', 'modal--visible');
    }, 600); // Duración de la transición
}

// Event listeners para abrir/cerrar modal
document.getElementById('open-modal').addEventListener('click', openDeliveryModal);
document.getElementById('close-delivery-modal').addEventListener('click', closeDeliveryModal);

// Cerrar el modal al hacer clic fuera de él
window.addEventListener('click', function(event) {
    const deliveryModal = document.getElementById('delivery-modal');
    if (event.target === deliveryModal) {
        closeDeliveryModal();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const homeDeliveryBtn = document.getElementById('home-delivery-btn');
    const pickUpBtn = document.getElementById('pick-up-btn');
    const confirmBtn = document.getElementById('confirm-btn');
    const addressSection = document.getElementById('address-section');
    const phoneSection = document.getElementById('phone-section');
    const commentsSection = document.getElementById('comments-section');
    const addressInput = document.getElementById('address');
    const addressError = document.getElementById('address-error');
    const backupPhoneInput = document.getElementById('backup-phone');
    const pickUpSection = document.getElementById('pick-up-section');
    const pickUpOptions = document.querySelectorAll('input[name="location"]');

    // Función para manejar selección entre "Domicilio" y "Recoger"
    function handleSelection(selectedButton) {
        homeDeliveryBtn.classList.remove('selected');
        pickUpBtn.classList.remove('selected');
        selectedButton.classList.add('selected');

        if (selectedButton === homeDeliveryBtn) {
            addressSection.classList.remove('hidden');
            phoneSection.classList.remove('hidden');
            commentsSection.classList.remove('hidden');
            pickUpSection.classList.add('hidden');
            validateFields();
        } else {
            addressSection.classList.add('hidden');
            phoneSection.classList.add('hidden');
            commentsSection.classList.remove('hidden');
            pickUpSection.classList.remove('hidden');
            confirmBtn.disabled = true;
        }
    }

    // Validación de la dirección (Bogotá)
    function validateAddress() {
        const address = addressInput.value.trim();
        const bogotaAddressPattern = /(calle|carrera|transversal|diagonal|av|avenida|cll|cra|cr|#)\s*\d{1,4}(-\d{1,4})?/i;
        return bogotaAddressPattern.test(address);
    }

    // Validación del número de respaldo (no debe ser 1234567 o 1234567890)
    function validateBackupPhone() {
        const backupPhone = backupPhoneInput.value.trim();
        return (/^\d{7}$|^\d{10}$/.test(backupPhone)) && backupPhone !== "1234567" && backupPhone !== "1234567890"; // Acepta 7 o 10 dígitos, y no permite 1234567 ni 1234567890
    }

    // Validación del número principal (no debe ser 1234567890)
    function validatePrimaryPhone() {
        const phoneInput = document.getElementById('phone');
        const phoneValue = phoneInput.value.trim();
        return /^\d{10}$/.test(phoneValue) && phoneValue !== "1234567890"; // No permite 1234567890
    }

    // Validación general de los campos
    function validateFields() {
        const isAddressValid = validateAddress();
        const isBackupPhoneValid = validateBackupPhone();
        const isPrimaryPhoneValid = validatePrimaryPhone();
        confirmBtn.disabled = !(isAddressValid && isPrimaryPhoneValid && isBackupPhoneValid);
    }

    // Event listeners para seleccionar opciones
    homeDeliveryBtn.addEventListener('click', () => handleSelection(homeDeliveryBtn));
    pickUpBtn.addEventListener('click', () => handleSelection(pickUpBtn));

    // Validar y habilitar/deshabilitar el botón de confirmar según selección de "Recoger"
    pickUpOptions.forEach(option => {
        option.addEventListener('change', () => {
            confirmBtn.disabled = ![...pickUpOptions].some(opt => opt.checked);
        });
    });

    // Validar y habilitar botón de confirmar al hacer clic
    confirmBtn.addEventListener('click', () => {
        if (homeDeliveryBtn.classList.contains('selected')) {
            if (validateAddress() && validateBackupPhone()) {
                window.location.href = 'carrito.html';  // Redirigir al carrito si es válido
            } else {
                addressError.classList.toggle('hidden', validateAddress());
            }
        } else if (pickUpBtn.classList.contains('selected')) {
            window.location.href = 'carrito.html';
        }
    });

    // Validación de teléfonos al ingresar
    const phoneInput = document.getElementById('phone');
    const errorMessagePhone = phoneInput.nextElementSibling;
    const errorMessageBackupPhone = backupPhoneInput.nextElementSibling;

    function validatePhone(input, errorMessage) {
        const value = input.value;
        const isValid = /^\d{10}$/.test(value) && value !== "1234567890"; // No permite 1234567890
        errorMessage.classList.toggle('hidden', isValid);
        return isValid;
    }

    function checkAllInputs() {
        const isPhoneValid = validatePhone(phoneInput, errorMessagePhone);
        const isBackupPhoneValid = validateBackupPhone();
        confirmBtn.disabled = !(isPhoneValid && isBackupPhoneValid);
    }

    phoneInput.addEventListener('input', () => {
        phoneInput.value = phoneInput.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
        checkAllInputs();
    });

    backupPhoneInput.addEventListener('input', () => {
        backupPhoneInput.value = backupPhoneInput.value.replace(/\D/g, ''); // Eliminar caracteres no numéricos
        checkAllInputs();
    });
});










// Función para añadir un producto al carrito

function addToCart(productId) {
    // Obtener el carrito del localStorage o inicializarlo como un array vacío
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Añadir el producto al carrito
    cart.push(productId);

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem('cart', JSON.stringify(cart));


}
