import Card from './card.js';
import shuffleArray from './shuffleArray.js';

const COLORS = ['red', 'orange', 'yellow', 'green', 'blue', 'darkblue', 'purple', 'black'];

window.addEventListener('DOMContentLoaded', e => {
    const $container = document.getElementById('container');
    let cards = [],
        openedCards = [],
        id = 0;

    init();


    function init() {
        cards = createCards();

        cards = shuffleArray([...cards]);

        renderCards(cards);

        window.cards = cards;
    }

    function createCards() {
        const cardList = [];

        for (let i = 0, len = COLORS.length; i < len; i++) {
            for (let j = 0; j < 2; j++) {
                const card = new Card({
                    id,
                    color: COLORS[i],
                    isOpen: false,
                    disabled: false,
                    onClick: handleClickCard
                });

                cardList.push(card);
            }
        }

        return cardList;
    }

    function renderCards(cards) {
        const frag = document.createDocumentFragment();

        cards.forEach(card => {
            frag.appendChild(card.$el);
        });

        $container.appendChild(frag);
    }

    function handleClickCard() {

    }
});