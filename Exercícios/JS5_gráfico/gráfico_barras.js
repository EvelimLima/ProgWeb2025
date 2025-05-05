
function desenharGrafico() {
  const alturaInputs = document.querySelectorAll('.altura');
  const largura = parseInt(document.getElementById('largura').value);
  const grafico = document.getElementById('grafico');

  grafico.innerHTML = ""; // limpa o gráfico anterior

  alturaInputs.forEach(input => {
    const altura = parseInt(input.value);
    if (!isNaN(altura)) {
      const barra = document.createElement("div");
      barra.className = "barra";
      barra.style.width = `${largura}px`;
      barra.style.height = `${altura}px`;
      grafico.appendChild(barra);
    }
  });
}
