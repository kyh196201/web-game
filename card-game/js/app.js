import shuffleArray from './shuffleArray.js';


window.addEventListener('DOMContentLoaded', e => {
    const COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'darkblue', 'purple', 'black'];
    const $container = document.getElementById('container');
    let cards = [],
    openedCards = [],
    correctCards = [];
    
    initGame();
    
    async function initGame() {
        cards = shuffleArray(createCards(COLORS));
        render($container, cards);
        await sleep(1000);
        openAll();
        await sleep(3500);
        closeAll();
        await sleep(1000);
        bindEvents();
    }

    function createCards(colors) {
        const cards = [];
        let id = 0;

        for(let i = 0, length = colors.length; i < length; i++) {
            const color = colors[i];

            for(let j = 0; j < 2; j++) {
                cards.push({
                    id: id++,
                    color,
                });
            }
        }

        return cards;
    }

    function render(target, cards) {
        target.innerHTML = cards.map(card => {
            return templateCard(card);
        }).join('');
    }

    function templateCard({ id, color }) {
        return `
            <article class="card" data-id="${id}" data-color="${color}">
                <div class="card__inner">
                    <div class="card__front" style="background-color:${color}"></div>
                    <div class="card__back"></div>
                </div>
            </article>
        `;
    }

    function openAll() {
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            openCard(card);
        });
    }

    function closeAll() {
        const cards = document.querySelectorAll('.card');

        cards.forEach(card => {
            closeCard(card);
        });
    }

    function sleep(delay = 500) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, delay);
        });
    }

    function bindEvents() {
        const cards = document.getElementById('container').querySelectorAll('.card');

        cards.forEach(card => {
            card.addEventListener('click', e => {
                handleClickCard(e);
            });
        });
    }

    async function handleClickCard(e) {
        const $card = e.target.closest('.card');

        if(!$card) return;

        const { id, color } = $card.dataset;
        const idAsNumber = parseInt(id);

        // 정답을 맞춘 카드인 경우
        if(isCorrectCard(idAsNumber)) return;

        if(openedCards.length >= 2) return;

        if(!openedCards.length) {
            openedCards.push({
                id: idAsNumber,
                color,
            });
            openCard($card);
            return;
        }

        // 열려있는 카드가 자기와 같을 경우
        if(isOpenedCard(idAsNumber)) {
            openedCards.pop();
            closeCard($card);
            return;
        }

        openedCards.push({
            id: idAsNumber,
            color,
        });
        openCard($card);

        const isCorrect = compareCard({
            id: idAsNumber,
            color,
        });

        const openedCard = openedCards[0];
        const openedId = openedCard.id;

        if(isCorrect) {
            correctCards.push(openedId, idAsNumber);

            if(correctCards.length >= 16) {
                await sleep(1000);
                alert('Complete!!');
                return;
            }

        } else {
            const $openedCard = document.querySelector(`[data-id="${openedId}"]`);
            await sleep(1000);

            closeCard($card);
            closeCard($openedCard);
        }

        openedCards = [];
    }

    function isOpenedCard(id) {
        return openedCards.findIndex(card => card.id === id) > -1;
    }

    function isCorrectCard(id) {
        return correctCards.includes(id);
    }

    function openCard(card) {
        card.classList.add('card--is-open');
    }

    function closeCard(card) {
        card.classList.remove('card--is-open');
    }

    function compareCard({ id, color }) {
        const openedCard = openedCards[0];

        return openedCard.id !== id && openedCard.color === color;
    }
});