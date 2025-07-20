class Logger {
    constructor (level = 'info') {
        this.level = level;
    }

    log(message) {
        console.log(`[LOG] ${message}`);
    }

    error(message) {
        console.error(`[ERROR] ${message}`)
    }
    
}

function setLogLevel(level) {
     console.log(`Уровень логов установлен ${level}`);
}

export default Logger;
export {setLogLevel};