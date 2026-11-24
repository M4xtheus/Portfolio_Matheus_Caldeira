# Portfólio Web Dinâmico - Challenge 4º Bimestre

Este projeto foi desenvolvido para o processo seletivo de Frontend da Canes Solution. Trata-se de um portfólio profissional dinâmico, construído do zero, sem o uso de construtores de sites, utilizando apenas HTML5, CSS3, JavaScript e Bootstrap.

## Tecnologias Utilizadas
- **Frontend:** HTML5, CSS3 (Flexbox e Grid), Bootstrap 5.
- **Lógica e Manipulação:** JavaScript (ES6+).
- **Armazenamento:** LocalStorage API (dados em formato JSON).
- **Automação de E-mail:** Web3Forms.

## Como acessar o Painel Administrativo Oculto (CRUD)
Para validar o sistema de armazenamento local (Client-Side Storage), um painel administrativo oculto foi implementado na interface.
1. Role a página até o final (rodapé).
2. Clique no **ponto discreto** (•) ao lado direito dos créditos.
3. Um modal será aberto solicitando uma senha.
4. **Senha de acesso:** `admin123`
5. No painel, é possível Criar, Ler, Atualizar e Deletar as mensagens enviadas pelo formulário. O sistema já vem com 20 registros de teste injetados automaticamente no primeiro acesso.

## Escolha da Ferramenta de Automação (Etapa 2.2)
Foi escolhido o **Web3Forms** para realizar a notificação real de envio do formulário de contato.
**Motivos da escolha:**
1. **Zero backend:** Por ser um projeto puramente client-side (Frontend), o Web3Forms resolve a necessidade de enviar e-mails sem a necessidade de criar e hospedar um servidor back-end.
2. **Simplicidade:** A integração é feita via requisição `fetch` com uma Access Key, o que mantém o código limpo e seguro.
3. **Confiabilidade:** O serviço entrega as mensagens diretamente na caixa de entrada de forma gratuita, sem complexidade de configuração de servidores SMTP.

### Como o Avaliador pode testar a Automação de E-mail
Como o e-mail de destino é a caixa de entrada privada do desenvolvedor, o avaliador pode validar o funcionamento da automação de duas formas:
1. Ao preencher e enviar o formulário de contato no site, uma notificação verde de "sucesso" aparecerá na tela, confirmando que a API do Web3Forms recebeu os dados e disparou o e-mail.
2. A mensagem enviada também será salva localmente e poderá ser visualizada em tempo real acessando o **Painel Administrativo Oculto** (conforme as instruções acima).

## Como testar o projeto localmente
1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` em qualquer navegador (recomendado usar a extensão Live Server no VS Code).
3. Preencha o formulário de contato para testar a automação e o armazenamento local.
4. Após o envio, role até o rodapé da página, clique no ponto oculto (•), digite a senha admin123 e abra o Painel Administrativo. A mensagem que você acabou de enviar estará salva lá na lista, comprovando o funcionamento do CRUD (LocalStorage).