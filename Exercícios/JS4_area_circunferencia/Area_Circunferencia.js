function calcular(event) {
  event.preventDefault(); // impede o envio do formulário

  const raio = parseFloat(document.myForm.myInput.value);
  if (isNaN(raio) || raio <= 0) {
    alert("Informe um valor válido para o raio.");
    return;
  }

  const area = Math.PI * raio * raio;
  const circunferencia = 2 * Math.PI * raio;

  document.getElementById("area").value = area.toFixed(2);
  document.getElementById("circunferencia").value = circunferencia.toFixed(2);
}
