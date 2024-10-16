
const selectElement = document.querySelector('#selectEvolucion');
const textoEvolucion = document.querySelector('#inputEvolucion');
const limpiar = document.querySelector('#default');
const diagBox = document.querySelector('#diagnosticoBox');
const alergiaBox = document.querySelector('#alergiaBox');
selectElement.addEventListener('click', function () {
    const selectedOption = selectElement.value;
    switch (selectedOption) {
        case 'T1':
            textoEvolucion.value += "Paciente se presenta con síntomas de [síntomas principales] desde hace [duración]. Examen físico revela [hallazgos relevantes]. Se inicia tratamiento con [medicación o intervención]. Se recomienda seguimiento en [días/semanas]."
            limpiar.selected = true;
            break;
        case 'T2':
            textoEvolucion.value += "Paciente en seguimiento por [condición o diagnóstico]. Evolución favorable con disminución de [síntomas]. Examen físico sin hallazgos relevantes nuevos. Continuar tratamiento actual y control en [días/semanas]."
            limpiar.selected = true;
            break;
        case 'T3':
            textoEvolucion.value += "Paciente en control postoperatorio de [procedimiento realizado]. Presenta [estado general del paciente]. La herida quirúrgica se encuentra [descripción de la herida]. Se indica [instrucciones postoperatorias] y control en [días/semanas]."
            limpiar.selected = true;
            break;
        case 'T4':
            textoEvolucion.value += "Paciente en consulta por persistencia de [síntomas]. Examen físico muestra [hallazgos]. Se ajusta tratamiento a [nuevo tratamiento]. Se solicita [estudio complementario] para evaluación adicional y control en [días/semanas]."
            limpiar.selected = true;
            break;
        case 'T5':
            textoEvolucion.value += "Paciente con diagnóstico de [condición] ha completado tratamiento. Actualmente asintomático y en buen estado general. Se da de alta con recomendaciones de [instrucciones de cuidado en casa] y seguimiento en [días/semanas] si fuera necesario."
            limpiar.selected = true;
            break;
        default:
            break;
    }
});
function agregarInputDiag() {
    const diagInput = document.createElement("input")
    const diagSelect = document.createElement("select")
    const diagEstado1 = document.createElement("option")
    const diagEstado2 = document.createElement("option")

    diagInput.type = "text"
    diagInput.required = true

    diagEstado1.value = "Preliminar"
    diagEstado1.textContent = "Preliminar"
    diagEstado2.value = "Confirmado"
    diagEstado2.textContent = "Confirmado"
    diagSelect.appendChild(diagEstado1)
    diagSelect.appendChild(diagEstado2)

    diagBox.appendChild(diagSelect)
    diagBox.appendChild(diagInput)
}
function agregarInputAlergia() {
    const alergiaSelect = document.createElement("select")
    const importantSelect = document.createElement("select")
    const alergias = [
        "Choque anafiláctico alérgico",
        "Consulta para instrucción y vigilancia dietética sobre la alergia",
        "Alergia en contacto con la piel",
        "Alergia a ambrosía (polen) (fiebre del heno)",
        "Alergia a un animal (caspa) (epidermis) (pelos) (rinitis)",
        "Alergia a un árbol (cualquiera) (fiebre del heno) (polen)",
        "Fiebre del heno con asma",
        "Alergia biológica (ver Alergia, droga)",
        "Alergia a la caspa (animal) (rinitis)",
        "Choque alérgico (anafiláctico)",
        "Choque alérgico debido a efecto adverso de sustancia medicinal correctamente administrada",
        "Choque alérgico por suero o inmunización",
        "Colitis alérgica",
        "Alergia a cosméticos, perfumes",
        "Dermatitis alérgica (ver también Dermatitis)",
        "Alergia a una droga, medicamento o producto biológico (cualquiera) (externo) (interno) (sustancia medicinal administrada apropiadamente)",
        "Alergia a una sustancia errónea administrada o tomada NCOP"
    ];
    const leve = document.createElement("option")
    const normal = document.createElement("option")
    const alta = document.createElement("option")
    const opcionDefaultA = document.createElement("option")
    const opcionDefaultI = document.createElement("option")
    const desde = document.createElement("input")
    const hasta = document.createElement("input")
    const lDesde = document.createElement("label")
    const lHasta = document.createElement("label")

    leve.value = "Leve"
    leve.textContent = "Leve"
    normal.value = "Normal"
    normal.textContent = "Normal"
    alta.value = "Alta"
    alta.textContent = "Alta"

    opcionDefaultA.textContent = "Alergia"
    opcionDefaultI.textContent = "Importancia"
    opcionDefaultA.value = "nada"
    opcionDefaultI.value = "nada"
    opcionDefaultA.disabled = true
    opcionDefaultA.selected = true
    opcionDefaultI.disabled = true
    opcionDefaultI.selected = true
    alergiaSelect.appendChild(opcionDefaultA)
    importantSelect.appendChild(opcionDefaultI)

    alergias.forEach((a)=>{
        const alergia = document.createElement("option")
        alergia.value = a
        alergia.textContent = a 
        alergiaSelect.appendChild(alergia)
    })

    importantSelect.appendChild(leve)
    importantSelect.appendChild(normal)
    importantSelect.appendChild(alta)

    desde.type = "date"
    hasta.type = "date"
    desde.value = "desde"
    hasta.value = "hasta"
    lDesde.textContent = "Desde"
    lHasta.textContent = "Hasta"

    alergiaBox.appendChild(alergiaSelect)
    alergiaBox.appendChild(importantSelect)
    alergiaBox.appendChild(lDesde)
    alergiaBox.appendChild(desde)
    alergiaBox.appendChild(lHasta)
    alergiaBox.appendChild(hasta)
}
