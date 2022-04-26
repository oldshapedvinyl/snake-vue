<template>
    <div
        class="option"
        @click="changeOption"
    >
        <div class="option__description">
            <span>
                {{ option.description }}
            </span>
        </div>

        <div class="option__selector">
            <span>
                {{ option.current }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GameOption',
    props: {
        option: {
            type: Object,
            default: () => ({}),
        }
    },
    methods: {
        changeOption() {
            const { available, current } = this.option;
            const currentIndex = available.findIndex((avaliableOption) => current === avaliableOption);
            const nextIndex = this.getNextOptionIndex(available.length, currentIndex);

            this.option.current = available[nextIndex];
        },
        getNextOptionIndex(length, currentIndex) {
            const nextIndex = currentIndex + 1;

            return nextIndex < length ? nextIndex : 0;
        },
    }
}
</script>

<style scoped>
    .option {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        width: 100%;
        max-width: 300px;
        padding: 10px;
        margin-top: 30px;
        font-size: 22px;
        color: white;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px;
        border-radius: 10px;
        cursor: pointer;
    }

    .option:active {
        box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
        transform: scale(0.95);
    }

    .option__description {
        padding-right: 30px;
    }
</style>