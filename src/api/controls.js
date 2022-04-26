class Controls {
    getKeyboardDirectionByKeyCodes() {
        return {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down',
        };
    }

    getKeyboardDirectionByKeyCode(keyboardCode) {
        return this.getKeyboardDirectionByKeyCodes()[keyboardCode];
    }

    canSwitchDirection(currentDirection, newDirection) {
        const directionBlockers = {
            up: 'down',
            down: 'up',
            left: 'right',
            right: 'left',
            none: 'left',
        };

        return newDirection !== directionBlockers[currentDirection];
    }

    getBlockNextCoordsByDirection(block, currentDirection) {
        const blockCopy = Object.assign({}, block);

        switch (currentDirection) {
            case 'up':
                blockCopy.y = blockCopy.y - 1;
                
                break;

            case 'down':
                blockCopy.y = blockCopy.y + 1;
                    
                break;

            case 'left':
                blockCopy.x = blockCopy.x - 1;
                    
                break;
    
            case 'right':
                blockCopy.x = blockCopy.x + 1;
                        
                break;
        
            default:
                break;
        }

        return blockCopy;
    }
}

export default new Controls();
