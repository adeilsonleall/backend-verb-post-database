function validaNome(nome) {
    const validacao = isNaN(nome) && nome.length > 2;
    return validacao;
}

function validaEmail(email) {
    const validacao = isNaN(email) && email.length > 2;
    return validacao;
}

export function validaUsuario(nome, email) {
    const nomeIsValid = validaNome(nome);
    const emailIsValid = validaEmail(email);

    const validacao = nomeIsValid & emailIsValid;

    if (validacao) {
        return { status: true, mensagem: '' }
    } else {
        return {status: false, mensagem: 'Nome ou email inválidos!'}
    }
}