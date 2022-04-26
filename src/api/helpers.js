class Helpers {
    getRandomIntFromRange(min = 0, max = 1) {
        return min + Math.round(Math.random() * (max - min));
    }

    getRandomArrayIndex(array) {
        return this.getRandomIntFromRange(0, array.length - 1);
    }

    getRandomArrayElement(array) {
        return array[this.getRandomArrayIndex(array)];
    }
};

export default new Helpers();
