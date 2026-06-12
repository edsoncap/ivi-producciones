document.addEventListener("DOMContentLoaded", () => {
    
    // 1. EFECTO DINÁMICO EN EL NAVBAR
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.background = '#000000';
            navbar.style.borderBottom = '1px solid rgba(212, 175, 55, 0.6)';
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.8)';
            navbar.style.padding = '8px 0';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.85)';
            navbar.style.borderBottom = '1px solid rgba(212, 175, 55, 0.15)';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '12px 0';
        }
    });

    // 2. MOTOR MÁQUINA DE ESCRIBIR DINÁMICA
    const palabras = ["recuerdos inolvidables.", "espectáculos VIP.", "experiencias mágicas."];
    let palabraIndex = 0;
    let letraIndex = 0;
    let borrando = false;
    const contenedorTexto = document.querySelector(".typewriter-text");

    function tipoEscritura() {
        const palabraActual = palabras[palabraIndex];
        if (borrando) {
            contenedorTexto.textContent = palabraActual.substring(0, letraIndex - 1);
            letraIndex--;
        } else {
            contenedorTexto.textContent = palabraActual.substring(0, letraIndex + 1);
            letraIndex++;
        }

        let velocidadTipeo = borrando ? 40 : 80;

        if (!borrando && letraIndex === palabraActual.length) {
            velocidadTipeo = 2000; 
            borrando = true;
        } else if (borrando && letraIndex === 0) {
            borrando = false;
            palabraIndex = (palabraIndex + 1) % palabras.length;
            velocidadTipeo = 500; 
        }
        setTimeout(tipoEscritura, velocidadTipeo);
    }

    if (contenedorTexto) {
        tipoEscritura();
    }

    // 3. EFECTO SCROLL REVELACIÓN (Corregido: añadimos observerOptions)
    const observerOptions = {
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    };

    const elementosAnimados = document.querySelectorAll('.service-card, .gallery-card, .video-wrapper, .testimonial-card, .booking-box, .contact-info-card, .contact-form-container');

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elementosAnimados.forEach(elemento => {
        elemento.classList.add('reveal-hidden');
        scrollObserver.observe(elemento);
    });

    // 4. INTERACTIVIDAD DEL FORMULARIO DE CONTACTO
    const formulario = document.querySelector('.contact-form-container form');
    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            const botonSubmit = formulario.querySelector('.btn-submit-form');
            const textoOriginal = botonSubmit.textContent;
            
            botonSubmit.textContent = "Procesando Solicitud VIP...";
            botonSubmit.style.background = '#25D366';
            botonSubmit.style.color = '#000000';
            
            setTimeout(() => {
                alert("¡Solicitud enviada con éxito! Un asesor de IVI Producciones se comunicará contigo muy pronto.");
                formulario.reset();
                botonSubmit.textContent = textoOriginal;
                botonSubmit.style.background = '#050505';
                botonSubmit.style.color = '#D4AF37';
            }, 1500);
        });
    }
});

const video = document.querySelector('.premium-video');

if(video){
    video.addEventListener('play', () => {
        video.style.transform = 'scale(1.02)';
        video.style.transition = '0.4s ease';
    });

    video.addEventListener('pause', () => {
        video.style.transform = 'scale(1)';
    });
}