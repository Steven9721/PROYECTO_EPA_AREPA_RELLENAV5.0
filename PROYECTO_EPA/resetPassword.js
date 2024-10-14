// resetPassword.js
document.addEventListener('DOMContentLoaded', () => {
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    const resetMessage = document.getElementById('resetMessage');

    resetPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('resetEmail').value;

        try {
            const response = await fetch('/solicitar-reset', { // Cambia aquí el endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();
            if (response.ok) {
                resetMessage.textContent = 'Se ha enviado una nueva contraseña a tu correo electrónico.';
                resetMessage.style.color = 'green';
            } else {
                resetMessage.textContent = result.message || 'Error al enviar la nueva contraseña.';
                resetMessage.style.color = 'red';
            }
        } catch (error) {
            resetMessage.textContent = 'Error en la solicitud.';
            resetMessage.style.color = 'red';
        }
    });
});
