<template>
    <div class="app-container">
        <ToolPanel
            style="z-index: 2; position: relative;"
            @options-btn="optionsButton"
        />

        <GameArea
            v-show="!state.game.isGameOver"
            style="z-index: 0; position: relative;"
            @keyboard-down="keyboardDown"
            @touch-start="touchStart"
            @touch-end="touchEnd"
            @touch-move="touchMove"
        />

        <GameOver
            v-show="state.game.isGameOver"
            style="z-index: 0; position: relative;"
            :hiscore="state.game.highestScore"
            @restart="restartGame"
        />

        <GameOptions
            v-if="state.game.isOptions"
            style="z-index: 1; position: absolute;"
            :options="state.settings"
            @apply-settings="applySettings"
        />
    </div>
</template>

<script>
import { useState } from '@src/store/index.js';

import Api from '@src/api/index.js';

import GameArea from '@src/components/game-area/GameArea.vue';
import GameOptions from '@src/components/game-options/GameOptions.vue';
import GameOver from '@src/components/game-over/GameOver.vue';
import ToolPanel from '@src/components/tool-panel/ToolPanel.vue';

export default {
    name: 'SnakeApp',
    components: {
        GameArea,
        GameOptions,
        GameOver,
        ToolPanel,
    },
    mounted() {
        this.applySettingsOnStartup();
    },
    methods: {
        applySettings(newSettings) {
            this.api.applySettings(newSettings);
        },
        applySettingsOnStartup() {
            this.api.applySettingsOnStartup();
        },
        keyboardDown(event) {
            this.api.keyDown(event);
        },
        optionsButton() {
            this.api.optionsButtonEvent();
        },
        restartGame() {
            this.api.restartGame();
        },
        touchEnd(event) {
            this.api.touchEnd(event);
        },
        touchMove(event) {
            this.api.touchMove(event);
        },
        touchStart(event) {
            this.api.touchStart(event);
        },
    },
    setup() {
        const state = useState();

        return {
            state,
            api: new Api(state)
        };
    },
};
</script>

<style scoped>
    @font-face {
        font-family: "Roboto";
        src: url("@src/assets/fonts/roboto.ttf") format("opentype");
    }

    * {
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .app-container {
        width: 100%;
        height: 100%;
        font-family: "Roboto", sans-serif;
        background-color: black;
    }
</style>