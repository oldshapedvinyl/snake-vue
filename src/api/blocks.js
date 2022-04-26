class Blocks {
    getBlockIndexByCoords(blocksList, block) {
        return blocksList.findIndex(({ x, y }) => block.x === x
            && block.y === y);
    }

    getBlockListWithoutBlock(blocksList, block) {
        const blocksListCopy = blocksList.map((block) => Object.assign({}, block));
        const targetBlockIndex = this.getBlockIndexByCoords(blocksListCopy, block);

        if (targetBlockIndex !== -1) {
            blocksListCopy.splice(targetBlockIndex, 1);
        }

        return blocksListCopy;
    }

    getAreaFilledWithBlocks({
        xCoordToStart,
        yCoordToStart,
        xFillingLength,
        yFillingLength,
    }) {
        const xCoordToEnd = xCoordToStart - 1 + xFillingLength;
        const yCoordToEnd = yCoordToStart - 1 + yFillingLength;
        const targetAreaBlocksList = [];

        for (let xCoord = xCoordToStart; xCoord <= xCoordToEnd; xCoord++) {
            for (let yCoord = yCoordToStart; yCoord <= yCoordToEnd; yCoord++) {
                targetAreaBlocksList.push({
                    x: xCoord,
                    y: yCoord,
                })
            }
        }

        return targetAreaBlocksList;
    }

    getBlockListWithoutBlocks(blocksList, blocksListToRemove) {
        let resultBlocksList = blocksList;

        for (let index = 0; index < blocksListToRemove.length; index++) {
            resultBlocksList = this.getBlockListWithoutBlock(resultBlocksList, blocksListToRemove[index]);
        }

        return resultBlocksList;
    }

    isBlockInGameArea({ x, y }, gameAreaSize) {
        return (x >= 1 && y >= 1 && x <= gameAreaSize && y <= gameAreaSize);
    }

    getGameAreaBlocksWithoutInnerBorder(gameArea, gameAreaSize) {
        return gameArea.filter(({ x, y }) => !(x === 1 || y === 1 || x === gameAreaSize || y === gameAreaSize));
    }

    getBlockWithBorderBlocks({ x, y }) {
        const resultBlocks = [];

        for (let xIndex = x - 1; xIndex <= x + 1; xIndex++) {
            for (let yIndex = y - 1; yIndex <= y + 1; yIndex++) {
                resultBlocks.push({ x: xIndex, y: yIndex });
            }
        }

        return resultBlocks;
    }

    getBlocksWithoutFirstBlock(blocksList) {
        return this.getBlockListWithoutBlock(blocksList, blocksList[0]);
    }
}

export default new Blocks();
