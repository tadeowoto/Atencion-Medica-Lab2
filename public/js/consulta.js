
const selectElement = document.querySelector('#selectEvolucion');
const textoEvolucion = document.querySelector('#inputEvolucion');
const limpiar = document.querySelector('#default');
const diagBox = document.querySelector('#diagnosticoBox');
const alergiaBox = document.querySelector('#alergiaBox');
const btnForm = document.querySelector('#btnForm');

btnForm.addEventListener('click', function () {
    
})



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
    const diagContainer = document.createElement("div");
    diagContainer.classList.add("flex", "gap-2");

    diagInput.type = "text";
    diagInput.required = true;
    diagInput.className = "w-full h-8 rounded-md border border-input bg-background px-3 text-sm focus:ring-2 focus:ring-gray-300"; 

    diagEstado1.value = "Preliminar";
    diagEstado1.textContent = "Preliminar";
    diagEstado2.value = "Confirmado";
    diagEstado2.textContent = "Confirmado";
    diagSelect.className = "h-8 w-40 rounded-md border bg-background px-2 py-1 text-xs focus:ring-2 focus:ring-gray-300";
    
    diagSelect.name = "estadosDiagnosticos[]"
    diagInput.name = "diagnosticos[]"
    diagSelect.appendChild(diagEstado1);
    diagSelect.appendChild(diagEstado2);
    diagContainer.appendChild(diagSelect);
    diagContainer.appendChild(diagInput);
    diagBox.appendChild(diagContainer);
}
function agregarInputAlergia() {
    const alergiaContainer = document.createElement("div");
    alergiaContainer.classList.add("w-full", "flex", "flex-wrap", "gap-2");

    const alergiaSelect = document.createElement("select");
    const importantSelect = document.createElement("select");
    
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

    const leve = document.createElement("option");
    const normal = document.createElement("option");
    const alta = document.createElement("option");
    const opcionDefaultA = document.createElement("option");
    const opcionDefaultI = document.createElement("option");

    const desde = document.createElement("input");
    const hasta = document.createElement("input");

    const lDesde = document.createElement("label");
    const lHasta = document.createElement("label");

    alergiaSelect.className = "w-52 h-8 rounded-md border bg-background px-2 py-1 text-xs focus:ring-2 focus:ring-gray-300";
    importantSelect.className = "h-8 rounded-md border bg-background px-2 py-1 text-xs focus:ring-2 focus:ring-gray-300";
    alergiaSelect.name = "alergias[]";
    importantSelect.name = "importancia[]";
    desde.name= "desdeAlergias[]";
    hasta.name= "hastaAlergias[]";


    leve.value = "Leve";
    leve.textContent = "Leve";
    normal.value = "Normal";
    normal.textContent = "Normal";
    alta.value = "Alta";
    alta.textContent = "Alta";

    opcionDefaultA.textContent = "Alergia";
    opcionDefaultI.textContent = "Importancia";
    opcionDefaultA.value = "nada";
    opcionDefaultI.value = "nada";
    opcionDefaultA.selected = true;
    opcionDefaultI.selected = true;

    alergiaSelect.appendChild(opcionDefaultA);
    importantSelect.appendChild(opcionDefaultI);

    alergias.forEach((a) => {
        const alergia = document.createElement("option");
        alergia.value = a;
        alergia.textContent = a;
        alergiaSelect.appendChild(alergia);
    });

    importantSelect.appendChild(leve);
    importantSelect.appendChild(normal);
    importantSelect.appendChild(alta);

    desde.type = "date";
    desde.className = "w-40 h-8 rounded-md border border-input bg-background px-3 text-sm focus:ring-2 focus:ring-gray-300";
    hasta.type = "date";
    hasta.className = "w-40 h-8 rounded-md border border-input bg-background px-3 text-sm focus:ring-2 focus:ring-gray-300";

    lDesde.textContent = "Desde";
    lHasta.textContent = "Hasta";

    lDesde.className = "text-sm font-semibold";
    lHasta.className = "text-sm font-semibold";



    alergiaContainer.appendChild(alergiaSelect);
    alergiaContainer.appendChild(importantSelect);
    alergiaContainer.appendChild(lDesde);
    alergiaContainer.appendChild(desde);
    alergiaContainer.appendChild(lHasta);
    alergiaContainer.appendChild(hasta);

    alergiaBox.appendChild(alergiaContainer);
}

function agregarInputHabitos() {
    const habitostxtArea = document.createElement("textarea");
    const habitoLabel = document.createElement("label");
    const habitoContainer = document.getElementById("habitoBox");
    const divArriba = document.createElement("div");
    const divAbajo = document.createElement("div");
    divArriba.className = "w-full flex flex-wrap gap-2 flex-col";
    divAbajo.className = "w-full flex flex-wrap gap-2";


    const desde = document.createElement("input");
    const hasta = document.createElement("input");

    const lDesde = document.createElement("label");
    const lHasta = document.createElement("label");

    habitoLabel.className = "text-sm font-semibold";
    habitoLabel.textContent = "Descripción";
    desde.type = "date";
    desde.className = "w-40 h-8 rounded-md border border-input bg-background px-3 text-sm focus:ring-2 focus:ring-gray-300";
    hasta.type = "date";
    hasta.className = "w-40 h-8 rounded-md border border-input bg-background px-3 text-sm focus:ring-2 focus:ring-gray-300";

    lDesde.textContent = "Desde";
    lHasta.textContent = "Hasta";

    lDesde.className = "text-sm font-semibold";
    lHasta.className = "text-sm font-semibold";

    desde.name= "desdeHabitos[]";
    hasta.name= "hastaHabitos[]";

    habitostxtArea.name = "habitos[]";
    habitostxtArea.className = "h-16 w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-gray-300 mt-1";

    divArriba.appendChild(habitoLabel);
    divArriba.appendChild(habitostxtArea)

    divAbajo.appendChild(lDesde);
    divAbajo.appendChild(desde);
    divAbajo.appendChild(lHasta);
    divAbajo.appendChild(hasta);

    habitoContainer.appendChild(divArriba);
    habitoContainer.appendChild(divAbajo);       
}

function agregarInputAntecedente(){
    const antecedentetxtArea = document.createElement("textarea");
    const antecedenteLabel = document.createElement("label");
    const antecedenteContainer = document.getElementById("antecedenteBox");

    const divArriba = document.createElement("div");
    const divAbajo = document.createElement("div");
    divArriba.className = "w-full flex flex-wrap gap-2 flex-col";
    divAbajo.className = "w-full flex flex-wrap gap-2";

    const desde = document.createElement("input");
    const hasta = document.createElement("input");

    const lDesde = document.createElement("label");
    const lHasta = document.createElement("label");

    antecedenteLabel.className = "text-sm font-semibold";
    antecedenteLabel.textContent = "Descripción";
    desde.type = "date";
    desde.className = "w-40 h-8 rounded-md border border-input bg-background px-3 text-sm focus:ring-2 focus:ring-gray-300";
    hasta.type = "date";
    hasta.className = "w-40 h-8 rounded-md border border-input bg-background px-3 text-sm focus:ring-2 focus:ring-gray-300";

    lDesde.textContent = "Desde";
    lHasta.textContent = "Hasta";

    lDesde.className = "text-sm font-semibold";
    lHasta.className = "text-sm font-semibold";

    desde.name= "desdeAntecedentes[]";
    hasta.name= "hastaAntecedentes[]";

    antecedentetxtArea.name = "antecedentes[]";
    antecedentetxtArea.className = "h-16 w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-gray-300 mt-1";

    divArriba.appendChild(antecedenteLabel);
    divArriba.appendChild(antecedentetxtArea);
    divAbajo.appendChild(lDesde);
    divAbajo.appendChild(desde);
    divAbajo.appendChild(lHasta);
    divAbajo.appendChild(hasta);

    antecedenteContainer.appendChild(divArriba);
    antecedenteContainer.appendChild(divAbajo); 
}

function agregarInputMedicamento(){
    const medicamentostxtArea = document.createElement("textarea");
    const medicamentosLabel = document.createElement("label");
    const medicamentosContainer = document.getElementById("medicamentoBox");
    const divArriba = document.createElement("div");
    divArriba.className = "w-full flex flex-wrap gap-2 flex-col";



    medicamentosLabel.className = "text-sm font-semibold";
    medicamentosLabel.textContent = "Descripción";
    
    medicamentostxtArea.name = "medicamentos[]";
    medicamentostxtArea.className = "h-16 w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-gray-300 mt-1";

    divArriba.appendChild(medicamentosLabel);
    divArriba.appendChild(medicamentostxtArea);

    medicamentosContainer.appendChild(divArriba);
}