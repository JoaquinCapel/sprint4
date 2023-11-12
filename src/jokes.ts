document.addEventListener('DOMContentLoaded', async () => {

    const headers = { 'Accept': 'application/json' };
    const containerJoke = document.getElementById('joke-container');
    const newJoke = document.querySelector('.btn');
    const ratingButtons= document.querySelectorAll('.btn-smiley') as NodeListOf<HTMLButtonElement>;
    const reportAcudits: { joke: string, score: number, date: string }[] = [];
    let userRating: number | null = null; // Variable para almacenar la puntuación del usuario

    // se muestra el chiste al cargar pagina.
    try {
        const data = await randomJoke();
        showJoke(data);
        console.log(data);
    } catch (error) {
        console.error('something went wrong. Try it again.', error);
    }

    // Deshabilitar los botones de puntuación al principio
    ratingButtons.forEach(button => {
        button.disabled = true;
    });

 //Elimina el error que da newJoke al tener la posibilidad de ser null / Verifica que newJoke no sea null ni undefined. O sea, que el boton existe.
    if (newJoke) {
        newJoke.addEventListener('click', async (e) => {
             // con async se utiliza una funcion asincrona, a la cual podremoos esperar con 'await' a que se resuleva la promesa (datos API), antes de continuar con el código.
            try {
                const data = await randomJoke();
                // La función await pausará la ejecución del código hasta que la promesa devuelta por randomJoke se resuelva
                showJoke(data);
                console.log(data);

                // Habilitar los botones de puntuación después de cargar el chiste
                ratingButtons.forEach(button => {
                    button.disabled = false;
                });

                // Mostrar la última puntuación del usuario si está definida
                if (userRating !== null) {
                    rateJoke(userRating);
                    userRating = null; // Restablecer la puntuación del usuario
                }
            } catch (error) {
                console.error('Error al obtener el chiste', error);
            }
        });
    } else {
        console.error('Elemento btn no encontrado.');
    }

    async function randomJoke() {
        try {
            const res = await fetch('https://icanhazdadjoke.com/', { headers });
            // Aquí se utiliza await para esperar a que la promesa devuelta por la función fetch se resuelva(respuesta de la API)
            const data = await res.json();
            // se utiliza await nuevamente para esperar a que se analice el cuerpo de la respuesta como JSON. Esto convierte los datos en un objeto JavaScript que se puede usar en el código
            return data;
            // la variable data devuelve un objeto con el contenido del chiste
        } catch (error) {
            throw error;
        }
    }

    // esto elimina el error que da el parametro jokes en la funcion showJoke al ser any y no estar definido. Se utiliza para definir la estructura de los objetos que representan chistes. Pueden tener una propiedad joke que contiene el chiste en sí y una propiedad error que es opcional y se utiliza para almacenar mensajes de error
    interface Joke {
        joke: string;
        error?: string;
    }

    async function showJoke(jokes: Joke) {
        if (containerJoke === null || containerJoke === undefined) {
            console.error('joke-container element not found');
            return { error: 'Error: joke not found' };
        } else {

            containerJoke.innerHTML = '';
            const createDiv = document.createElement('div');
            createDiv.innerText = jokes.joke;

            const div = document.createElement('div');
            div.appendChild(createDiv);

            containerJoke.appendChild(div);
            return jokes;
        }
    }

    function rateJoke(score: number) {
        if (containerJoke && containerJoke.innerText) {
            const jokeText: string = containerJoke.innerText;
            const date: string = new Date().toISOString();
            reportAcudits.push({ joke: jokeText, score, date });
            console.log('Report Acudits:', reportAcudits);
        }
    }
    // Agregar botones de puntuación
    
    ratingButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            userRating = index + 1; // Almacena la puntuacion del usuario
        });
    });

});

