let item = ["Papel", "Pedra", "Tesoura"]
let pontuacao = 0;
let perdeu = false

while (!perdeu) { 
    console.log("Escolha sua jogada:")
    console.log("1 - Papel\n2 - Pedra\n3 - Tesoura")

    let escolhaUsuario = parseInt(prompt("Digite o número correspondente à sua jogada (1, 2 ou 3):"));
    if (isNaN(escolhaUsuario) || escolhaUsuario < 1 || escolhaUsuario > 3) { 
        console.log("Jogada inválida! Você perdeu!");
        perdeu = true;
        break; //sai do jogo imediatamente após jogada inválida
    }

    let escolhaComputador = Math.floor(Math.random() * 3) + 1;
    console.log(`Você jogou ${item[escolhaUsuario - 1]}`);
    console.log(`O computador jogou ${item[escolhaComputador - 1]}`)

    let diferencaEscolha = escolhaComputador - escolhaUsuario;

    if (diferencaEscolha === 1 || diferencaEscolha === -2) {
        console.log("Você ganhou esta rodada!");
        pontuacao++; //incrementa a pontuação
    } else if (escolhaUsuario === escolhaComputador) {
        console.log("Esta rodada empatou!")
    } else {
        console.log("Você perdeu esta rodada!")
        perdeu = true;
    }
}

console.log(`Jogo encerrado! Sua pontuação total foi de: ${pontuacao}.`)
