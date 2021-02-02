const app = Vue.createApp({
    data() {
        return {
            name: '',
            userInput: '',
            pstate: true,
        }
    },
    methods: {
        buttonClick() {
            this.pstate = !this.pstate;
        }
    },
});
app.mount('#assignment');