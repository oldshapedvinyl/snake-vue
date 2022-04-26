<template>
    <div class="tool-panel">
        <div class="tool-panel__tools tools">
            <div
                class="tools__button button"
                @click="$emit('options-btn')"
            >
                <img
                    class="button__icon"
                    :src="require('@src/assets/icons/wrench.png')"
                />
            </div>
        </div>

        <div class="tool-panel__info info">
            <div class="info__panel score-panel">
                {{ score }}
            </div>
        </div>
    </div>
</template>

<script>
import { useState } from '@src/store/index.js';

export default {
    name: 'ToolPanel',
    setup() {
        return { state: useState() };
    },
    computed: {
        isSettingsChanged() {
            return this.state.game.isOptionsChanged;
        },
        score() {
            return this.state.game.currentScore;
        },
    },
};
</script>

<style scoped>
    * {
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .tool-panel {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        height: 48px;
        padding: 0 15px;
        background-color: rgba(50, 205, 50, 0.8);
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px;
    }

    .tool-panel__tools {
        display: flex;
        box-sizing: border-box;
        padding-right: 10px;
    }

    .tools__button {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border-radius: 50%;
        overflow: hidden;
        width: 35px;
        height: 35px;
        margin-right: 10px;
        background-color: transparent;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
        cursor: pointer;
    }

    .tools__button:active {
        box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
    }

    .button__icon {
        width: auto;
        height: auto;
        flex-shrink: 0;
        max-width: 60%;
        max-height: 60%;
        pointer-events: none;
    }

    .tools__button:active .button__icon {
        max-width: 50%;
        max-height: 50%;
    }

    .tool-panel__info {
        box-sizing: border-box;
        padding-left: 10px;
        display: flex;
    }

    .info__panel {
        padding: 10px;
        font-size: 32px;
        color: white;
        font-weight: bold;
    }
</style>