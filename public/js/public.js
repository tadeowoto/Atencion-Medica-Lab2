document.addEventListener("DOMContentLoaded", function (e) {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth", // Muestra una vista mensual
    initialDate: new Date(), // Fecha actual como fecha inicial
    headerToolbar: {
      // Controles en la parte superior
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth",
    },
    dateClick: function (info) {
      // Maneja el evento de clic en una fecha
      // Al hacer clic en un día, puedes capturar la fecha seleccionada
      var selectedDate = info.dateStr;
      const fechaSeleccionada = selectedDate;
      console.log("fecha desdel el front ", fechaSeleccionada);
      // aca pordiamos hacer un fetch?
      fetch(`/agenda?fecha=${selectedDate}`)
        .then((response) => response.json())
        .then((agenda) => {
          const turnosContainer = document.getElementById("turnos-container");
          turnosContainer.innerHTML = "";

          // Iterar sobre cada turno y crear el HTML
          agenda.forEach((turno) => {
            // Crear el artículo
            const article = document.createElement("article");
            article.className =
              "w-full flex items-center justify-between border-b pb-2";

            // Crear el primer div para la información del turno
            const divInfo = document.createElement("div");
            divInfo.className =
              "flex items-center justify-center min-w-36 max-w-52";

            // Agregar el SVG del reloj
            const svgClock = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock h-5 w-5 text-gray-500"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
            divInfo.innerHTML += svgClock;
            divInfo.innerHTML += `<p class="ml-2 mr-5">${turno.inicio
              .split(":")
              .slice(0, 2)
              .join(":")}</p>`;

            // Agregar el SVG del usuario
            const svgUser = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user h-5 w-5 text-gray-500"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
            divInfo.innerHTML += svgUser;
            divInfo.innerHTML += `<p class="ml-2">${turno.nombre}</p>`;
            article.appendChild(divInfo);

            // Crear el segundo div para el estado y botón
            const divActions = document.createElement("div");
            divActions.className =
              "flex items-center justify-center min-w-36 max-w-52 gap-5";

            if (turno.estado === "pendiente") {
              divActions.innerHTML += `<p class="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Pendiente</p>`;
              divActions.innerHTML += `<button class="inline-flex items-center justify-center text-sm font-medium transition-colors border border-input bg-transparent hover:bg-primaryForeground/5 h-9 rounded-md px-3">Abrir Consulta</button>`;
            } else {
              divActions.innerHTML += `<p class="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Atendido</p>`;
              divActions.innerHTML += `<button class="inline-flex items-center justify-center text-sm font-medium transition-colors border border-input bg-transparent hover:bg-primaryForeground/5 h-9 rounded-md px-3">Ver HCE</button>`;
            }

            article.appendChild(divActions);
            turnosContainer.appendChild(article); // Agregar el artículo al contenedor
          });
        })
        .catch((error) => {
          console.error("Error al cargar la agenda:", error);
        });
    },
  });
  calendar.render();
});
