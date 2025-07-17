/*
data: dados
initial amount
annual contribution
expected return
duration
 */



type InvestimentDate = {//criando tipo para o objeto de dados
    initialAmount: number; //valor inicial
    annualContribution: number; //contribuição anual
    expectedReturn: number; //retorno esperado
    duration: number; //duração

}; 

type ReturnInvestmentResult = {// cria obj de retorno
    year: string;
    totalAmount: number;
    totalContributions: number;
    totalInterestEarned: number;
    }

type CalculationResult = ReturnInvestmentResult[] | string; //retorna uma matriz de resultados ou uma string de erro

//uniao
function calculateInvestment(data: InvestimentDate):CalculationResult { //retorna uma matriz result[]

    const { initialAmount, annualContribution, expectedReturn, duration } = data;

    if (initialAmount < 0) {
        return 'Valor inicial deve ser maior ou igual a zero';
    }
    if (duration <= 0) {
        return 'Duração deve ser maior que zero';
    }
    if(expectedReturn < 0) {
        return 'Retorno esperado deve ser maior ou igual a zero';
    }


    let total = initialAmount
    let totalContributions = 0;
    let totalInterestEarned = 0;

    //anualResults é um array que armazena os resultados anuais
    const annualResults: ReturnInvestmentResult[] = [];
    for (let i = 0; i < duration; i++) {
        total = total * (1 + expectedReturn); 
        totalInterestEarned = total - totalContributions - initialAmount;   
        totalContributions += annualContribution;
        total += annualContribution;

        //adiciona o resultado do ano atual ao array annualResults
        annualResults.push({
            year: `Ano ${i + 1}`,
            totalAmount: total,
            totalContributions: totalContributions,
            totalInterestEarned: totalInterestEarned
        });
    }
    return annualResults;

}

function printResults(results: CalculationResult) {
    if (typeof results === 'string') {
        console.log(results);
        return;
    }

    for (const yearResult of results) {
        console.log(yearResult.year);
        console.log(`Valor total: R$ ${yearResult.totalAmount.toFixed(2)}`);
        console.log(`Contribuições totais: R$ ${yearResult.totalContributions.toFixed(2)}`);
        console.log(`Juros totais: R$ ${yearResult.totalInterestEarned.toFixed(2)}`);
        console.log('-------------------------');
    
    
    }
}
 //passando os dados de exemplo para calcular o investimento
    const investimentDate: InvestimentDate = {
        initialAmount: 1000, // valor inicial
        annualContribution: 100, // contribuição anual
        expectedReturn: 0.05, // retorno esperado de 5%
        duration: 10 // duração de 10 anos
    }
    const results = calculateInvestment(investimentDate);

    printResults(results);