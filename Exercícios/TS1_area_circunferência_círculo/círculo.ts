function calcular(): void{
    const raioInput = document.getElementById("raio") as HTMLInputElement;
    const areaInput = document.getElementById("area") as HTMLInputElement;
    const circunferenciaInput = document.getElementById("circunferencia") as HTMLInputElement;

    const raio = parseFloat(raioInput.value);

    if (isNaN(raio) || raio <= 0) {
        alert("Por favor, insira um valor válido para o raio.");
        return;
    }

    const area = Math.PI * raio * raio;
    const circunferencia = 2 * Math.PI * raio;

    areaInput.value = area.toFixed(2);
    circunferenciaInput.value = circunferencia.toFixed(2);
}