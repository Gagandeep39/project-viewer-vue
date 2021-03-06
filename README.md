# Project Viewer

- [Project Viewer](#project-viewer)
  - [Deployment](#deployment)
  - [Description](#description)

## Deployment

- Checkout deployment at <https://gagandeep39.github.io/project-viewer-vue/>

## Description

- A composition API based Vue Application

## Composition API Details

- Alternative way of writing Vue Logic
- Used for Larger Apps
- Main problem with large apps: Too much data and UI code in large apps
- In options API, lot of similar code that should belong together is split across dofferent parts such as watcher, methods, computed etc.
- Composition API allows reusing logic
- Basically merging `data()`, `methods`, `computed`, `watch` into `setup()`

## Demo

- Ref iis used to srtore reactive value
- It work similar to watcher
- It updates variable when inside value changes
- Return statement contains value that can be sued in tmeplate
- Here `username` is an object that tores dynamic data
- We can assign value without ref, but it will not be dynamic ie changes ill not be renderded on UI
- To updte data, we have to ccess it using `.value`
- **If** we try to retun data as `obj.name`, then changes wont be seen in html, obj is a reactive object, however its children are not. Hence we have to return the whole `obj` to show changes dynamically
- **NOTE** `ref()` is for single value, `reactive()` is for object

```js
import { isReactive, isRef, reactive, ref, toRefs } from 'vue';

export default {
  setup() {
    // Refs
    const username = ref('Gagandeep');
    const obj = ref({ name: 'Gagan', age: 21 });
    // ###########  Ref  #############
    // Accessing object
    console.log(obj);
    console.log(obj.value.name);
    // Checkiing if it is reactive
    console.log(isRef(obj)); // True
    console.log(isRef(obj.value.name)); // False
    // ###########  Reactive  #############
    // Reactive
    const obj2 = reactive({ name: 'Gagan', age: 21 });
    // Accessing object
    console.log(obj2);
    console.log(obj2.name);
    // Checkiing if it is reactive
    console.log(isReactive(obj2)); // True
    console.log(isReactive(obj2.name)); // False
    // Making nested variable reactive (ref)
    const refObj = toRefs(obj2);
    console.log(isRef(refObj.name)); // true
    return { username, obj };
  },
};
```

### ref

- Provided for reactive code by vue
- Used to wrap nuber, string, objects etc
- Values are accesssed in java using `objName.value`, in html thn can be accessed directly objName

### reactive

- Made specficially for objects
- A wrapper class, but we dont need to access to using `.value`
- Can be accessed directly
- Basically allow reactivity without wrappers such as `.value`

## Methods

- Same as writing functions in react and other javascript frameworks

```js
setup() {
  // Function in Composition API
  const showAlert = () => {
    alert('This is an alert');
  };
  return { showAlert };
},
```

## Computed

- Called when variable inside it changes
- Created as a method

```html
<input type="text" @input="setFirstName" />
<input type="text" @input="setLastName" />
<p>{{ fullName }}</p>
```

```js
import { ref, computed } from 'vue';

export default {
  setup() {
    // ############# Computed properties #############
    let firstName = ref('');
    let lastName = ref('');
    function setFirstName(event) {
      firstName.value = event.target.value;
    }
    function setLastName(event) {
      lastName.value = event.target.value;
    }
    // Computed method
    const fullName = computed(() => firstName.value + ' ' + lastName.value);
    return {
      firstName,
      lastName,
      setFirstName,
      setLastName,
      fullName,
    };
  },
};
```

## 2 way binding

```html
<input type="text" v-model="description" placeholder="Description" />
{{description }}
```

```js
const description = ref('');
```

## Watch

- Execut a method if a value change

```js
import { ref, watch } from 'vue';

export default {
  setup() {
    let firstName = ref('');
    let lastName = ref('');
    // ################ Watchers ################
    // Watch single value
    watch(firstName, (newVal, oldVal) => {
      console.log('First name was changed');
      console.log(newVal, oldVal);
    });
    watch([firstName, lastName], (newVal, oldVal) => {
      console.log('first name and last name changed');
      console.log(newVal, oldVal); // newvalue - Array of parameters being atched, oldval - arra of param being watch
    });

    return {
      firstName,
      lastName,
    };
  },
};
```

## Ref

- We dont have access to this.\$ref
- Instead we creat a variable as `const abc = ref(null)` and expose it

```html
<input type="text" ref="ageInput" /> <button @click="setAge">Set age</button>
```

```js
import { ref } from 'vue';

export default {
  setup() {
    // ################Age ################
    const ageInput = ref(null);
    const age = ref(22);
    function setAge() {
      // .value is Twice because, when we use ref, we access the data using .value in options API,
      // IN comosition API reference requires its own .value
      age.value = ageInput.value.value;
      console.log(age.value);
    }
    return {
      setAge,
      ageInput,
    };
  },
};
```

## Custom components

- Components are created the same way as options API
- To pass any data, we need to expose the data

```vue
<template>
  <div>
    <h2>{{ userName }}</h2>
    <h3>{{ age }}</h3>
  </div>
</template>
<script>
export default {
  props: ['userName', 'age'],
};
```

```html
<user-data :user-name="username" :age="age" />
```

```js
import { ref } from 'vue';
import UserData from './components/UserData.vue';

export default {
  components: { UserData },
  setup() {
    // ################Age ################
    const ageInput = ref(null);
    const age = ref(22);
    function setAge() {
      age.value = ageInput.value.value;
      console.log(age.value);
    }
    return {
      setAge,
      ageInput,
      age,
    };
  },
};
```

- Accessing props inside a component

```js
props: ['userName'], ['age'],
setup(props) {
    const combination = computed(() => props.userName + ' ' + props.age);
    return {
      combination,
    };
  },
```

## Provide and inject

- Used to pass data to child and their child components
- We call a methiod similar to watch

```js
provide('lastName', lastName);
```

```js
const lastName = inject('lastName');
```

## Options VS Composition API

| Options API                   | Composition API                      |
| ----------------------------- | ------------------------------------ |
| `data() {...}`                | `ref()`, `reactive()`                |
| `methods: { doSomething(){}}` | `function doSmth(){}`                |
| `computed: { val(){}}`        | `const val = computed(() => {})`     |
| `watch: {val(){}}`            | `watch(val, (oldVal, newVal) => {})` |
| `provide: {}`, `inject: []`   | `provide(key, value)`, `inject()`    |

## Lifecycle Hooks

- We import it lke watch, provide etc and use it inside `setup()`,

| Options API              | Composition API              |
| ------------------------ | ---------------------------- |
| beforeCreated, created   | setup() replaces this hooks  |
| beforeMount, mounted     | onBeforeMount, onMounted     |
| beforeUpdate, updated    | onBeforeUpdate, onUpdated    |
| beforeUnmount, unmounted | onBeforeUnmount, onUnmounted |

- Code Implementation

```js
onBeforeMount(() => console.log('onBeforeMount'));
onMounted(() => console.log('onMounted'));
onBeforeUpdate(() => console.log('onBeforeUpdate'));
onUpdated(() => console.log('onUpdated'));
onBeforeUnmount(() => console.log('onBeforeUnmount'));
onUnmounted(() => console.log('onUnmounted'));
```

## Csutom composition

- It refers to reusable functions in Composition API
- Usually stored in directly named `hooks`, `custom-composable-functions`, `composables`
- Naming convection `useFunctioName`

```js
// Custom Composition
import { ref } from 'vue';
const useAlert = () => {
  const alertIsVisible = ref(false);

  function showAlert() {
    alertIsVisible.value = true;
  }
  function hideAlert() {
    alertIsVisible.value = false;
  }

  return [alertIsVisible, showAlert, hideAlert];
};
export default useAlert;
```

```js
// Using the Custom compositon
setup() {
    const [alertIsVisible, showAlert, hideAlert] = useAlert();
    return {
      alertIsVisible,
      showAlert,
      hideAlert,
    };
  },
```

## NOTE

- **Mixins** works with Options API
- **Custom Composition** works with Composition API
