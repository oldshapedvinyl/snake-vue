<template>
    <div class="food-block">
        <img
            class="food-block__sprite"
            :src="require(`@src/assets/sprites/food/${food.type}.png`)"
            alt="food"
        >
    </div>
</template>

<script>
export default {
    name: 'FoodBlock',
    props: {
        food: {
            type: Object,
            default: () => ({ type: 'cherry' }),
        },
    },
}
</script>

<style scoped>
    @keyframes food {
        from {
            transform: scale(1);
        }

        to {
            transform: scale(1);
        }

        50% {
            transform: scale(1.5);
        }
    }
    .food-block {
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        background-color: transparent;
    }

    .food-block__sprite {
        flex-shrink: 0;
        max-width: 100%;
        max-height: 100%;
        animation-duration: 2s;
        animation-name: food;
        animation-iteration-count: infinite;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px;
        border-radius: 25%;
    }
</style>