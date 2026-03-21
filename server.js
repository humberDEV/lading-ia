const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const EMAILS_FILE = path.join(__dirname, 'emails.txt');

// Configuración
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir los archivos estáticos de la landing page (HTML, CSS, JS)
app.use(express.static(__dirname));

// Endpoint para recibir correos
app.post('/api/waitlist', (req, res) => {
    const email = req.body.email;
    
    // Validación básica
    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Email inválido' });
    }

    const timestamp = new Date().toISOString();
    const entry = `${timestamp} - ${email}\n`;

    // Guardar el correo en emails.txt
    fs.appendFile(EMAILS_FILE, entry, (err) => {
        if (err) {
            console.error('Error al guardar el email:', err);
            return res.status(500).json({ error: 'Error interno guardando correo' });
        }
        console.log(`Nuevo correo registrado: ${email}`);
        res.status(200).json({ message: 'Suscrito con éxito' });
    });
});

app.listen(PORT, () => {
    console.log(`\n🚀 Servidor funcionando!`);
    console.log(`👉 Entra a: http://localhost:${PORT}`);
    console.log(`📁 Los correos se guardarán automáticamente en: emails.txt\n`);
});
