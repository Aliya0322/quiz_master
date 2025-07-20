import { runQuiz } from './engine.js';
import { RESULTS_KEY } from './storage.js';
import { DEFAULT_PLUGINS } from '../config.js';
import { formatTime } from '../utils/helpers.js';

function start() {
    const $themeSelector = $('#theme-selector');
    const $startBtn = $('#start-quiz'); 
    const $quizContainer = $('.quiz-container');
    let timerInterval; 


    $quizContainer.append(`
        <div id="quiz-screen" style="display:none;">
            <div id="timer">Время: 0:00</div>
            <div class="question" id="question"></div>
            <ul class="choices" id="choices"></ul>
            <div id="result-message"></div>
            <button id="next-btn">Следующий вопрос</button>
        </div>
        <div id="results-screen" style="display:none;">
            <h2>Результаты</h2>
            <div id="score"></div>
            <button id="restart-btn">Начать заново</button>
        </div>
    `);

    const $quizScreen = $('#quiz-screen');
    const $resultsScreen = $('#results-screen');
    const $timer = $('#timer');
    const $questionElement = $('#question');
    const $choicesElement = $('#choices');
    const $nextBtn = $('#next-btn');
    const $scoreElement = $('#score');
    const $restartBtn = $('#restart-btn');
    const $resultMessage = $('#result-message');

    $themeSelector.on('change', function() {
        $startBtn.prop('disabled', !$(this).val());
    });

    $startBtn.on('click', function() {
        const selectedTheme = $themeSelector.val();
        startQuiz(selectedTheme ? [selectedTheme] : DEFAULT_PLUGINS);
    });

    $restartBtn.on('click', function() {
    resetTimer();

    $quizContainer.children().hide(); 

    $themeSelector.show();
    $startBtn.show();
    
    $startBtn.prop('disabled', !$themeSelector.val());
});

    async function startQuiz(pluginsList) {
        try {
            $quizContainer.find('> *').hide();
            $quizScreen.show();
            
            const quiz = await runQuiz(pluginsList);
            let currentQuestion = 0;
            
            const showQuestion = () => {
                resetTimer();
                startTimer();
                
                const question = quiz.getCurrentQuestion();
                $questionElement.text(question.q);
                $choicesElement.empty();
                $resultMessage.text('').removeClass('correct wrong');
                
                question.choices.forEach((choice, index) => {
                    $('<li>')
                        .addClass('choice')
                        .text(choice)
                        .on('click', function() {
                            const isCorrect = quiz.checkAnswer(index);
                            $resultMessage
                                .text(isCorrect ? 'Правильно!' : 'Неправильно!')
                                .addClass(isCorrect ? 'correct' : 'wrong');
                            
                            $choicesElement.find('.choice').off('click').css('cursor', 'default');
                        })
                        .appendTo($choicesElement);
                });
            };
            
            $nextBtn.off('click').on('click', function() {
                if (quiz.nextQuestion()) {
                    showQuestion();
                } else {
                    finishQuiz(quiz);
                }
            });
            
            showQuestion();
        } catch (error) {
            console.error('Ошибка запуска викторины:', error);
            alert('Не удалось начать викторину. Пожалуйста, попробуйте ещё раз.');
        }
    }

    function startTimer() {
        let seconds = 30;
        
        resetTimer();
        
        $timer.text(`Время: ${formatTime(seconds)}`);
        
        timerInterval = setInterval(() => {
            seconds--;
            $timer.text(`Время: ${formatTime(seconds)}`);
            
            if (seconds <= 0) {
                resetTimer();
                $nextBtn.trigger('click');
            }
        }, 1000);
    }
    
    function resetTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
    }

    function finishQuiz(quiz) {
        resetTimer();
        
        const result = quiz.finishQuiz();
        
        $quizScreen.hide();
        $resultsScreen.show();
        
        $scoreElement.html(`
            <p>Правильных ответов: ${result.score} из ${result.total}</p>
            <p>Процент правильных: ${result.persantage}%</p>
        `); 
    }

    
}

export default start;