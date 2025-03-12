import pool from "./conexao.js";

export async function cadastraLead(nome, email) {

    const conexao = await pool.getConnection();

    const resposta = await conexao.query('INSERT INTO leads (nome, email) values (?, ?)', [nome, email]);

    conexao.release();

    return resposta;
    
}

export async function RetornaLeads() {
    const conexao = await pool.getConnection();

    const resposta = await conexao.query("SELECT idleads, nome, email FROM leads");
    conexao.release();

    const leads = resposta[0];

    return leads;
}