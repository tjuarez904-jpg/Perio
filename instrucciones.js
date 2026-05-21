const palabras = ["TECNOLOGIA", "MUSICA", "ARTE", "VIDEOJUEGOS", "CINE", "FUTURO", "AMIGOS", "FIESTA"];
const filas = 12;
const columnas = 12;

let seleccionadas = [];
let seleccionando = false;

function generarSopa() {
    const container = document.getElementById('sopa-container');
    container.innerHTML = '';
    seleccionadas = [];

    let matriz = Array.from({ length: filas }, () =>
        Array.from({ length: columnas }, () =>
            String.fromCharCode(65 + Math.floor(Math.random() * 26))
        )
    );

    // Colocar palabras
    palabras.forEach(palabra => {

        let dir = Math.random() < 0.5 ? 'H' : 'V';

        let x = Math.floor(Math.random() * (dir === 'H'
            ? columnas - palabra.length
            : columnas));

        let y = Math.floor(Math.random() * (dir === 'V'
            ? filas - palabra.length
            : filas));

        for (let i = 0; i < palabra.length; i++) {

            if (dir === 'H') {
                matriz[y][x + i] = palabra[i];
            } else {
                matriz[y + i][x] = palabra[i];
            }

        }

    });

    // Crear HTML
    matriz.forEach((fila) => {

        const filaDiv = document.createElement('div');
        filaDiv.classList.add('fila-sopa');

        fila.forEach((letra) => {

            const letraSpan = document.createElement('span');

            letraSpan.classList.add('letra-sopa');
            letraSpan.textContent = letra;

            letraSpan.addEventListener('mousedown', () => {
                seleccionando = true;
            });

            letraSpan.addEventListener('mouseover', () => {

                if (seleccionando) {

                    letraSpan.classList.add('selected');

                    seleccionadas.push(letraSpan.textContent);

                }

            });

            letraSpan.addEventListener('mouseup', () => {

                seleccionando = false;

                const palabra = seleccionadas.join('');

                if (palabras.includes(palabra)) {

                    alert('Encontraste: ' + palabra);

                }

                seleccionadas = [];

            });

            filaDiv.appendChild(letraSpan);

        });

        container.appendChild(filaDiv);

    });

}

// Iniciar sopa
generarSopa();