<template>
    <div class="game-over">
        <div class="game-over__menu menu">
            <div class="menu__stats">
                Highest score: {{ hiscore }}
            </div>

            <div
                class="menu__option"
                @click="$emit('restart')"
            >
                New game!
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GameOver',
    props: {
        hiscore: {
            type: Number,
            default: 0,
        },
    },
}
</script>

<style scoped>
    .game-over {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: calc(100% - 48px);
        background-color: rgba(50, 205, 50, 0.8);
    }

    .game-over__menu {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .menu__stats {
        padding-bottom: 30px;
        color: white;
        font-size: 22px;
    }

    .menu__option {
        box-sizing: border-box;
        padding: 20px;
        font-size: 22px;
        color: white;
        background-color: transparent;
        text-transform: uppercase;
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px;
        border-radius: 10px;
    }
</style>