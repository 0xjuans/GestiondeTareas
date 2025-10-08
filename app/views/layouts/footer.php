<!-- Banner inferior (footer) reutilizable para todas las vistas -->
<footer class="main-footer">
    <div class="footer-content">
        <div class="footer-left">
            <img src="/public/assets/images/Logo_colegio.webp" alt="Logo San Francisco de Asís" style="height:32px; margin-right:10px; border-radius:6px; background:#fff;" />
            <span>© 2025 Gestión de Tareas | Universidad</span>
        </div>
        <div class="footer-right">
            <span>Desarrollado Grupo 4</span>
        </div>
    </div>
</footer>
<style>
/* Footer adaptado para layouts con sidebar */
.main-footer {
    width: 100%;
    background: #2c3e50;
    color: #ecf0f1;
    position: relative;
    font-family: 'Segoe UI', Arial, sans-serif;
    box-shadow: 0 -2px 8px rgba(44,62,80,0.08);
    margin-top: 40px;
}
.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 30px;
    max-width: 100%;
    font-size: 15px;
}
.footer-left, .footer-center, .footer-right {
    display: flex;
    align-items: center;
}
.footer-center a {
    color: #ecf0f1;
    text-decoration: none;
    margin: 0 6px;
    transition: color 0.2s;
}
.footer-center a:hover {
    color: #1abc9c;
}
@media (max-width: 600px) {
    .footer-content {
        flex-direction: column;
        text-align: center;
        padding: 12px 8px;
    }
    .footer-left, .footer-center, .footer-right {
        margin: 4px 0;
    }
}
</style>
