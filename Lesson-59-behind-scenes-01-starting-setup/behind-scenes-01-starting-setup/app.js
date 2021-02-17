const app = Vue.createApp({
  data() {
    return {
      currentUserInput: '',
      message: 'Vue is great!',
    };
  },
  methods: {
    saveInput(event) {
      this.currentUserInput = event.target.value;
    },
    setText() {
      // this.message = this.currentUserInput;
      console.log(this.$refs);
      this.message = this.$refs.userText.value;
    },
  },
  beforeCreate() {
    console.log('beforeCreate()');
  },
  created() {
    console.log('created()');
  },
  beforeMount() {
    console.log('beforeMounted()');
  },
  mounted() {
    console.log('mounted()');
  },
  beforeUpdate() {
    console.log('beforeUpdate()')
  },
  updated() {
    console.log('updated()')
  },
});

app.mount('#app');

// ....

// let message = 'Hello';
// let longMessage = message + ' World!';

// console.log(longMessage);

// message = 'Hello!!!!!';

// console.log(longMessage);

const data = {
  message: 'hello',
  longMessage: ''
};

const handler1 = {
  set(target, key, value) {
    if (key === 'message') {
      target.longMessage = value + ' World!'
    }
    target.message = value;
  }
};

const proxy1 = new Proxy(data, handler1);

proxy1.message = "Hello!!!!";

console.log('This is the data object', data);
console.log('This is the proxy object', proxy1)