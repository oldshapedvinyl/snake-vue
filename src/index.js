import { createApp } from 'vue'
import SnakeApp from './SnakeApp.vue';

import { stateSymbol, createState } from '@src/store/index.js';
    
const app = createApp(SnakeApp);
app.provide(stateSymbol, createState());
app.mount('#snake-app');
