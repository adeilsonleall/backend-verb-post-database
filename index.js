import express from 'express';
import cors from 'cors';
import { cadastraLead } from './sevico/manipulaLeads.js';
import { validaUsuario } from './validacao/validaCadastro.js';

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
    
})

app.listen(8080, async() => {
    console.log('Servidor Iniciado.');
})