function calcular(event) {
    console.log("Calculando área e circunferência do círculo...");
    event.preventDefault();
    var input = document.forms["myForm"]["myInput"];
    var raio = parseFloat(input.value);
    var areaInput = document.getElementById("area");
    var circInput = document.getElementById("circunferencia");
    if (!isNaN(raio)) {
        var area = Math.PI * Math.pow(raio, 2);
        var circunferencia = 2 * Math.PI * raio;
        areaInput.value = area.toFixed(2);
        circInput.value = circunferencia.toFixed(2);
    }
    else {
        alert("Por favor, digite um número válido para o raio.");
        areaInput.value = "";
        circInput.value = "";
    }
}
