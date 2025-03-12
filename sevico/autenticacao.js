import jwt from 'jsonwebtoken';

const JWT_SECRET = 'adsfjkdflnvnmckjdhgfkjgffgksf';

export function geraToken() {
    const usuarioLogado = {idUsuario: 1};

    const token = jwt.sign(usuarioLogado, JWT_SECRET, {expiresIn: '30d'});
    return token;
}

export function validaToken(token) {
    let status;
    let codigo;

    jwt.verify(token, JWT_SECRET, function(erro, dadosToken) {
        if(erro == null && dadosToken.idUsuario == 1)
        {
            status = true;
            codigo = 200;
        }
        else
        {
            status = false;
            codigo = 401;
        }
    });

    return {status: status, codigo: codigo};
}