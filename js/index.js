    let formulario = document.getElementById('formulario');
    let nombre = document.getElementById('nombre');
    let fecha = document.getElementById('fecha');
    let descripcion = document.getElementById('descripcion');
    let idTarea = document.getElementById('idTarea');
    let listaTareas = document.getElementById("listaTareas");
    let btnGuardar = document.getElementById('btnGuardar');
    let tareas = [];

    
    
    function mostrarTareas() {
        var contenedorTareas = document.getElementById('contenedorTareas');
        contenedorTareas.innerHTML = '';
        for (var i = 0; i < tareas.length; i++) {
            var tarea = tareas[i];
            var element;
            if (tarea.tipo === 'imagen') {
                element = `<img src="${tarea.archivo}" style="max-width: 450px; max-height: 450px;">`;
            } else if (tarea.tipo === 'audio') {
                element = `<audio src="${tarea.archivo}" controls style="max-width: 450px;"></audio>`;
            } else if (tarea.tipo === 'video') {
                element = `<video src="${tarea.archivo}" controls style="max-width: 450px; max-height: 450px;"></video>`;
            }
            contenedorTareas.innerHTML += `
                <div class='row'>
                    <div class='col-6 border p-3'>
                        ${ element }
                    </div>
                    <div class='col-6 border p-3 text-center'>
                        <button class='btn btn-danger' onClick="borrarTarea(${ i })">Borrar</button>
                    </div>
                </div>
            `;
        }
    }
 
    
    let cerrarModal = ()=> {
        btnGuardar.setAttribute("data-bs-dismiss","modal");
        btnGuardar.click();
    }
 
 
    let borrarTarea = (indice)=> {
        tareas.splice(indice,1);
        console.log(tareas);
        mostrarTareas();
    }


    formulario.addEventListener('submit', function(event) {
        event.preventDefault();
    });
   
    let tareaActual = null;

    document.getElementById('archivo').addEventListener('change', function(e) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var tipo = document.getElementById('tipo').value;
            tareaActual = {
                archivo: e.target.result,
                tipo: tipo
            };
            if (tipo === 'imagen') {
                var imagenPrevia = document.getElementById('imagenPrevia');
                imagenPrevia.src = tareaActual.archivo;
                imagenPrevia.style.display = 'block';
                imagenPrevia.style.maxWidth = '450px';
                imagenPrevia.style.maxHeight = '450px';
            } else if (tipo === 'audio') {
                var audioPrevio = document.getElementById('audioPrevio');
                audioPrevio.src = tareaActual.archivo;
                audioPrevio.style.display = 'block';
                audioPrevio.style.maxWidth = '450px';
            } else if (tipo === 'video') {
                var videoPrevio = document.getElementById('videoPrevio');
                videoPrevio.src = tareaActual.archivo;
                videoPrevio.style.display = 'block';
                videoPrevio.style.maxWidth = '450px';
                videoPrevio.style.maxHeight = '450px';
            }
            document.getElementById('archivo').value = '';
        };
        reader.readAsDataURL(e.target.files[0]);
    });


    btnGuardar.addEventListener('click', function() {
        if (tareaActual !== null) {
            tareas.push(tareaActual);
            mostrarTareas();
            tareaActual = null;
        }
        var imagenPrevia = document.getElementById('imagenPrevia');
        imagenPrevia.src = '';
        imagenPrevia.style.display = 'none';
        var audioPrevio = document.getElementById('audioPrevio');
        audioPrevio.src = '';
        audioPrevio.style.display = 'none';
        var videoPrevio = document.getElementById('videoPrevio');
        videoPrevio.src = '';
        videoPrevio.style.display = 'none';
    });
    