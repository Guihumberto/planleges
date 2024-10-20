export function useDiaSemana(dataString) {

    const [dia, mes, ano] = dataString.split('/');
    const data = new Date(ano, mes - 1, dia); 

    const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  
    const diaSemana = data.getDay();

    return diasSemana[diaSemana];

}