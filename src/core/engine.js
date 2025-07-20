import config, {DEFAULT_PLUGINS, MAX_QUESTIONS_PER_ROUND} from '../config.js';
import { shuffleArray as shuffle } from '../utils/helpers.js';
import Logger, {setLogLevel} from '../utils/logger.js';
import storage from './storage.js'


async function runQuiz (pluginList = DEFAULT_PLUGINS) {
    const logger = new Logger();
    const questions = [];
    
    for(const pluginName of pluginList) {
        const plugin = await import (`../../plugins/${pluginName}.js`);
        questions.push(...plugin.questions);
    }

    if (questions.length === 0) {
            logger.error('Не удалось загрузить ни одного вопроса');
        }

const shuffledQuestions = shuffle(questions).slice(0, MAX_QUESTIONS_PER_ROUND);
        let score = 0;
        let currentQuestionIndex = 0;

        return {
            getCurrentQuestion () {
                return shuffledQuestions[currentQuestionIndex];
            },

            checkAnswer (userAnswer) {
                const question = this.getCurrentQuestion();
                const isCorrect = question.answer === userAnswer;

                if(isCorrect) {
                    score++;
                    logger.log("Правильно!");
                } else {
                    logger.error("Неправильно");
                }

                return isCorrect;
            },

            nextQuestion () {
                currentQuestionIndex ++;
                return currentQuestionIndex < shuffledQuestions.length;
            },

            finishQuiz () {
                const result ={
                    score: score, //количество правильных ответов
                    total: shuffledQuestions.length, //всего вопросов
                    persantage: Math.round((score / shuffledQuestions.length) * 100) //правильных ответов в процентах
                } 

                storage.saveResult(result);
                return result;
            }
        }}

export {runQuiz};