const app = Vue.createApp({
    data() {
        return {
            counter: 0,
            name: '',
        };
    },
    computed: {
        fullname() {
            console.log('Running again...')
            if (this.name === '') {
                return '';
            }
            return this.name + ' ' + 'Garcia';
        }
    },
    methods: {
        outputFullname() {
            if (this.name === '') {
                return '';
            }
            return this.name + ' ' + 'Garcia';
        },
        setName(lastName, event) {
            this.name = event.target.value;
        },
        add() {
            this.counter++
        },
        reduce() {
            this.counter--
        },
        resetInput() {
            this.name = '';
        },
    }
});

app.mount('#events');