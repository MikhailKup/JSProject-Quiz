// Questions
const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
	{
		question: "Что такое JavaScript?",
		answers: [
			"Язык, соответствующий стандарту ECMAScript.",
			"Язык программирования на стороне клиента",
			"Серверный язык программирования",
			"Всё перечисленное"
		],
		correct: 4,
	},
	{
		question: "Как вывести в консоль JavaScript код?",
		answers: [
			'alert("code")',
			'console.dir("code")',
			'console.log("code")',
			'prompt("code")',
		],
		correct: 3,
	},
	{
		question: "Как правильно написать массив JavaScript?",
		answers: [
			'const array = (1, 2, 3)',
			'const array = [1, 2, 3]',
			'let array = {1, 2, 3}',
			'to array(1, 2, 3)',
		],
		correct: 2,
	},
];

// Variables
let score = 0;
let questionIndex = 0;

// Elements
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

// Clean HTML
const cleanPage = () => {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
};
cleanPage();

// Show question
const showQuestion = () => {
	const newTitle = `
	<h2 class="title">${questions[questionIndex]['question']}</h2>
	`;
	headerContainer.insertAdjacentHTML('beforeend', newTitle);

	let anwearNum = 1;
	for (let value of questions[questionIndex]['answers']) {
		const newAnswear = `
		<li>
			<label>
				<input value="${anwearNum}" type="radio" class="answer" name="answer" />
				<span>${value}</span>
			</label>
		</li>
		`;
		listContainer.insertAdjacentHTML('beforeend', newAnswear);
		anwearNum++;
	}
};
showQuestion();

// Show subtitle
const showSubtitle = () => {
	if (headerContainer.querySelector('.subtitle')) {
		return;
	} else if (headerContainer.querySelector('#resultTitle')) {
		return;
	}
	const newSubtitle = `
	<h3 class="subtitle">Выберите вариант ответа</h3>
	`;
	headerContainer.insertAdjacentHTML('beforeend', newSubtitle);
};

// Show results
const showResults = () => {
	let title;
	let message;
	let result = `${score} правильных из ${questions.length}`;

	if (score === questions.length) {
		title = 'Поздравляем &#127881;';
		message = 'Вы ответили верно на все вопросы';
	} else if ((score * 100) / questions.length >= 50) {
		title = 'Неплохой результат &#128521;';
		message = 'Вы дали более половины правильных ответов';
	} else {
		title = 'Плохой результат &#128554;';
		message = 'Вам надо повторить учебный материал';
	}

	const newResult = `
		<h2 id="resultTitle" class="title">${title}</h2>
		<h3 class="summary">${message}</h3>
		<p class="result">${result}</p>
	`;
	headerContainer.insertAdjacentHTML('beforeend', newResult);

	submitBtn.blur();
	submitBtn.innerText = 'Начать заново';
	submitBtn.addEventListener('click', () => {
		history.go();
	});
};

// Check Answear
const checkAnswear = () => {
	const selectedRadio = listContainer.querySelector('input[type="radio"]:checked');
	if (!selectedRadio) {
		submitBtn.blur();
		showSubtitle();
		return;
	}

	const userAnswer = Number(selectedRadio.value);
	if (userAnswer === questions[questionIndex]['correct']) {
		score++;
	}

	if (questionIndex !== questions.length - 1) {
		questionIndex++;
		cleanPage();
		showQuestion();
	} else {
		cleanPage();
		showResults();
	}
};

submitBtn.addEventListener('click', () => {
	console.log('checkAnswear started!!!');
	console.log(score);
	checkAnswear();
});