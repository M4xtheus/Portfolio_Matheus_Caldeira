/* ============================================================
   Camada de persistência — LocalStorage
   Estrutura: array de objetos JSON em "mensagens"
   ============================================================ */

   const STORAGE_KEY = "mensagens";

   /** Retorna todas as mensagens do LocalStorage */
   function getMensagens() {
       const raw = localStorage.getItem(STORAGE_KEY);
       return raw ? JSON.parse(raw) : [];
   }
   
   /** Persiste o array no LocalStorage */
   function setMensagens(lista) {
       localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
   }
   
   /** Adiciona nova mensagem (Create) */
   function addMensagem(msg) {
       const lista = getMensagens();
       msg.id = Date.now() + Math.floor(Math.random() * 1000);
       msg.data = new Date().toISOString();
       lista.push(msg);
       setMensagens(lista);
       return msg;
   }
   
   /** Atualiza mensagem existente (Update) */
   function updateMensagem(id, dados) {
       const lista = getMensagens();
       const idx = lista.findIndex(m => m.id === id);
       if (idx === -1) return false;
       lista[idx] = { ...lista[idx], ...dados };
       setMensagens(lista);
       return true;
   }
   
   /** Remove mensagem (Delete) */
   function deleteMensagem(id) {
       const lista = getMensagens().filter(m => m.id !== id);
       setMensagens(lista);
   }
   
   /** Busca por id (Read) */
   function getMensagemById(id) {
       return getMensagens().find(m => m.id === id);
   }
   
   /** Seed inicial de 20 registros de teste */
   function seedMensagens() {
       const lista = [];
       const nomes = ["Ana","Bruno","Carla","Diego","Eduarda","Felipe","Gabriela","Henrique","Isabela","João",
                      "Karina","Lucas","Mariana","Nathan","Olívia","Pedro","Queren","Rafael","Sofia","Thiago"];
       const dominios = ["gmail.com","outlook.com","yahoo.com","hotmail.com"];
       for (let i = 0; i < 20; i++) {
           lista.push({
               id: Date.now() + i,
               nome: nomes[i],
               email: `${nomes[i].toLowerCase()}@${dominios[i % dominios.length]}`,
               mensagem: `Mensagem de teste número ${i + 1} gerada automaticamente.`,
               data: new Date(Date.now() - i * 3600000).toISOString()
           });
       }
       setMensagens(lista);
   }
   
   /** Inicializa o storage apenas se estiver vazio */
   function initStorage() {
       if (localStorage.getItem(STORAGE_KEY) === null) {
           seedMensagens();
       }
   }
   
   initStorage();