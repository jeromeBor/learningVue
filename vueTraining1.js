Vue.component("todo-item", {
  template: "<li>Ceci est un éléments</li>",
});
Vue.component("todo-item2", {
  template: "<li>Ceci est un autre éléments</li>",
});

const app = new Vue({ el: "#todolist" });

Vue.component("button-counter", {
  data: function () {
    return { count: 0 };
  },
  template:
    '<button v-on:click="count++">You clicked me {{ count }} times.</button>',
});

Vue.component("switch-button", {
  data: function () {
    return { state: false };
  },
  template: '<button v-on:click="state=!state"> {{state}}</button>',
});
