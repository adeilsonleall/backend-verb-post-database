import pool from "./conexao.js"; // Importa a pool de conexões do arquivo "conexao.js".

// Função assíncrona para cadastrar um lead.
export async function cadastraLead(nome, email) {

    const conexao = await pool.getConnection(); // Obtém uma conexão do pool.

    // Executa a query de inserção no banco de dados.
    const resposta = await conexao.query('INSERT INTO leads (nome, email) values (?, ?)', [nome, email]);

    conexao.release(); // Libera a conexão de volta para o pool.

    return resposta; // Retorna a resposta da query.
}

// Função assíncrona para retornar todos os leads.
export async function retornaLeads() {
    const conexao = await pool.getConnection(); // Obtém uma conexão do pool.

    // Executa a query de seleção no banco de dados.
    const resposta = await conexao.query("SELECT idleads, nome, email FROM leads");
    conexao.release(); // Libera a conexão de volta para o pool.

    const leads = resposta[0]; // Extrai os dados dos leads da resposta.

    return leads; // Retorna a lista de leads.
}
