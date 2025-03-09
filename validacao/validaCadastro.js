function validaNome(nome) {
    const nomeUsuarioRegex = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;   /*  Expressão regular:
                                                            ^ e $: Indicam o início e o fim da string, garantindo que toda a entrada seja validada.
                                                            [a-zA-ZÀ-ÿ\s]: Permite letras maiúsculas (A-Z), minúsculas (a-z), caracteres acentuados (À-ÿ) e espaços (\s).
                                                            {2,50}: Exige que o nome tenha entre 2 e 50 caracteres (modifique os valores conforme necessário).
                                                        */
    const validacao = nomeUsuarioRegex.test(nome);
    return validacao;
}

function validaEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   /*   Expressão regular:
                                                            ^[^\s@]+: Garante que o e-mail começa com um ou mais caracteres que não são espaço (\s) ou @.
                                                            @: Exige a presença de exatamente um @ após os caracteres iniciais.
                                                            [^\s@]+: Permite caracteres válidos no domínio (depois do @), exceto espaço ou outro @.
                                                            \.: Exige pelo menos um ponto (.) após o domínio.
                                                            [^\s@]+$: Garante que o e-mail termina com caracteres válidos após o ponto (sem espaços).
                                                        */
    const validacao = emailRegex.test(email);
    return validacao;
}

export function validaUsuario(nome, email) {
    const nomeIsValid = validaNome(nome);
    const emailIsValid = validaEmail(email);

    const validacao = nomeIsValid & emailIsValid;

    if (validacao) {
        return { status: true, mensagem: '' }
    } else {
        return { status: false, mensagem: 'Nome ou email inválidos!' }
    }
}