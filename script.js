const quizData = [
  {
    question: "What is the capital of India?",
    options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
    answer: "Delhi"
  },
  {
    question: "Which is the national animal of India?",
    options: ["Elephant", "Lion", "Tiger", "Leopard"],
    answer: "Tiger"
  },
  {
    question: "Which Indian city is known as the Pink City?",
    options: ["Jaipur", "Udaipur", "Bhopal", "Hyderabad"],
    answer: "Jaipur"
  },
  {
    question: "Who was the first Prime Minister of India?",
    options: [
      "Dr. B.R. Ambedkar",
      "Mahatma Gandhi",
      "Jawaharlal Nehru",
      "Subhash Chandra Bose"
    ],
    answer: "Jawaharlal Nehru"
  },
  {
    question: "Which river is considered the holiest in India?",
    options: ["Yamuna", "Godavari", "Narmada", "Ganga"],
    answer: "Ganga"
  }
];

const quizContainer = document.getElementById('quiz');
const submitBtn = document.getElementById('submit');
const resultContainer = document.getElementById('result');

function loadQuiz() {
  quizContainer.innerHTML = '';

  quizData.forEach((q, index) => {
    const qDiv = document.createElement('div');
    qDiv.classList.add('question');

    const questionTitle = document.createElement('p');
    questionTitle.innerHTML = `<strong>${index + 1}. ${q.question}</strong>`;
    qDiv.appendChild(questionTitle);

    const optionsDiv = document.createElement('div');
    optionsDiv.classList.add('options');

    q.options.forEach(option => {
      const label = document.createElement('label');

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `q${index}`;
      input.value = option;

      label.appendChild(input);
      label.appendChild(document.createTextNode(option));

      optionsDiv.appendChild(label);
    });

    qDiv.appendChild(optionsDiv);
    quizContainer.appendChild(qDiv);
  });
}

function getAnswers() {
  return quizData.map((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    return selected ? selected.value : null;
  });
}

function calculateScore(userAnswers) {
  let score = 0;
  userAnswers.forEach((ans, i) => {
    if (ans === quizData[i].answer) {
      score++;
    }
  });
  return score;
}

submitBtn.addEventListener('click', () => {
  const userAnswers = getAnswers();

  if (userAnswers.includes(null)) {
    alert("Please answer all questions before submitting!");
    return;
  }

  const score = calculateScore(userAnswers);
  let message = `🎉 You scored ${score} out of ${quizData.length}!`;

  if (score === quizData.length) {
    message += " 🌟 Incredible! You're a true Indian expert!";
  } else if (score >= 3) {
    message += " 💡 Good job! You know India pretty well!";
  } else {
    message += " 📚 Keep exploring India’s rich culture and history!";
  }

  resultContainer.innerHTML = message;
});

loadQuiz();
