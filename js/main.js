/* ============================================================
   Formulário público de contato
   - Validação Bootstrap
   - Salva no LocalStorage
   - Dispara notificação real via FormSubmit (ou EmailJS)
   ============================================================ */

// 🔧 CONFIGURAÇÃO DE AUTOMAÇÃO
// Opção 1 (mais simples): FormSubmit.co — basta trocar o e-mail abaixo.
// Na primeira submissão, o FormSubmit envia um e-mail de confirmação;
// após confirmar, todas as mensagens chegam no seu e-mail.
const AUTOMATION_CONFIG = {
    endpoint: "https://api.web3forms.com/submit",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formContato");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.classList.add("was-validated");
            return;
        }

        const nome     = form.nome.value.trim();
        const email    = form.email.value.trim();
        const mensagem = form.mensagem.value.trim();

        const btn     = document.getElementById("btnEnviar");
        const spinner = document.getElementById("spinner");
        const feedback = document.getElementById("feedback");

        btn.disabled = true;
        spinner.classList.remove("d-none");
        feedback.innerHTML = "";

        // 1) Salva localmente (sempre, independente do resultado da API)
        addMensagem({ nome, email, mensagem });

                // 2) Dispara automação (notificação real)
                let sucesso = false;
                try {
                    const resp = await fetch(AUTOMATION_CONFIG.endpoint, {
                        method: AUTOMATION_CONFIG.method,
                        headers: AUTOMATION_CONFIG.headers,
                        body: JSON.stringify({
                            access_key: "0fca1ce5-4ce6-4a88-905b-07ae9a369ebb", // <-- SUA CHAVE AQUI
                            name: nome,
                            email: email,
                            message: mensagem,
                            subject: `Novo contato do portfólio — ${nome}` // O Web3Forms usa "subject" em vez de "_subject"
                        })
                    });
                    sucesso = resp.ok;
                } catch (err) {
                    console.warn("Falha na automação:", err);
                }

        spinner.classList.add("d-none");
        btn.disabled = false;
        form.reset();
        form.classList.remove("was-validated");

        feedback.innerHTML = sucesso
            ? `<div class="alert alert-success mb-0">Mensagem salva e notificação enviada com sucesso!</div>`
            : `<div class="alert alert-warning mb-0">Mensagem salva localmente, mas a notificação externa falhou. Verifique a configuração do endpoint.</div>`;
    });
});