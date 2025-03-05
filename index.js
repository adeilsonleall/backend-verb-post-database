import express from 'express';
import cors from 'cors';
import { cadastraLead } from './sevico/manipulaLeads.js';

const app = express();

app.use(express.json()); // Habilita  req.body para o formato JSON.
app.use(cors()); // Possibilita receber requisições de origens diferentes.

app.post('/leads', async(req, res) => {
   
    const nome = req.body.nome;
    const email = req.body.email;

    await cadastraLead(nome, email);

    res.status(204).end;
    
})

app.listen(8080, async() => {
    console.log('Servidor Iniciado.');
})