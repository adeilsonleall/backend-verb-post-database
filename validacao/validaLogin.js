export function validaLogin(usuario, senha) {
    if(usuario==='Admin' && senha === '123') {
        return true;
    }else{
        return false;
    }
}