import { error } from 'console';
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

function reajuste(valor, taxa) {
    return valor * perc(taxa) + valor;
}

function salarioReajustado(idade, sexo, salarioBase, anoContratacao) {
    const anoAtual = new Date().getFullYear();
    const tempoEmpresa = anoAtual - anoContratacao;
    let novoSalario = salarioBase;

    if (idade >= 18 && idade <= 39) {
        if (sexo === "M") {
            if (tempoEmpresa <= 10) {
                novoSalario = salarioBase * 1.10 - 10;
            } else {
                novoSalario = salarioBase * 1.10 + 17;
            }
        } else if (sexo === "F") {
            if (tempoEmpresa <= 10) {
                novoSalario = salarioBase * 1.08 - 11;
            } else {
                novoSalario = salarioBase * 1.08 + 16;
            }
        }
    } else if (idade >= 40 && idade <= 69) {
        if (sexo === "M") {
            if (tempoEmpresa <= 10) {
                novoSalario = salarioBase * 1.08 - 5;
            } else {
                novoSalario = salarioBase * 1.08 + 15;
            }
        } else if (sexo === "F") {
            if (tempoEmpresa <= 10) {
                novoSalario = salarioBase * 1.10 - 7;
            } else {
                novoSalario = salarioBase * 1.10 + 14;
            }
        }
    } else if (idade >= 70 && idade <= 99) {
        if (sexo === "M") {
            if (tempoEmpresa <= 10) {
                novoSalario = salarioBase * 1.15 - 15;
            } else {
                novoSalario = salarioBase * 1.15 + 13;
            }
        } else if (sexo === "F") {
            if (tempoEmpresa <= 10) {
                novoSalario = salarioBase * 1.17 - 17;
            } else {
                novoSalario = salarioBase * 1.17 + 12;
            }
        }
    }

    return novoSalario.toFixed(2);
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
                    <a href="http://atividade01-ppi.vercel.app/reajuste?idade=18&sexo=F&salarioBase=1700&anoContratacao=2014&matricula=12345">
                        http://atividade01-ppi.vercel.app/reajuste?idade=18&sexo=F&salarioBase=1700&anoContratacao=2014&matricula=12345
                    </a>
                </li>
            </ul>
        </body>
        </html>
    `);
})

server.get('/reajuste', (req, res) => {
    const idade = parseInt(req.query.idade);
    const sexo = (req.query.sexo ?? "").toUpperCase();
    const salarioBase = parseFloat(req.query.salarioBase);
    const anoContratacao = parseInt(req.query.anoContratacao);
    const matricula = parseInt(req.query.matricula);

    let errors = [];

    if(!idade || !sexo || !salarioBase || !anoContratacao || !matricula) {
        errors.push("Insira todos os campos para que possamos retornar informações");
    } else {
        if(idade <= 16) {
            errors.push("A idade deve ser maior que 16 anos");
        }
    
        if(sexo !== 'M' && sexo !== 'F') {
            errors.push("Sexo inválido");
        }
    
        if(isNaN(salarioBase) === "number") {
            errors.push("O salário deve ser um número real válido");
        }
    
        if(salarioBase <= 1) {
            errors.push("O salário deve ser maior que R$ 1,00");
        }
    
        if(isNaN(anoContratacao) === "number") {
            errors.push("O ano de contratação deve ser um número inteiro válido");
        }
    
        if(anoContratacao < 1960) {
            errors.push("O ano de contratação deve ser um inteiro")
        }
    
        if(!(typeof matricula === "number")) {
            errors.push("A matricula deve ser um número inteiro válido");
        }
    
        if(matricula <= 0) {
            errors.push("A matricula deve ser maior que 0")
        }
    }

    if(errors.length > 0) {
        res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <ul style="color: red;">
        `);

        for(let i = 0; i < errors.length; i++) {
            res.write(`<li>${errors[i]}</li>`);
        }

        res.write(`
                </ul>
            </body>
            </html>
        `);
    } else {
        res.write(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <ul">
                    <li>Idade: ${idade}</li>
                    <li>Sexo: ${sexo}</li>
                    <li>Salario base: R$ ${salarioBase}</li>
                    <li>Ano de contratação: ${anoContratacao}</li>
                    <li>Matricula: ${matricula}</li> <br>
                    <li><strong>Salario reajustado: R$ ${salarioReajustado(idade, sexo, salarioBase)}</strong></li>
                </ul>
            </body>
            </html>
        `);
    }

    res.end();
})

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})