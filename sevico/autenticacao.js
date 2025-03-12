import jwt from 'jsonwebtoken'; // Importa o módulo 'jsonwebtoken' para manipulação de JWT (JSON Web Tokens)

const JWT_SECRET = 'adsfjkdflnvnmckjdhgfkjgffgksf'; // Define uma string de segredo para assinar e verificar tokens JWT

// Função para gerar um token JWT
export function geraToken() {
    const usuarioLogado = { idUsuario: 1 }; // Cria um objeto que representa o usuário logado, com um idUsuario de 1

    const token = jwt.sign(usuarioLogado, JWT_SECRET, { expiresIn: '30d' }); // Gera um token JWT assinado com o segredo e expiração de 30 dias
    return token; // Retorna o token gerado
}

// Função para validar um token JWT
export function validaToken(token) {
    let status; // Variável para armazenar o status da validação
    let codigo; // Variável para armazenar o código de resposta

    // Verifica o token JWT usando o segredo
    jwt.verify(token, JWT_SECRET, function (erro, dadosToken) {
        // Se não houver erro e o idUsuario for igual a 1
        if (erro == null && dadosToken.idUsuario == 1) {
            status = true; // Define o status como verdadeiro
            codigo = 200; // Define o código de resposta como 200 (OK)
        } else {
            status = false; // Define o status como falso
            codigo = 401; // Define o código de resposta como 401 (Não autorizado)
        }
    });

    return { status: status, codigo: codigo }; // Retorna um objeto com o status e o código de resposta
}

// Função para validar login com nome de usuário e senha
export function validaLogin(usuario, senha) {
    // Verifica se o usuário e a senha correspondem a 'Admin' e '123'
    if (usuario === 'Admin' && senha === '123') {
        return true; // Retorna verdadeiro se as credenciais forem válidas
    } else {
        return false; // Retorna falso se as credenciais forem inválidas
    }
}
