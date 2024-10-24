document.addEventListener("DOMContentLoaded", function (e) {
  var calendarEl = document.getElementById("calendar");

  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    initialDate: new Date(),
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "",
    },
    titleFormat: {
      month: "short",
      year: "numeric",
    },
    dateClick: function (info) {
      var selectedDateEl = info.dayEl;
      var selectedDate = info.dateStr;

      selectedDateEl.classList.add("highlight-day");
      setTimeout(() => {
        selectedDateEl.classList.remove("highlight-day");
      }, 400);

      fetch(`/agenda/${selectedDate}`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((agenda) => {
          const turnosContainer = document.getElementById("turnos-container");
          turnosContainer.innerHTML = "";
          if (!Array.isArray(agenda) || agenda.length === 0) {
            const p = document.createElement("p");
            p.textContent = "No se encontraron turnos para este dia!";
            turnosContainer.appendChild(p);
            return;
          }
          agenda.forEach((turno) => {
            const article = document.createElement("article");
            article.className =
              "w-full flex items-center justify-between border-b pb-2";
            const divInfo = document.createElement("div");
            divInfo.className =
              "flex items-center justify-center min-w-36 max-w-full gap-3";

            const divHora = document.createElement("div");
            divHora.className = "w-20 flex items-center justify-center gap-2";
            const svgClock = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock h-5 w-5 text-gray-500"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
            divHora.innerHTML += svgClock;
            divHora.innerHTML += `<p>${turno.inicio
              .split(":")
              .slice(0, 2)
              .join(":")}</p>`;

            const divNyM = document.createElement("div");
            divNyM.className = "w-26 flex items-center justify-center gap-2 ";
            const svgUser = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user h-5 w-5 text-gray-500"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`;
            const svgMotivo = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text h-5 w-5 text-gray-500" data-id="21"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path></svg>`;
            divNyM.innerHTML += svgUser;
            divNyM.innerHTML += `<a href="/paciente/${turno.paciente}" class="modalPaciente" >${turno.nombre}</a>`;
            divNyM.innerHTML += svgMotivo;
            divNyM.innerHTML += `<p >${turno.motivo}</p>`;
            divInfo.appendChild(divHora);
            divInfo.appendChild(divNyM);
            article.appendChild(divInfo);

            const divActions = document.createElement("div");
            divActions.className =
              "flex items-center justify-center min-w-36 max-w-52 gap-5";

            if (turno.estado === "pendiente") {
              divActions.innerHTML += `<p class="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Pendiente</p>`;
              divActions.innerHTML += `<a href="/consulta/${turno.paciente}/${turno.id}" class="inline-flex items-center justify-center text-sm font-medium transition-colors border border-input bg-transparent hover:bg-primaryForeground/5 h-9 rounded-md px-3 text-center">Abrir Consulta</a>`;
            } else {
              divActions.innerHTML += `<p class="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Atendido</p>`;
              divActions.innerHTML += `<a href="/paciente/${turno.paciente}/${turno.id}" class="inline-flex items-center justify-center text-sm font-medium transition-colors border border-input bg-transparent hover:bg-primaryForeground/5 h-9 rounded-md px-3">Ver HCE</a>`;
            }

            article.appendChild(divActions);
            turnosContainer.appendChild(article);
          });
        })
        .catch((error) => {
          console.error("Error al cargar la agenda:", error);
        });
    },
  });
  calendar.render();
});


