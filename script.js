/**
 * ===================================================================
 * TECHVISION - LANDING PAGE
 * Script principal con todas las funcionalidades interactivas
 * ===================================================================
 */

// ==================== SMOOTH SCROLL NAVIGATION ====================
/**
 * Implementa scroll suave al hacer clic en enlaces internos
 * y cierra el menú móvil automáticamente
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                closeMenu();
            }
        });
    });
}

// ==================== NAVBAR STICKY EFFECT ====================
/**
 * Añade clase 'scrolled' a la navbar cuando se hace scroll
 * para cambiar su apariencia según la posición
 */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ==================== MOBILE MENU TOGGLE ====================
/**
 * Controla el menú hamburguesa en dispositivos móviles
 * Abre/cierra el menú y anima el icono
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

/**
 * Cierra el menú móvil
 */
function closeMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
}

// ==================== REVEAL ON SCROLL ====================
/**
 * Usa Intersection Observer para animar elementos cuando entran en viewport
 * Mejora el rendimiento comparado con event listeners normales
 */
function initRevealOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Aplica la animación "reveal" cuando el elemento es visible
                entry.target.style.animation = `reveal 0.8s ease-out forwards`;
                // Deja de observar después de animar para mejor rendimiento
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos que necesitan animación
    document.querySelectorAll('.service-card').forEach(el => observer.observe(el));
    document.querySelectorAll('.contact-container').forEach(el => observer.observe(el));
    document.querySelectorAll('.section-title').forEach(el => observer.observe(el));
}

// ==================== FORM VALIDATION & SUBMISSION ====================
/**
 * Valida y maneja el envío del formulario de contacto
 * Verifica que todos los campos estén completos y el email sea válido
 */
function initFormHandling() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = {
                nombre: formData.get('nombre'),
                email: formData.get('email'),
                mensaje: formData.get('mensaje')
            };

            // Validación: campos obligatorios
            if (!data.nombre || !data.email || !data.mensaje) {
                alert('Por favor, completa todos los campos');
                return;
            }

            // Validación: formato de email
            if (!isValidEmail(data.email)) {
                alert('Por favor, ingresa un email válido');
                return;
            }

            // Si todas las validaciones pasan
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
            form.reset();
        });
    }
}

/**
 * Valida que el email tenga un formato correcto
 * @param {string} email - Email a validar
 * @returns {boolean} - True si es válido, False si no
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ==================== PARALLAX EFFECT ====================
/**
 * Crea un efecto parallax en los elementos decorativos de fondo
 * Mueven los blobs según la posición del scroll
 */
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const blobs = document.querySelectorAll('.blob');
        const scrollPosition = window.scrollY;

        blobs.forEach((blob, index) => {
            // Cada blob se mueve a velocidad diferente
            const offset = scrollPosition * (0.5 + index * 0.1);
            blob.style.transform = `translateY(${offset}px)`;
        });
    });
}

// ==================== BUTTON RIPPLE EFFECT ====================
/**
 * Añade un efecto de ondas (ripple) al interactuar con botones
 * Crea círculos que se expanden y desaparecen al pasar el mouse
 */
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .form-submit, .nav-button');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            createRipple(e, button);
        });
    });

    /**
     * Crea el elemento ripple en la posición del mouse
     * @param {Event} e - Evento del mouse
     * @param {Element} button - Elemento del botón
     */
    function createRipple(e, button) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        ripple.style.animation = 'ripple-animation 0.6s ease-out';

        // Asegurar que el botón tenga estas propiedades
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        
        button.appendChild(ripple);

        // Eliminar el ripple después de la animación
        setTimeout(() => ripple.remove(), 600);
    }
}

// ==================== ADD RIPPLE ANIMATION TO STYLE ====================
/**
 * Inyecta la animación ripple-animation en el DOM
 * Este keyframe es necesario para que funcione el efecto ripple
 */
function injectRippleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ==================== INITIALIZE ALL FUNCTIONS ====================
/**
 * Punto de entrada: Ejecuta todas las funcionalidades
 * Se ejecuta cuando el DOM está completamente cargado
 */
function initApp() {
    // Verificar que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
        return;
    }

    // Inicializar todas las funcionalidades
    injectRippleAnimation();
    initSmoothScroll();
    initNavbarScroll();
    initMobileMenu();
    initRevealOnScroll();
    initFormHandling();
    initParallaxEffect();
    initRippleEffect();

    console.log('✅ TechVision App initialized successfully!');
}

// Ejecutar al cargar la página
initApp();
