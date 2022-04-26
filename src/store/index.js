import { reactive, inject } from 'vue';

import area from '@src/store/area-state.js';
import blocks from '@src/store/blocks-state.js';
import game from '@src/store/game-state.js';
import settings from '@src/store/settings-state.js';

export const stateSymbol = Symbol('state');
export const createState = () => reactive({
    area,
    blocks,
    game,
    settings,
});
export const useState = () => inject(stateSymbol);
