/* FUNÇÕES PARA USO INTERNO */

function validaNome(nome) {

    // Expressão regular que valida o nome do usuário
    const nomeUsuarioRegex = /^[a-zA-ZÀ-ÿ\s]{2,50}$/;   /*  Expressão regular:
                                                            ^ e $: Indicam o início e o fim da string, garantindo que toda a entrada seja validada.
                                                            [a-zA-ZÀ-ÿ\s]: Permite letras maiúsculas (A-Z), minúsculas (a-z), caracteres acentuados (À-ÿ) e espaços (\s).
                                                            {2,50}: Exige que o nome tenha entre 2 e 50 caracteres (modifique os valores conforme necessário).
                                                        */
    const validacao = nomeUsuarioRegex.test(nome); // Testa o nome do usuário contra a expressão regular
    return validacao; // Retorna o resultado da validação

}

function validaEmail(email) {

    // Expressão regular que valida o email do usuário
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   /*   Expressão regular:
                                                            ^[^\s@]+: Garante que o e-mail começa com um ou mais caracteres que não são espaço (\s) ou @.
                                                            @: Exige a presença de exatamente um @ após os caracteres iniciais.
                                                            [^\s@]+: Permite caracteres válidos no domínio (depois do @), exceto espaço ou outro @.
                                                            \.: Exige pelo menos um ponto (.) após o domínio.
                                                            [^\s@]+$: Garante que o e-mail termina com caracteres válidos após o ponto (sem espaços).
                                                        */
    const validacao = emailRegex.test(email); // Testa o email do usuário contra a expressão regular
    return validacao; // Retorna o resultado da validação

}

/* FUNÇÕES PARA USO EXTERNO */

export function validaCadastro(nome, email) {

    const nomeIsValid = validaNome(nome); // Valida o nome do usuário
    const emailIsValid = validaEmail(email); // Valida o email do usuário

    const validacao = nomeIsValid & emailIsValid; // Realiza uma operação lógica AND entre as validações do nome e do email

    if (validacao) { // Se a validação for bem-sucedida
        return { status: true, mensagem: '' } // Retorna um status true e uma mensagem vazia
    } else { // Se a validação falhar
        return { status: false, mensagem: 'Nome ou email inválidos!' } // Retorna um status false e uma mensagem de erro
    }

}
