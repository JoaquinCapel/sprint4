document.addEventListener('DOMContentLoaded', async () => {
    const containerJoke = document.getElementById('joke-container');
    const newJoke = document.querySelector('.btn');
    const ratingButtons = document.querySelectorAll('.btn-smiley') as NodeListOf<HTMLButtonElement>;
    const reportAcudits: { joke: string, score: number, date: string }[] = [];
    let userRating: number | null = null;

    try {
        const data = await randomJoke();
        showJoke(data);
        console.log(data);
    } catch (error) {
        console.error('something went wrong. Try it again.', error);
    }

    ratingButtons.forEach(button => {
        button.disabled = true;
    });

    async function dadJoke() {
        const dadJokeURL = 'https://icanhazdadjoke.com/';
        const headers = { 'Accept': 'application/json' };

        try {
            const res = await fetch(dadJokeURL, { headers });
            const data = await res.json();
            return data;

        } catch (error) {
            throw error;
        }
    }

    async function chuckNorrisJoke() {
        const chuckNorrisURL = 'https://api.chucknorris.io/jokes/random';

        try {
            const res = await fetch(chuckNorrisURL);
            const data = await res.json();
            const joke = data.value;
            return { joke };

        } catch (error) {
            throw error;
        }
    }

    if (newJoke) {
        newJoke.addEventListener('click', async (e) => {
            try {
                const data = await randomJoke();
                showJoke(data);
                console.log(data);

                ratingButtons.forEach(button => {
                    button.disabled = false;
                });

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
        const random = Math.random();

        // 50% de probabilidad de obtener un chiste de Chuck Norris
        if (random < 0.5) {
            return chuckNorrisJoke();
        } else {
            return dadJoke();
        }
    }

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

    ratingButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            userRating = index + 1;
        });
    });
});



