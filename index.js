import express from 'express';
import cors from 'cors';
import { cadastraLead, RetornaLeads } from './sevico/manipulaLeads.js';
import { validaUsuario } from './validacao/validaCadastro.js';
import { validaLogin } from './validacao/validaLogin.js';
import { geraToken } from './sevico/autenticacao.js';
import { validaToken } from './sevico/autenticacao.js';

const app = express();

app.use(express.json()); // Habilita  req.body para o formato JSON.
app.use(cors()); // Possibilita receber requisições de origens diferentes.

app.post('/leads', async(req, res) => {
   
    const nome = req.body.nome;
    const email = req.body.email;

    const usuarioValidado = validaUsuario(nome, email);

    if(usuarioValidado.status){
        await cadastraLead(nome, email);
        res.status(204).end();
    }else {
        res.status(404).send({mensagem: usuarioValidado.mensagem});
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

app.listen(8080, async() => {
    console.log('Servidor Iniciado.');
})