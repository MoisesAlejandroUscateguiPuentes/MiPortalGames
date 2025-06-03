document.addEventListener('DOMContentLoaded', () => {
  const buscadorInput = document.querySelector('#buscador');

  // Noticias
  const noticiasContainer = document.querySelector('#ultimas-noticias');
  const noticias = noticiasContainer ? noticiasContainer.querySelectorAll('.pagina') : [];

  // Roms
  const romsContainer = document.querySelector('#rom-detalle');
  const roms = romsContainer ? romsContainer.querySelectorAll('.pagina') : [];

  if (buscadorInput) {
    buscadorInput.addEventListener('input', () => {
      const textoBusqueda = buscadorInput.value.toLowerCase().trim();

      // Filtrar noticias
      let algunaVisibleNoticias = false;
      noticias.forEach(noticia => {
        const titulo = noticia.querySelector('h3')?.textContent.toLowerCase() || '';
        const texto = noticia.querySelector('p')?.textContent.toLowerCase() || '';
        if (titulo.includes(textoBusqueda) || texto.includes(textoBusqueda)) {
          noticia.style.display = 'flex';
          algunaVisibleNoticias = true;
        } else {
          noticia.style.display = 'none';
        }
      });

      let msgNoticias = document.getElementById('no-resultados-noticias');
      if (!algunaVisibleNoticias && noticiasContainer) {
        if (!msgNoticias) {
          msgNoticias = document.createElement('p');
          msgNoticias.id = 'no-resultados-noticias';
          msgNoticias.textContent = 'No se encontraron noticias relacionadas.';
          noticiasContainer.appendChild(msgNoticias);
        }
      } else if (msgNoticias) {
        msgNoticias.remove();
      }

      // Filtrar ROMs
      if (romsContainer) {
        let algunaVisibleRoms = false;
        roms.forEach(rom => {
          const titulo = rom.querySelector('h2')?.textContent.toLowerCase() || '';
          const descripcion = rom.querySelector('p')?.textContent.toLowerCase() || '';
          if (titulo.includes(textoBusqueda) || descripcion.includes(textoBusqueda)) {
            rom.style.display = 'flex';
            algunaVisibleRoms = true;
          } else {
            rom.style.display = 'none';
          }
        });

        let msgRoms = document.getElementById('no-resultados-roms');
        if (!algunaVisibleRoms) {
          if (!msgRoms) {
            msgRoms = document.createElement('p');
            msgRoms.id = 'no-resultados-roms';
            msgRoms.textContent = 'No se encontraron ROMs relacionadas.';
            romsContainer.appendChild(msgRoms);
          }
        } else if (msgRoms) {
          msgRoms.remove();
        }
      }
    });
  }

  // COMENTARIOS
  const formComentario = document.querySelector('#form-comentario');
  const comentariosLista = document.querySelector('#comentarios-lista');

  if (formComentario && comentariosLista) {
    function cargarComentarios() {
      const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];

      comentariosLista.innerHTML = '';

      if (comentarios.length === 0) {
        comentariosLista.innerHTML = '<p>No hay comentarios aún.</p>';
        return;
      }

      comentarios.forEach(({ nombre, comentario }) => {
        const div = document.createElement('div');
        div.classList.add('comentario');
        div.innerHTML = `
          <strong>${nombre}</strong>
          <p>${comentario}</p>
        `;
        comentariosLista.appendChild(div);
      });
    }

    cargarComentarios();

    formComentario.addEventListener('submit', (e) => {
      e.preventDefault();

      const nombre = formComentario.nombre.value.trim();
      const comentario = formComentario.comentario.value.trim();

      if (nombre && comentario) {
        const nuevoComentario = { nombre, comentario };
        const comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
        comentarios.push(nuevoComentario);
        localStorage.setItem('comentarios', JSON.stringify(comentarios));

        formComentario.reset();
        cargarComentarios();
      }
    });
  }
});



