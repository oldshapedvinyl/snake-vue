<template>
    <div
        class="snake-block"
        :style="blockStyle"
    ></div>
</template>

<script>
export default {
    name: 'SnakeBlock',
    props: {
        index: {
            type: Number,
            default: 0,
        },
        length: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        blockStyle() {
            const { index, length } = this;
            let scale = 0.9;

            if (index === 0) {
                scale = 1;
            }

            if (index === length - 1) {
                scale = 0.8;
            }

            return [
                { transform: `scale(${scale})` }
            ];
        },
    },
};
</script>

<style scoped>
    .snake-block {
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        background-color: transparent;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px;
        border-radius: 50%;
        background-color: yellow;
    }
</style>