/*
========================================
    JAVASCRIPT BÁSICO Y FUNCIONALIDADES
========================================
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SCROLL SUAVE ENTRE SECCIONES (Funcionalidad: Scroll suave)
    document.querySelectorAll('.smooth-scroll').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Verifica que el target exista antes de hacer scroll
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


    // 2. VALIDACIÓN DE FORMULARIO DE CONTACTO (Funcionalidad: Validación de email)
    const contactForm = document.getElementById('contactForm');
    const emailInput = document.getElementById('email');
    const nombreInput = document.getElementById('nombre');
    const mensajeInput = document.getElementById('mensaje');
    // Inicialización de la Modal de Bootstrap
    const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
    
    // Función de Validación de Email
    const validateEmail = (email) => {
        // Expresión regular para un email básico y seguro
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }

    // Event Listener para validación en tiempo real del email
    emailInput.addEventListener('input', () => {
        if (validateEmail(emailInput.value)) {
            emailInput.classList.remove('is-invalid');
            emailInput.classList.add('is-valid');
        } else {
            emailInput.classList.remove('is-valid');
            emailInput.classList.add('is-invalid');
        }
    });

    // Manejo del envío del formulario (Simulacro de Envío)
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita el envío estándar

        let formIsValid = true;

        // Validación de campos requeridos y Email (se mantiene la lógica de is-invalid)
        if (!nombreInput.value.trim()) {
            nombreInput.classList.add('is-invalid');
            formIsValid = false;
        } else {
            nombreInput.classList.remove('is-invalid');
            nombreInput.classList.add('is-valid');
        }

        if (!validateEmail(emailInput.value)) {
            emailInput.classList.add('is-invalid');
            formIsValid = false;
        } // Si ya tiene is-valid por el input event, no lo tocamos a menos que falle.

        if (!mensajeInput.value.trim()) {
            mensajeInput.classList.add('is-invalid');
            formIsValid = false;
        } else {
             mensajeInput.classList.remove('is-invalid');
             mensajeInput.classList.add('is-valid');
        }


        if (formIsValid) {
            // 3. Ventana Modal Confirmacion Simulacro de Envio de Correo
            
            // Llenar placeholders de la modal
            document.getElementById('modal-nombre-placeholder').textContent = nombreInput.value.split(' ')[0] || "Estimado/a";
            document.getElementById('modal-email-placeholder').textContent = emailInput.value;

            // Abrir la ventana modal
            confirmModal.show();

            // Simular el intento de apertura de la aplicación de correo (mailto)
            setTimeout(() => {
                // Construye el cuerpo del correo con los datos del formulario
                const formData = `Nombre: ${nombreInput.value}\nEmail: ${emailInput.value}\nMensaje: ${mensajeInput.value}`;
                const mailtoLink = document.createElement('a');
                mailtoLink.href = `mailto:info@horizontesdeigualdad.do?subject=Solicitud%20de%20Contacto%20Web%20de%20${encodeURIComponent(nombreInput.value)}&body=${encodeURIComponent(formData)}`;
                mailtoLink.style.display = 'none';
                document.body.appendChild(mailtoLink);
                mailtoLink.click();
                document.body.removeChild(mailtoLink);
                
                // Limpiar el formulario y clases de validación
                contactForm.reset();
                emailInput.classList.remove('is-valid', 'is-invalid');
                nombreInput.classList.remove('is-valid', 'is-invalid');
                mensajeInput.classList.remove('is-valid', 'is-invalid');

            }, 500); // 500ms de espera
        }
    });
});