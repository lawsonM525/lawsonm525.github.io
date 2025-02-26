function startQuiz() {
    const name = document.getElementById('nameInput').value;
    const birthdate = document.getElementById('birthdateInput').value;
    
    if (!name || !birthdate) {
        alert('Please fill in all fields before starting! 💻');
        return;
    }

    document.getElementById('introSection').style.display = 'none';
    document.getElementById('quizSection').style.display = 'block';
}

function showResults() {
    // are all q's answered
    for (let i = 1; i <= 5; i++) {
        if (!document.querySelector(`input[name="q${i}"]:checked`)) {
            alert('Please answer all questions...');
            return;
        }
    }

    const name = document.getElementById('nameInput').value;
    const answers = {
        q1: document.querySelector('input[name="q1"]:checked').value,
        q2: document.querySelector('input[name="q2"]:checked').value,
        q3: document.querySelector('input[name="q3"]:checked').value,
        q4: document.querySelector('input[name="q4"]:checked').value,
        q5: document.querySelector('input[name="q5"]:checked').value
    };

    //  programming languages and their descriptions
    const languages = {
        'Python': {
            icon: '🐍',
            description: 'You are Python! Clean, readable, and very fun hehe - you love solving problems with simplicity. Your strength lies in data analysis, AI, and creating powerful applications with minimal code.'
        },
        'JavaScript': {
            icon: '🌐',
            description: 'You are JavaScript! Dynamic, flexible, and creative - you thrive in building interactive web applications. Your adaptability makes you perfect for both frontend and backend development.'
        },
        'Java': {
            icon: '☕',
            description: 'You are Java! Structured, reliable, and thorough - you excel at building robust enterprise applications. Your strong typing and object-oriented nature make you perfect for large-scale projects.'
        },
        'C++': {
            icon: '⚡',
            description: 'You are C++! Powerful, fast, and complex - you love optimizing performance and working close to the hardware. Game development and system programming are your natural habitats.'
        }
    };

    // Calculate language match based on answers
    let scores = {
        Python: 0,
        JavaScript: 0,
        Java: 0,
        'C++': 0
    };

    // Score calculation logic
    if (answers.q1 === 'structured') scores.Java += 2;
    if (answers.q1 === 'creative') scores.JavaScript += 2;
    if (answers.q1 === 'analytical') scores.Python += 2;
    if (answers.q1 === 'visual') scores['C++'] += 2;

    if (answers.q2 === 'web') scores.JavaScript += 2;
    if (answers.q2 === 'data') scores.Python += 2;
    if (answers.q2 === 'mobile') scores.Java += 2;
    if (answers.q2 === 'game') scores['C++'] += 2;

    if (answers.q3 === 'team') scores.Java += 1;
    if (answers.q3 === 'solo') scores['C++'] += 1;
    if (answers.q3 === 'pair') scores.JavaScript += 1;
    if (answers.q3 === 'community') scores.Python += 1;

    if (answers.q4 === 'simple') scores.Python += 2;
    if (answers.q4 === 'complex') scores['C++'] += 2;
    if (answers.q4 === 'flexible') scores.JavaScript += 2;
    if (answers.q4 === 'structured') scores.Java += 2;

    if (answers.q5 === 'ai') scores.Python += 2;
    if (answers.q5 === 'ui') scores.JavaScript += 2;
    if (answers.q5 === 'backend') scores.Java += 2;
    if (answers.q5 === 'mobile') scores['C++'] += 2;

    // fidnding the language with highest score
    let maxScore = Math.max(...Object.values(scores));
    let matchedLanguage = Object.keys(scores).find(key => scores[key] === maxScore);

    // Show results
    document.getElementById('quizSection').style.display = 'none';
    document.getElementById('resultsSection').style.display = 'block';
    document.getElementById('resultText').innerHTML = `
        <div class="language-icon">${languages[matchedLanguage].icon}</div>
        <h3>Hey ${name}!</h3>
        <p><strong>${matchedLanguage}</strong></p>
        <p>${languages[matchedLanguage].description}</p>
        <p>Time to start coding! 💻✨</p>
    `;
}

function resetQuiz() {
    // Reset all form elements
    document.getElementById('nameInput').value = '';
    document.getElementById('birthdateInput').value = '';
    
    // Uncheck all radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });

    // Show intro section
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('quizSection').style.display = 'none';
    document.getElementById('introSection').style.display = 'block';
}
