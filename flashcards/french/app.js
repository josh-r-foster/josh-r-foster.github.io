const flashCardApp = new Vue({
    el: '#flashCardApp',
    data: {
        currentCardIndex: 0,
        cards: [],
        loading: true,
        error: null,
        touchStartX: 0,
        touchEndX: 0
    },
    computed: {
        currentCard() {
            return this.cards[this.currentCardIndex] || {};
        }
    },
    methods: {
        flipCard(card) {
            card.flipped = !card.flipped;
        },
        prevCard() {
            if (this.currentCardIndex > 0) {
                this.currentCard.flipped = false;
                this.currentCardIndex--;
            }
        },
        nextCard() {
            if (this.currentCardIndex < this.cards.length - 1) {
                this.currentCard.flipped = false;
                this.currentCardIndex++;
            }
        },
        handleTouchStart(event) {
            this.touchStartX = event.changedTouches[0].screenX;
        },
        handleTouchEnd(event) {
            this.touchEndX = event.changedTouches[0].screenX;
            this.handleGesture();
        },
        handleGesture() {
            const swipeThreshold = 50;
            const deltaX = this.touchEndX - this.touchStartX;

            if (Math.abs(deltaX) > swipeThreshold) {
                if (deltaX > 0) {
                    this.prevCard();
                } else {
                    this.nextCard();
                }
            }
        },
        shuffleCards(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
    },
    created() {
        fetch('cards.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                this.cards = this.shuffleCards(data);
                this.loading = false;
            })
            .catch(error => {
                console.error('Error loading card data:', error);
                this.error = 'Failed to load card data.';
                this.loading = false;
            });
    }
});