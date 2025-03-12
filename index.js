import express from 'express';
import cors from 'cors';
import { cadastraLead, RetornaLeads } from './sevico/manipulaLeads.js';
import { validaUsuario } from './validacao/validaCadastro.js';
import { validaLogin } from './validacao/validaLogin.js';
import { geraToken } from './sevico/autenticacao.js';
import { validaToken } from './sevico/autenticacao.js';
import express from 'express'; // Importa o framework Express para construção de aplicações web.
import cors from 'cors'; // Importa o middleware para habilitar o compartilhamento de recursos entre diferentes origens (CORS).
import { cadastraLead } from './sevico/manipulaLeads.js'; // Importa a função para cadastrar um novo lead.
import { validaUsuario } from './validacao/validaCadastro.js'; // Importa a função que valida os dados do usuário.

const app = express(); // Cria uma instância da aplicação Express.

app.use(express.json()); // Habilita o uso de JSON no corpo da requisição (req.body).
app.use(cors()); // Possibilita receber requisições de origens diferentes.

app.post('/leads', async(req, res) => { // Define uma rota POST em "/leads" para lidar com dados recebidos.
   
    const nome = req.body.nome; // Extrai o nome do corpo da requisição.
    const email = req.body.email; // Extrai o email do corpo da requisição.

    const usuarioValidado = validaUsuario(nome, email); // Chama a função para validar os dados do usuário.

    if(usuarioValidado.status){ // Verifica se a validação do usuário foi bem-sucedida.
        await cadastraLead(nome, email); // Cadastra o lead utilizando os dados fornecidos.
        res.status(204).end(); // Responde com o status HTTP 204 (Sem conteúdo) e encerra a conexão.
    }else { 
        res.status(404).send({mensagem: usuarioValidado.mensagem}); // Responde com status HTTP 404 e mensagem de erro, caso a validação falhe.
    }    
    
}) // Rota leads.

app.post('/login', async(req, res) => {
    const usuario = req.body.usuario;
    const senha = req.body.senha;

    const autenticacao = validaLogin(usuario, senha);

    if(!autenticacao) {
        res.status(401).send({mensagem: "Acesso negado!"});
        return;
    } else {
        const token = geraToken();
        res.status(200).send({token: token});
    }

})// Rota login.

app.get('/lista-leads', async(req, res) => {
    //Recebe o Token enviado na requisição e usa split para remover o texto 'Bearer'
    let token;

    if(typeof req.headers.authorization !== 'undefined')
    {
        token = req.headers.authorization.split(' ')[1];
    }
    else
    {
        token = -1;
    }

    const tokenValido = validaToken(token);

    if(!tokenValido.status) {
        res.status(tokenValido.codigo).end();
        return;
    }

    const listaLeads = await RetornaLeads();

    res.status(tokenValido.codigo).send({leads: listaLeads});
});

app.listen(8080, async() => { // Configura a aplicação para escutar requisições na porta 8080.
    console.log('Servidor Iniciado.'); // Exibe no console que o servidor foi iniciado com sucesso.
})
