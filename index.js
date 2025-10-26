import express from 'express';

//Uma empresa da cidade de Presidente Prudente-SP possui 3.000 (três mil) funcionários e precisa de um algoritmo 
// onde são informados os dados de um funcionário específico (idade, sexo, salário base, ano de contratação e 
// matrícula) exiba todos os dados do funcionário além do novo salário que deve ser calculado de acordo com o 
// quadro abaixo:

const port = 3000;

const server = express();

// Funções auxiliares

function perc(valor) {
    return valor / 100;
}

function salario(valor, taxa) {
    return valor * perc(taxa) + valor;
}

server.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <p>Para acessar os dados de um funcionário específico, deve-se informar</p>
            <ul>
                <li>Idade</li>
                <li>Sexo</li>
                <li>Salário base</li>
                <li>Ano de contratação</li>
                <li>Matrícula</li>
            </ul>

            <p>Exemplo:</p>

            <ul>
                <li>
                    <a href="http://localhost:3000/reajuste?idade=18&sexo=F&salario_base=1700&anoContratacao=2014&matricula=12345">
                        http://localhost:3000/reajuste?idade=18&sexo=F&salario_base=1700&anoContratacao=2014&matricula=12345
                    </a>
                </li>
            </ul>
        </body>
        </html>
    `);
})

server.get('/reajuste', (req, res) => {
    
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})