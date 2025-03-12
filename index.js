import express from 'express'; // Importa o framework Express para construção de aplicações web.
import cors from 'cors'; // Importa o middleware para habilitar o compartilhamento de recursos entre diferentes origens (CORS).
import { validaLogin } from './sevico/autenticacao.js'; // Importa a função validaLogin do serviço de autenticação.
import { geraToken } from './sevico/autenticacao.js'; // Importa a função geraToken do serviço de autenticação.
import { validaToken } from './sevico/autenticacao.js'; // Importa a função validaToken do serviço de autenticação.
import { cadastraLead, retornaLeads } from './sevico/manipulaLeads.js'; // Importa as funções para manipular leads.
import { validaCadastro } from './validacao/validaCampos.js'; // Importa a função que valida os dados do usuário.

const app = express(); // Cria uma instância da aplicação Express.

app.use(express.json()); // Habilita o uso de JSON no corpo da requisição (req.body).
app.use(cors()); // Possibilita receber requisições de origens diferentes.

/* ROTA 1 */
app.post('/leads', async (req, res) => { // Define uma rota POST em "/leads" para lidar com dados recebidos.

    const nome = req.body.nome; // Extrai o nome do corpo da requisição.
    const email = req.body.email; // Extrai o email do corpo da requisição.

    const usuarioValidado = validaCadastro(nome, email); // Chama a função para validar os dados do usuário.

    if (usuarioValidado.status) { // Verifica se a validação do usuário foi bem-sucedida.
        await cadastraLead(nome, email); // Cadastra o lead utilizando os dados fornecidos.
        res.status(204).end(); // Responde com o status HTTP 204 (Sem conteúdo) e encerra a conexão.
    } else {
        res.status(404).send({ mensagem: usuarioValidado.mensagem }); // Responde com status HTTP 404 e mensagem de erro, caso a validação falhe.
    }

}) // Rota de Cadastro de Leads.

/* ROTA 2 */
app.post('/login', async (req, res) => { // Define uma rota POST em "/login" para autenticação de usuário.
    const usuario = req.body.usuario; // Extrai o nome de usuário do corpo da requisição.
    const senha = req.body.senha; // Extrai a senha do corpo da requisição.

    const autenticacao = validaLogin(usuario, senha); // Valida o login utilizando a função validaLogin.

    if (!autenticacao) { // Se a autenticação falhar
        res.status(401).send({ mensagem: "Acesso negado!" }); // Responde com status HTTP 401 e mensagem de acesso negado.
        return; // Encerra a execução da função.
    } else { // Se a autenticação for bem-sucedida
        const token = geraToken(); // Gera um token JWT para o usuário autenticado.
        res.status(200).send({ token: token }); // Responde com status HTTP 200 e o token gerado.
    }

}) // Rota para validação de login.

/* ROTA 3 */
app.get('/lista-leads', async (req, res) => { // Define uma rota GET em "/lista-leads" para listar leads.
    // Recebe o Token enviado na requisição e usa split para remover o texto 'Bearer'
    let token; // Declara a variável token.

    if (typeof req.headers.authorization !== 'undefined') { // Verifica se o cabeçalho de autorização foi enviado.
        token = req.headers.authorization.split(' ')[1]; // Extrai o token do cabeçalho de autorização.
    } else { // Se o cabeçalho de autorização não foi enviado
        token = -1; // Define o token como -1.
    }

    const tokenValido = validaToken(token); // Valida o token utilizando a função validaToken.

    if (!tokenValido.status) { // Se o token não for válido
        res.status(tokenValido.codigo).end(); // Responde com o código de status apropriado e encerra a conexão.
        return; // Encerra a execução da função.
    }

    const listaLeads = await retornaLeads(); // Obtém a lista de leads utilizando a função retornaLeads.

    res.status(tokenValido.codigo).send({ leads: listaLeads }); // Responde com o código de status apropriado e a lista de leads.
}); // Rota para exibição dos leads cadastrados.

// EXECUTA SERVIDOR LOCAL.
app.listen(8080, async () => { // Configura a aplicação para escutar requisições na porta 8080.
    console.log('Servidor Iniciado.'); // Exibe no console que o servidor foi iniciado com sucesso.
});
