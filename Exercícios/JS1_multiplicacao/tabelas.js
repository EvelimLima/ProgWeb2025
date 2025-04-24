let tabelasDeMultiplicacaoAte5 = ``
let tabelasDeMultiplicacaoAte10 = ``

for(let i = 1; i <= 10; i++){
    let multiplicacoes = ``
    for(let j = 1;j <= 10; j++){
        multiplicacoes += 
        `
        <tr>
            <td>${i} x ${j}</td>
            <td>${i * j}</td>
        </tr>
        `
    }
    
    let tabela =
    ` 
    <table>
            <thead>
                <th colspan="2">Produto de ${i}</th> 
            </thead>
            ${multiplicacoes}
    </table>
    `
    if (i <= 5){
        tabelasDeMultiplicacaoAte5 += tabela
    }
    else {
        tabelasDeMultiplicacaoAte10 += tabela
    }
}

conteudoHTML = `
<div>
        ${tabelasDeMultiplicacaoAte5}
        ${tabelasDeMultiplicacaoAte10}

</div>
`;
document.writeln(conteudoHTML)