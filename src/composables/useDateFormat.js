export function useDateFormat(data) {

    try {
        const partes = data.split('-'); // Divide a data em partes
        const dia = partes[2]; // Dia
        const mes = partes[1]; // Mês
        const ano = partes[0]; // Ano
    
    return `${dia}/${mes}/${ano}`; // Retorna no formato DD/MM/AAAA
    } catch (erro) {
        return ''
    }
    
}