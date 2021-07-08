export default class Card {
    constructor({ id, color, isOpen, disabled, onClick }) {
        this.id = id;
        this.color = color;
        this.isOpen = isOpen;
        this.disabled = disabled;
        this.onClick = onClick || function () { };

        this.setup();
        this.bindEvents();
    }

    get className() {
        return this.isOpen ? 'card card--is-open' : 'card';
    }

    setup() {
        const $el = document.createElement('article');
        $el.className = this.className;

        $el.innerHTML = `
            <div class="card__inner">
                <div class="card__front" style="background-color: ${this.color}"></div>
                <div class="card__back"></div>
            </div>
        `;

        this.$el = $el;
    }

    bindEvents() {
        this.$el.addEventListener('click', e => {
            this.isOpen = !this.isOpen;
            this.onClick();
        });
    }

    toggle() {
        this.$el.className = this.className;
    }
}