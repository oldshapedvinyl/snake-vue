<template>
    <div class="game-options options">
        <div class="options__description">
            Use arrow keys or swipe on game area to control the snake.
        </div>

        <GameOption
            v-for="option in optionsToApply"
            v-show="!option.isReadOnly"
            :key="option.description"
            :option="option"
        />

        <div
            class="options__apply"
            :class="[
                { 'options__apply_disabled': !isOptionsChanged }
            ]"
            @click="applySettings"
        >
            Apply settings
        </div>
    </div>
</template>

<script>
import GameOption from './GameOption.vue';

export default {
    name: 'GameOptions',
    components: { GameOption },
    props: {
        options: {
            type: Object,
            default: () => ({}),
        },
    },
    data() {
        return {
            optionsToApply: {},
        };
    },
    computed: {
        isOptionsChanged() {
            return JSON.stringify(this.options) !== JSON.stringify(this.optionsToApply); 
        }
    },
    mounted() {
        this.optionsToApply = JSON.parse(JSON.stringify(this.options));
    },
    methods: {
        applySettings() {
            this.$emit('apply-settings', this.optionsToApply);
        },
    }
}
</script>

<style scoped>
    .options {
        top: 48px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        align-items: center;
        width: 100%;
        height: 100%;
        height: calc(100% - 48px);
        padding: 30px 0;
        margin-bottom: 30px;
        background-color: seagreen;
        overflow-y: auto;
    }

    .options__description {
        text-align: center;
        box-sizing: border-box;
        font-size: 20px;
        color: white;
        padding: 20px;
    }

    .options__apply {
        box-sizing: border-box;
        padding: 10px;
        margin-top: 30px;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px;
        border-radius: 10px;
        text-transform: uppercase;
        color: white;
        cursor: pointer;
    }

    .options__apply.options__apply_disabled {
        opacity: 0.3;
        pointer-events: none;
    }
</style>