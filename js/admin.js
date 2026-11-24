/* ============================================================
   Painel Administrativo Oculto — CRUD de mensagens
   Acesso: clique no "•" no rodapé → modal pede senha
   Senha padrão: admin123
   ============================================================ */

   const ADMIN_PASSWORD = "admin123"; // ⚠️ troque se desejar

   document.addEventListener("DOMContentLoaded", () => {
       // Gatilho oculto no rodapé
       const trigger = document.getElementById("adminTrigger");
       const modalEl = document.getElementById("adminModal");
       const modal   = new bootstrap.Modal(modalEl);
   
       trigger.addEventListener("click", () => {
           document.getElementById("adminLogin").classList.remove("d-none");
           document.getElementById("adminPanel").classList.add("d-none");
           document.getElementById("adminPass").value = "";
           document.getElementById("loginFeedback").textContent = "";
           modal.show();
       });
   
       // Login
       document.getElementById("btnLogin").addEventListener("click", () => {
           const pass = document.getElementById("adminPass").value;
           if (pass === ADMIN_PASSWORD) {
               document.getElementById("adminLogin").classList.add("d-none");
               document.getElementById("adminPanel").classList.remove("d-none");
               renderTabela();
           } else {
               document.getElementById("loginFeedback").textContent = "Senha incorreta.";
           }
       });
   
       // Resetar dados (re-seed)
       document.getElementById("btnReset").addEventListener("click", () => {
           if (confirm("Isso apagará todas as mensagens e recriará os 20 registros de teste. Continuar?")) {
               localStorage.removeItem(STORAGE_KEY);
               seedMensagens();
               renderTabela();
           }
       });
   
       // Formulário CRUD (criar / editar)
       document.getElementById("formAdmin").addEventListener("submit", (e) => {
           e.preventDefault();
           const id       = document.getElementById("editId").value;
           const nome     = document.getElementById("admNome").value.trim();
           const email    = document.getElementById("admEmail").value.trim();
           const mensagem = document.getElementById("admMsg").value.trim();
   
           if (!nome || !email || !mensagem) return;
   
           if (id) {
               updateMensagem(Number(id), { nome, email, mensagem });
           } else {
               addMensagem({ nome, email, mensagem });
           }
           resetFormAdmin();
           renderTabela();
       });
   
       document.getElementById("btnCancelEdit").addEventListener("click", resetFormAdmin);
   });
   
   /** Renderiza a tabela de mensagens */
   function renderTabela() {
       const tbody = document.getElementById("tabelaMensagens");
       const lista = getMensagens();
       tbody.innerHTML = "";
   
       if (lista.length === 0) {
           tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted">Nenhuma mensagem cadastrada.</td></tr>`;
           return;
       }
   
       lista.forEach((m, i) => {
           const tr = document.createElement("tr");
           tr.innerHTML = `
               <td>${i + 1}</td>
               <td>${escapeHtml(m.nome)}</td>
               <td>${escapeHtml(m.email)}</td>
               <td class="text-truncate" style="max-width:260px;">${escapeHtml(m.mensagem)}</td>
               <td>${new Date(m.data).toLocaleString("pt-BR")}</td>
               <td class="text-nowrap">
                   <button class="btn btn-sm btn-outline-primary me-1" data-action="edit" data-id="${m.id}">
                       <i class="bi bi-pencil"></i>
                   </button>
                   <button class="btn btn-sm btn-outline-danger" data-action="del" data-id="${m.id}">
                       <i class="bi bi-trash"></i>
                   </button>
               </td>
           `;
           tbody.appendChild(tr);
       });
   
       // Event delegation para editar/excluir
       tbody.querySelectorAll("button[data-action]").forEach(btn => {
           btn.addEventListener("click", () => {
               const id = Number(btn.dataset.id);
               if (btn.dataset.action === "edit") {
                   preencherFormAdmin(id);
               } else {
                   if (confirm("Excluir esta mensagem?")) {
                       deleteMensagem(id);
                       renderTabela();
                   }
               }
           });
       });
   }
   
   function preencherFormAdmin(id) {
       const m = getMensagemById(id);
       if (!m) return;
       document.getElementById("editId").value   = m.id;
       document.getElementById("admNome").value   = m.nome;
       document.getElementById("admEmail").value  = m.email;
       document.getElementById("admMsg").value    = m.mensagem;
       document.getElementById("formTitle").textContent = "Editar mensagem #" + m.id;
   }
   
   function resetFormAdmin() {
       document.getElementById("editId").value = "";
       document.getElementById("formAdmin").reset();
       document.getElementById("formTitle").textContent = "Adicionar mensagem";
   }
   
   function escapeHtml(str) {
       return String(str)
           .replace(/&/g, "&amp;")
           .replace(/</g, "&lt;")
           .replace(/>/g, "&gt;")
           .replace(/"/g, "&quot;")
           .replace(/'/g, "&#039;");
   }1