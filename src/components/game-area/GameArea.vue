<template>
    <div class="wrapper">
        <div
            class="game-area"
            :style="areaSizeStyle"
        >
            <SnakeBlock
                v-for="(snakeBlock, index) in state.blocks.snake"
                :key="snakeBlock.key"
                class="block"
                :style="getSnakeBlockStyle(snakeBlock)"
                :index="index"
                :length="state.blocks.snake.length"
            ></SnakeBlock>

            <ObstacleBlock
                v-for="obstacleBlock in state.blocks.obstacles"
                :key="obstacleBlock.key"
                class="block"
                :style="getBlockDefaultStyle(obstacleBlock)"
            ></ObstacleBlock>

            <FoodBlock
                v-for="foodBlock in state.blocks.food"
                :key="foodBlock.key"
                class="block"
                :style="getBlockDefaultStyle(foodBlock)"
                :food="foodBlock"
            ></FoodBlock>

            <div class="event-zone"></div>
        </div>
    </div>
</template>

<script>
import FoodBlock from '@src/components/game-area/FoodBlock.vue';
import ObstacleBlock from '@src/components/game-area/ObstacleBlock.vue';
import SnakeBlock from '@src/components/game-area/SnakeBlock.vue';

import { useState } from '@src/store/index.js';

export default {
    name: 'GameArea',
    components: { FoodBlock, ObstacleBlock, SnakeBlock },
    setup() {
        return {
            state: useState(),
        };
    },
    data() {
        return {
            areaSizePx: 0,
        };
    },
    computed: {
        areaSizeStyle() {
            return [
                { width: `${this.areaSizePx}px` },
                { height: `${this.areaSizePx}px` },
            ];
        },
        areaCoordsMultiplier() {
            const { current } = this.state.settings.gameAreaSize;

            return 100 / current;
        },
    },
    methods: {
        getSizePx() {
            const { innerWidth, innerHeight } = window;
            const innerHeightWithoutToolPanel = innerHeight - 48;
            const size = innerWidth > innerHeightWithoutToolPanel
                ? innerHeightWithoutToolPanel
                : innerWidth;

            return size;
        },
        setSizePx() {
            this.areaSizePx = this.getSizePx();
        },
        resizeEventInit() {
            this.setSizePx();

            window.addEventListener('resize', this.setSizePx);
        },
        getBlockDefaultStyle(block) {
            return [
                { left: `${this.areaCoordsMultiplier * (block.x - 1)}%` },
                { top: `${this.areaCoordsMultiplier * (block.y - 1)}%` },
                { width: `${this.areaCoordsMultiplier}%` },
                { height: `${this.areaCoordsMultiplier}%` },
            ];
        },
        getSnakeBlockStyle(block) {
            const defaultStyle = this.getBlockDefaultStyle(block);
            const currentSpeed = this.state.settings.maxSpeedMsToReduce.current - this.state.game.currentSpeed;
            
            return defaultStyle.concat([
                { transition: `top ${currentSpeed}ms linear, left ${currentSpeed}ms linear` }
            ]);
        },
    },
    mounted() {
        this.resizeEventInit();

        window.addEventListener('keydown', (event) => this.$emit('keyboard-down', event));
        window.addEventListener('touchend', (event) => this.$emit('touch-end', event));
        document.querySelector('.event-zone')
            .addEventListener('touchstart', (event) => this.$emit('touch-start', event), false);
        document.querySelector('.event-zone')
            .addEventListener('touchmove', (event) => this.$emit('touch-move', event), false);
    },
};
</script>

<style scoped>
    .wrapper {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: calc(100% - 48px);
    }

    .game-area {
        position: relative;
        background-color: rgba(50, 205, 50, 0.8);
    }

    .event-zone {
        pointer-events: all;
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .block {
        position: absolute;
    }
</style>