// === EMAILJS CONFIG ===
emailjs.init("SEU_PUBLIC_KEY_AQUI"); // substitua pela sua public key

// === FORM CONTATO ===
const form = document.getElementById("contactForm");
const msgEl = document.getElementById("formMsg");

form.addEventListener("submit", async(e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
        msgEl.textContent = "⚠️ Preencha todos os campos.";
        msgEl.style.color = "#dc2626";
        return;
    }

    msgEl.textContent = "Enviando...";
    msgEl.style.color = "#2563eb";

    try {
        await emailjs.send("service_id", "template_id", { from_name: name, reply_to: email, message });
        msgEl.textContent = "✅ Mensagem enviada com sucesso!";
        msgEl.style.color = "#16a34a";
        form.reset();
    } catch {
        msgEl.textContent = "❌ Erro ao enviar mensagem.";
        msgEl.style.color = "#dc2626";
    }
});

// === DARK MODE ===
const toggle = document.getElementById("themeToggle");

function setTheme(dark) {
    if (dark) {
        document.body.classList.add("dark");
        toggle.textContent = "🔆";
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark");
        toggle.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
}
toggle.onclick = () => setTheme(!document.body.classList.contains("dark"));
window.onload = () => {
    const pref = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(pref === "dark");
};