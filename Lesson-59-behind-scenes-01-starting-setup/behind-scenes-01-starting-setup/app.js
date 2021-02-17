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
      this.message = this.$refs.userText.value
    },
  },
  beforeCreate() {
    console.log('beforeCreate');
  },
  created() {
    console.log('created');
  },
  beforeMount() {
    console.log('beforeMount');
  },
  mounted() {
    console.log('mounted');
  },
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  updated() {
    console.log('updated');
  },
  beforeUnmount() {
    console.log('beforeUnmounted')
  },
  unmounted() {
    console.log('unmounted')
  },
});

app.mount('#app');

// ....
// let message = "Hello!";
// let longMessage = message + ' World!';
// console.log(longMessage);
// message = 'Hello!!!!';
// console.log(longMessage);

// const data = {
//   message: 'Hello!',
//   longMessage: 'Hello! World!'
// };

// const handle = {
//   set(target, key, value) {
//     if(key === 'message'){
//       target.longMessage = value + ' World'
//     }
//     target.message = value;
//   }
// };
// const proxy = new Proxy(data, handle);

// proxy.message = 'Hello!!!!';
// console.log(proxy.longMessage);