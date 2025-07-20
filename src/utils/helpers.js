function shuffleArray (arr) {
    const copyArr = [...arr];

    for (let i = copyArr.length-1; i>0; i--) {
        const j = Math.floor(Math.random()*(i+1));

        [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]]
    }

    return copyArr;
}

function formatTime (seconds) {
    const mins = Math.floor(seconds/60);
    const secs = seconds % 60;

    return `${mins}:${secs}`
}

export {shuffleArray, formatTime};