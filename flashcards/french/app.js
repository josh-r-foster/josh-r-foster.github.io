const flashCardApp = new Vue({
    el: '#flashCardApp',
    data: {
        currentCardIndex: 0,
        cards: [],
        loading: true,
        error: null,
        touchStartX: 0,
        touchStartTime: 0,
        swipeThreshold: 50, // Minimum distance for swipe detection in pixels
        timeThreshold: 300  // Max time allowed for swipe in milliseconds
    },
    computed: {
        currentCard() {
            return this.cards[this.currentCardIndex] || {};
        }
    },
    methods: {
        flipCard() {
            this.currentCard.flipped = !this.currentCard.flipped;
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
            this.touchStartTime = new Date().getTime();  // Capture the time when the touch starts
        },
        handleTouchEnd(event) {
            const touchEndX = event.changedTouches[0].screenX;
            const touchEndTime = new Date().getTime();  // Capture the time when the touch ends

            const deltaX = touchEndX - this.touchStartX;
            const deltaTime = touchEndTime - this.touchStartTime;

            // Check if it's a swipe based on distance and time
            if (Math.abs(deltaX) > this.swipeThreshold && deltaTime < this.timeThreshold) {
                if (deltaX > 0) {
                    this.prevCard();  // Swipe right (previous card)
                } else {
                    this.nextCard();  // Swipe left (next card)
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