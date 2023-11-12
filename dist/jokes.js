"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const containerJoke = document.getElementById('joke-container');
    const newJoke = document.querySelector('.btn');
    const ratingButtons = document.querySelectorAll('.btn-smiley');
    const reportAcudits = [];
    let userRating = null;
    try {
        const data = yield randomJoke();
        showJoke(data);
        console.log(data);
    }
    catch (error) {
        console.error('something went wrong. Try it again.', error);
    }
    ratingButtons.forEach(button => {
        button.disabled = true;
    });
    function dadJoke() {
        return __awaiter(this, void 0, void 0, function* () {
            const dadJokeURL = 'https://icanhazdadjoke.com/';
            const headers = { 'Accept': 'application/json' };
            try {
                const res = yield fetch(dadJokeURL, { headers });
                const data = yield res.json();
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
    function chuckNorrisJoke() {
        return __awaiter(this, void 0, void 0, function* () {
            const chuckNorrisURL = 'https://api.chucknorris.io/jokes/random';
            try {
                const res = yield fetch(chuckNorrisURL);
                const data = yield res.json();
                const joke = data.value;
                return { joke };
            }
            catch (error) {
                throw error;
            }
        });
    }
    if (newJoke) {
        newJoke.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const data = yield randomJoke();
                showJoke(data);
                console.log(data);
                ratingButtons.forEach(button => {
                    button.disabled = false;
                });
                if (userRating !== null) {
                    rateJoke(userRating);
                    userRating = null;
                }
            }
            catch (error) {
                console.error('Error al obtener el chiste', error);
            }
        }));
    }
    else {
        console.error('Elemento btn no encontrado.');
    }
    function randomJoke() {
        return __awaiter(this, void 0, void 0, function* () {
            const random = Math.random();
            if (random < 0.5) {
                return chuckNorrisJoke();
            }
            else {
                return dadJoke();
            }
        });
    }
    function showJoke(jokes) {
        return __awaiter(this, void 0, void 0, function* () {
            if (containerJoke === null || containerJoke === undefined) {
                console.error('joke-container element not found');
                return { error: 'Error: joke not found' };
            }
            else {
                containerJoke.innerHTML = '';
                const createDiv = document.createElement('div');
                createDiv.innerText = jokes.joke;
                const div = document.createElement('div');
                div.appendChild(createDiv);
                containerJoke.appendChild(div);
                return jokes;
            }
        });
    }
    function rateJoke(score) {
        if (containerJoke && containerJoke.innerText) {
            const jokeText = containerJoke.innerText;
            const date = new Date().toISOString();
            reportAcudits.push({ joke: jokeText, score, date });
            console.log('Report Acudits:', reportAcudits);
        }
    }
    ratingButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            userRating = index + 1;
        });
    });
}));
//# sourceMappingURL=jokes.js.map