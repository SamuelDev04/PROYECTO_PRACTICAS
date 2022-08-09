/* Creamos constantes o variables, y en cada una almacenamos un elemento
traido por el id */
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElements = document.getElementById('question-container')
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

/* Escuchamos el evento del boton de start, que debe ser click */
startButton.addEventListener('click', startGame);
/* Escuchamos el evento del boton de next, que debe ser click 
y definimos la accion que realizara*/
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

// Funcion para iniciar el juego
function startGame() {
  // Ocultamos el boton de start
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  // Y mostramos el contenedor de preguntas
  questionContainerElements.classList.remove('hide');
  setNextQuestion();
}

// Funcion para la siguiente pregunta
function setNextQuestion() {
  // Reseteamos las preguntas
  resetState();
  // Y mostramos otra pregunta
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Funcion para mostrar la pregunta
function showQuestion(question) {
  // Se muestra el texto (La pregunta)
  questionElement.innerText = question.question;
  // Por cada respuesta que definamos abajo, se creará un boton
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    // Evaluamos si la respuesta es correcta
    if (answer.correct) {
        button.dataset.correct = answer.correct;
    }
    // Escuchamos el evento (Que respuesta se selecciono)
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  })
}

// Funcion para resetear las preguntas
function resetState() {
  // Limpiamos las clases (correct, wrong) de todo el body
  clearStatusClass(document.body);
  // Ocultamos el boton de next
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

// Funcion para la respuesta correcta
function selectAnswer(e) {
  // Creamos dos constantes una para traer el boton 
  // y la otra para definir el correcto
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  // Ponemos el body de color verde
  setStatusClass(document.body, correct);
  // Creamos una instancia de array a partir de un objeto iterable
  Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct);
  })
  // Mientras que las preguntas barajadas sea menor que las preguntas
  // Se mostrara el boton de next
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    // Si lo anterior no se cumple, cambiamos el nombre del boton a restart
    startButton.innerText = `Restart`;
    startButton.classList.remove('hide');
  }
}

// Funcion para definir la clase correct
function setStatusClass(element, correct) {
  clearStatusClass(element);
  // Si es correct, añadimos la clase correct al elemento
  if (correct) {
    element.classList.add('correct');
  } else {
    // Si no es correct, añadimos la clase wrong al elemento
    element.classList.add('wrong');
  }
}

// Funcion para eliminar las clases (correct, wrong) 
function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

// Estas son las preguntas
const questions = [
    {
      // Se define la pregunta
      question: 'Cuanto es 2 + 2?',
      // Se definen las respuestas
      answers: [
        { text: '4', correct: true },
        { text: '22', correct: false }
      ]
    },
    {
      question: 'Cual es un lenguaje para IA?',
      answers: [
        { text: 'CSS', correct: false },
        { text: 'HTML', correct: false },
        { text: 'PYTHON', correct: true },
        { text: 'REACT.JS', correct: false }
      ]
    },
    {
      question: 'Cual lenguaje es mas facil?',
      answers: [
        { text: 'HTML', correct: true },
        { text: 'JAVASCRIPT', correct: true },
        { text: 'PHP', correct: true },
        { text: 'PYTHON', correct: true }
      ]
    },
    {
      question: 'Cuanto es 4 * 3',
      answers: [
        { text: '13', correct: false },
        { text: '18', correct: false },
        { text: '12', correct: true },
        { text: '7', correct: false }
      ]
    }
  ]