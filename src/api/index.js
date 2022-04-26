import Blocks from './blocks.js';
import Helpers from './helpers.js';
import Controls from './controls.js';

class Api {
    constructor(state) {
        this.state = state;
    }

    // State geters
    _getCurrentDirection() {
        return this.state.game.currentDirection;
    }

    _getCurrentScore() {
        return this.state.game.currentScore;
    }

    _getCurrentSpeed() {
        return this.state.game.currentSpeed;
    }

    _getDefaultSpeed() {
        return this.state.game.defaultSpeed;
    }

    _getFoodBlocks() {
        return this.state.blocks.food;
    }

    _getGameAreaBlocks() {
        return this.state.area.gameAreaBlocks;
    }

    _getHighestScore() {
        return this.state.game.highestScore;
    }

    _getObstacleBlocks() {
        return this.state.blocks.obstacles;
    }

    _getOptionsChangedStatus() {
        return this.state.game.isOptionsChanged;
    }

    _getRespawnAreaBlocks() {
        return this.state.area.respawnAreaBlocks;
    }

    _getSettingAvailableValues(settingName) {
        return JSON.parse(JSON.stringify(this.state.settings[settingName].available));
    }

    _getSettingCurrentValue(settingName) {
        return this.state.settings[settingName].current;
    }

    _getSnakeBlocks() {
        return this.state.blocks.snake;
    }

    // State setters
    _setCurrentDirection(newDirection) {
        this.state.game.currentDirection = newDirection;
    }

    _setCurrentScore(newScore) {
        this.state.game.currentScore = newScore;
    }

    _setCurrentSpeed(newSpeed) {
        this.state.game.currentSpeed = newSpeed;
    }

    _setDirectionSwipeAbility(canSwipeDirection) {
        this.state.game.canSwipeDirection = canSwipeDirection;
    }

    _setDirectionSwitchAbility(canSwitchDirection) {
        this.state.game.canSwitchDirection = canSwitchDirection;
    }

    _setGameAreaBlocks(newAreaBlocks) {
        this.state.area.gameAreaBlocks = newAreaBlocks;
    }

    _setFoodBlocks(newFoodBlocks) {
        this.state.blocks.food = newFoodBlocks;
    }

    _setGameOptionsScreen(isOptions) {
        this.state.game.isOptions = isOptions;
    }

    _setGameOverStatus(isGameOver) {
        this.state.game.isGameOver = isGameOver;
    }

    _setGamePauseStatus(isGamePaused) {
        this.state.game.isGamePaused = isGamePaused;
    }

    _setHighestScore(newScore) {
        this.state.game.highestScore = newScore;
    }

    _setObstacleBlocks(obstacles) {
        this.state.blocks.obstacles = obstacles;
    }

    _setOptions(newSettings) {
        this.state.settings = newSettings;
    }

    _setOptionsChangedStatus(newStatus) {
        this.state.game.isOptionsChanged = newStatus;
    }

    _setRespawnAreaBlocks(newRespawnBlocks) {
        this.state.area.respawnAreaBlocks = newRespawnBlocks;
    }

    _setSettingCurrentValue(settingName, newValue) {
        this.state.settings[settingName].current = newValue;
    }

    _setSnakeBlocks(newSnake) {
        this.state.blocks.snake = newSnake;
    }

    _setTouchStartControl(newCoords) {
        this.state.game.touchStartControl = newCoords;
    }

    // Generating objects
    _generateGameArea() {
        const gameAreaSize = this._getSettingCurrentValue('gameAreaSize');
        const gameArea = Blocks.getAreaFilledWithBlocks({
            xCoordToStart: 1,
            yCoordToStart: 1,
            xFillingLength: gameAreaSize,
            yFillingLength: gameAreaSize,
        });

        this._setGameAreaBlocks(gameArea);
    }

    _generateRespawnZone() {
        const { snakeInitialSize } = this.state.game;
        const respawnArea = Blocks.getAreaFilledWithBlocks({
            xCoordToStart: 1,
            yCoordToStart: 1,
            xFillingLength: snakeInitialSize + 2,
            yFillingLength: 3,
        });

        this._setRespawnAreaBlocks(respawnArea);
    }

    _generateObstacles() {
        const reservedBlocks = this._getRespawnAreaBlocks().concat(this._getFoodBlocks());
        const allAreaBlocks = Blocks
            .getGameAreaBlocksWithoutInnerBorder(
                this._getGameAreaBlocks(),
                this._getSettingCurrentValue('gameAreaSize'),
            );

        let freeArea = Blocks.getBlockListWithoutBlocks(allAreaBlocks, reservedBlocks);

        const obstacles = [];

        for (let index = 0; index < this._getSettingCurrentValue('obstacles'); index++) {
            const newObstacle = Helpers.getRandomArrayElement(freeArea);
            const newObstacleWithBorders = Blocks.getBlockWithBorderBlocks(newObstacle);

            obstacles.push(newObstacle);
            freeArea = Blocks.getBlockListWithoutBlocks(freeArea, newObstacleWithBorders);
        }

        this._setObstacleBlocks(obstacles);
    }

    _generateSnake() {
        const { snakeInitialSize } = this.state.game;
        const snake = Blocks.getAreaFilledWithBlocks({
            xCoordToStart: 2,
            yCoordToStart: 2,
            xFillingLength: snakeInitialSize,
            yFillingLength: 1,
        }).reverse();

        this._setSnakeBlocks(snake);
    }

    _generateFood() {
        const foodBlocks = [];
        const allArea = Blocks.getGameAreaBlocksWithoutInnerBorder(
            this._getGameAreaBlocks(),
            this._getSettingCurrentValue('gameAreaSize')
        );
        const reservedBlocks = this._getSnakeBlocks().concat(this._getObstacleBlocks())
        let freeArea = Blocks.getBlockListWithoutBlocks(allArea, reservedBlocks);

        for (let index = 0; index < this._getSettingCurrentValue('food'); index++) {
            const newFoodBlock = Helpers.getRandomArrayElement(freeArea);
            newFoodBlock.type = this._getFoodType();
            freeArea = Blocks.getBlockListWithoutBlock(freeArea, newFoodBlock);

            foodBlocks.push(newFoodBlock);
        }

        this._setFoodBlocks(foodBlocks);
    }

    // Basic game logic
    _getFoodType() {
        const spriteNames = ['cherry', 'apple', 'banana', 'orange', 'pineapple'];

        return Helpers.getRandomArrayElement(spriteNames);
    }

    _getAreaFreeForFoodSpawn(snakeBlocks, obstaclesBlocks, foodBlocks) {
        const reservedBlocks = snakeBlocks
            .concat(obstaclesBlocks)
            .concat(foodBlocks);

        const allArea = Blocks.getGameAreaBlocksWithoutInnerBorder(
            this._getGameAreaBlocks(),
            this._getSettingCurrentValue('gameAreaSize'),
        );

        return Blocks.getBlockListWithoutBlocks(allArea, reservedBlocks);
    }

    _getCalculatedScoreIncrease() {
        const obstaclesMultiplier = 8;
        const gameAreaSizeMiltiplier = 5;
        const availableGameAreaSizes = this._getSettingAvailableValues('gameAreaSize');
        const areaPointsReducer = Math.max.apply(null, availableGameAreaSizes);
        const gameAreaSize = this._getSettingCurrentValue('gameAreaSize');
        const { length } = this._getObstacleBlocks();

        const isLowObstacles = length <= 3;
        const initialValue = isLowObstacles === 0 ? 80 : 100;

        return (initialValue + (length * obstaclesMultiplier) + ((areaPointsReducer - gameAreaSize) * gameAreaSizeMiltiplier));
    }

    _getHistoricalHighestScore() {
        const highestScore = localStorage.getItem('hiscore');

        if (!!highestScore) {
            return Number(highestScore);
        }

        return 0;
    }

    _getIncreasedSpeed(increaseValue = 0) {
        return this._getCurrentSpeed() + increaseValue;
    }

    _getStepTimeout() {
        return this._getSettingCurrentValue('maxSpeedMsToReduce') - this._getCurrentSpeed();
    }

    _increaseSpeed() {
        this._setCurrentSpeed(this._getIncreasedSpeed(5));
    }

    _increaseScore() {
        this._setCurrentScore(this._getCurrentScore() + this._getCalculatedScoreIncrease());
    }

    _getNextStepSnakeHead() {
        const snakeHead = this._getSnakeBlocks()[0];
        
        if (snakeHead !== undefined) {
            const currentDirection = this._getCurrentDirection();

            return Controls.getBlockNextCoordsByDirection(snakeHead, currentDirection);
        }

        return { x: -1, y: -1 };
    }

    _getNextStepSnakeBlocks(currentSnakeBlocks, nextStepSnakeHead, isFood = false) {
        const currentSnakeCopy = currentSnakeBlocks.map((block) => Object.assign({}, block));
        const length = isFood ? currentSnakeCopy.length : currentSnakeCopy.length - 1
        const nextStepSnakeBodyBlocks = [];
        
        for (let index = 1; index <= length; index++) {
            nextStepSnakeBodyBlocks.push(currentSnakeCopy[index - 1]);
        }


        return [nextStepSnakeHead].concat(nextStepSnakeBodyBlocks);
    }

    _isSnakeHeadValidCoords(snakeHead, nextStepSnakeBlocks) {
        const isInArea = Blocks.isBlockInGameArea(snakeHead, this._getSettingCurrentValue('gameAreaSize'));

        if (!isInArea) {
            return false;
        }

        const invalidBlocks = this._getObstacleBlocks()
            .concat(Blocks.getBlocksWithoutFirstBlock(nextStepSnakeBlocks));


        return Blocks.getBlockIndexByCoords(invalidBlocks, snakeHead) === -1;
    }

    _spawnNewFood(snakeBlocks, foodBlocks) {
        const obstaclesBlocks = this._getObstacleBlocks();
        const freeArea = this._getAreaFreeForFoodSpawn(snakeBlocks, obstaclesBlocks, foodBlocks);
        const newFoodBlock = Helpers.getRandomArrayElement(freeArea);
        newFoodBlock.type = this._getFoodType();

        this._setFoodBlocks(foodBlocks.concat([newFoodBlock]));
    }

    _eatFood(foodBlocks, foodToEat) {
        const foodBlocksWithoutBlockToEat = Blocks.getBlockListWithoutBlock(foodBlocks, foodToEat);

        this._setFoodBlocks(foodBlocksWithoutBlockToEat);
    }

    _setHistoricalHighestScore() {
        const currentScore = this._getCurrentScore();
        const highestScore = this._getHistoricalHighestScore();
        const scoreToSet = highestScore > currentScore ? highestScore : currentScore;

        this._setHighestScore(scoreToSet);
        localStorage.setItem('hiscore', scoreToSet);
    }

    _moveSnakeBySingleStep() {
        const timeoutMs = this._getStepTimeout();

        if (this.state.game.isGameOver) {
            return;
        }

        if (this.state.game.isGamePaused) {
            setTimeout(() => this._moveSnakeBySingleStep(), timeoutMs);

            return;
        }

        const currentSnake = this._getSnakeBlocks();
        const nextStepSnakeHead = this._getNextStepSnakeHead();
        const currentFoodBlocks = this._getFoodBlocks();
        const foodBlockToEatIndex = Blocks.getBlockIndexByCoords(currentFoodBlocks, nextStepSnakeHead);
        const isFood = foodBlockToEatIndex !== -1;
        const nextStepSnakeBlocks = this._getNextStepSnakeBlocks(currentSnake, nextStepSnakeHead, isFood);
        const isValidNextStep = this
            ._isSnakeHeadValidCoords(nextStepSnakeHead, nextStepSnakeBlocks);

        if (isValidNextStep) {
            if (isFood) {
                this._eatFood(currentFoodBlocks, currentFoodBlocks[foodBlockToEatIndex]);
                this._spawnNewFood(nextStepSnakeBlocks, this._getFoodBlocks());
                this._increaseScore();
                this._increaseSpeed();
            }

            this._setDirectionSwitchAbility(true);
            this._setSnakeBlocks(nextStepSnakeBlocks);

            setTimeout(() => this._moveSnakeBySingleStep(), timeoutMs);

            return;
        }

        if (this._getCurrentDirection() !== 'none') {
            this._setGameOverStatus(true);
            this._setHistoricalHighestScore();
        }
    }

    // Global game logic
    _resetObjects() {
        this._setObstacleBlocks([]);
        this._setSnakeBlocks([]);
        this._setFoodBlocks([]);
    }

    _resetArea() {
        this._setGameAreaBlocks([]);
        this._setRespawnAreaBlocks([]);
    }

    _resetGameState() {
        this._setCurrentDirection('none');
        this._setDirectionSwitchAbility(true);
        this._setDirectionSwipeAbility(true);
        this._setCurrentScore(0);
        this._setCurrentSpeed(this._getDefaultSpeed());
    }

    _resetGame() {
        this._resetGameState();
        this._resetArea();
        this._resetObjects();
    }

    _generateArea() {
        this._generateGameArea();
        this._generateRespawnZone();
    }

    _generateObjects() {
        this._generateObstacles();
        this._generateSnake();
        this._generateFood();
    }

    _generateGame() {
        this._generateArea();
        this._generateObjects();
    }

    // UI
    _openOptionsScreen() {
        this._setGamePauseStatus(true);
        this._setGameOptionsScreen(true);
    }

    _closeOptionsScreen() {
        this._setGamePauseStatus(false);
        this._setGameOptionsScreen(false); 
    }

    // Public methods
    applySettings(newSettings) {
        localStorage.setItem('settings', JSON.stringify(newSettings));

        this._setOptions(newSettings);
        this.restartGame();
        this._closeOptionsScreen();
    }

    applySettingsOnStartup() {
        const savedSettings = localStorage.getItem('settings');

        if (!!savedSettings) {
            const currentSettings = this.state.settings;
            const newSettings = JSON.parse(savedSettings);

            for (let key in newSettings) {
                if (currentSettings[key]) {
                    this._setSettingCurrentValue(key, newSettings[key].current);
                }
            }
        }

        this._setHistoricalHighestScore();
    }

    keyDown(event) {
        if (!this.state.game.canSwitchDirection) {
            return;
        }

        const newDirection = Controls.getKeyboardDirectionByKeyCode(event.keyCode);

        if (newDirection === undefined) {
            return;
        }

        const prevDirection = this._getCurrentDirection();
        const canSwitch = Controls.canSwitchDirection(prevDirection, newDirection);

        if (!canSwitch) {
            return;
        }

        this._setCurrentDirection(newDirection);
        this._setDirectionSwitchAbility(false);

        if (prevDirection === 'none' && !this.state.game.isGameOver) {
            this._moveSnakeBySingleStep();
        }
    }

    optionsButtonEvent() {
        if (this.state.game.isOptions) {
            this._closeOptionsScreen();

            return;
        }

        this._openOptionsScreen();
    }

    restartGame() {
        this._resetGame();
        this._generateGame();
        this._setGameOverStatus(false);
    }

    touchEnd() {
        this._setDirectionSwipeAbility(true);
    }

    touchMove(event) {
        event.preventDefault();

        if (!this.state.game.canSwipeDirection) {
            return;
        }

        const deltaTriggerPx = 5;
        const { currentDirection, touchStartControl } = this.state.game;

        let newDirection = 'none';

        const offsetX = touchStartControl.x - event.touches[0].pageX;
        const offsetY = touchStartControl.y - event.touches[0].pageY;

        if (offsetX > deltaTriggerPx) {
            newDirection = 'left';
        }

        if (offsetX < -deltaTriggerPx) {
            newDirection = 'right';
        }

        if (offsetY > deltaTriggerPx) {
            newDirection = 'up';
        }

        if (offsetY < -deltaTriggerPx) {
            newDirection = 'down';
        }
        
        if (newDirection === 'none') {
            return;
        }

        if (Controls.canSwitchDirection(currentDirection, newDirection)) {
            this._setCurrentDirection(newDirection);
            this._setDirectionSwitchAbility(false);
            this._setDirectionSwipeAbility(false);
        } else {
            return;
        }

        if (currentDirection === 'none' && !this.state.game.isGameOver) {
            this._moveSnakeBySingleStep();
        }
    }

    touchStart(event) {
        event.preventDefault();

        this._setTouchStartControl({
            x: event.touches[0].pageX,
            y: event.touches[0].pageY,
        });
    }
}

export default Api;
