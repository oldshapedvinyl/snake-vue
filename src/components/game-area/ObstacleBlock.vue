<template>
    <div class="obstacle-block">
        <img
            class="obstacle-block__sprite"
            :src="require('@src/assets/sprites/obstacle/obstacle.png')"
            alt="stop"
        >
    </div>
</template>

<script>
export default {
    name: 'ObstacleBlock',
}
</script>

<style scoped>
    .obstacle-block {
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        background-color: transparent;
        border-radius: 25%;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
    }

    .obstacle-block__sprite {
        flex-shrink: 0;
        max-width: 100%;
        max-height: 100%;
    }
</style>