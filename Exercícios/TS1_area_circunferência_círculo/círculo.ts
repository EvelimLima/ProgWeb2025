function calcular(event: Event): void {
  event.preventDefault();

  const input = document.forms["myForm"]["myInput"] as HTMLInputElement;
  const raio = parseFloat(input.value);

  const areaInput = document.getElementById("area") as HTMLInputElement;
  const circInput = document.getElementById("circunferencia") as HTMLInputElement;

  if (!isNaN(raio)) {
    const area = Math.PI * raio ** 2;
    const circunferencia = 2 * Math.PI * raio;

    areaInput.value = area.toFixed(2);
    circInput.value = circunferencia.toFixed(2);
  } else {
    alert("Por favor, digite um número válido para o raio.");
    areaInput.value = "";
    circInput.value = "";
  }
}
