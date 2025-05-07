document.addEventListener('DOMContentLoaded', () => {
  const quizForm = document.getElementById('quizForm');
  const resultDiv = document.getElementById('result');
  const progressBar = document.getElementById('progress-bar');
  const chatbox = document.getElementById('chatbox');
  const userInput = document.getElementById('userInput');
  const sendBtn = document.getElementById('sendBtn');

  const totalQuestions = 5;
  let answeredQuestions = 0;

  quizForm.addEventListener('change', () => {
    const answered = quizForm.querySelectorAll('input[type="radio"]:checked').length;
    answeredQuestions = answered;
    const progress = (answered / totalQuestions) * 100;
    progressBar.style.width = `${progress}%`;
  });

  quizForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const answers = {
      problemSolving: document.querySelector('input[name="q1"]:checked').value,
      dataInterest: document.querySelector('input[name="q2"]:checked').value,
      creativeDesign: document.querySelector('input[name="q3"]:checked').value,
      teamwork: document.querySelector('input[name="q4"]:checked').value,
      troubleshooting: document.querySelector('input[name="q5"]:checked').value,
    };

    let scores = {
      'Software Engineer': 0,
      'UI/UX Designer': 0,
      'Data Analyst': 0,
      'Cybersecurity Specialist': 0,
      'Content Writer': 0
    };

    if (answers.problemSolving === 'yes') scores['Software Engineer'] += 2;
    if (answers.dataInterest === 'yes') scores['Data Analyst'] += 2;
    if (answers.creativeDesign === 'yes') scores['UI/UX Designer'] += 2;
    if (answers.teamwork === 'yes') scores['Cybersecurity Specialist'] += 1;
    if (answers.troubleshooting === 'yes') scores['Software Engineer'] += 1;

    let recommendedCareer = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

    const careerDetails = {
      'Software Engineer': {
        description: 'Develops and maintains software applications.',
        skills: ['Programming', 'Problem-solving', 'Algorithms'],
        averageSalary: '$80,000 - $120,000'
      },
      'UI/UX Designer': {
        description: 'Designs user interfaces and ensures a seamless user experience.',
        skills: ['Creativity', 'Design Tools', 'User Testing'],
        averageSalary: '$60,000 - $100,000'
      },
      'Data Analyst': {
        description: 'Analyzes data to provide actionable insights for decision-making.',
        skills: ['Data Analysis', 'Statistics', 'Programming'],
        averageSalary: '$55,000 - $90,000'
      },
      'Cybersecurity Specialist': {
        description: 'Protects systems and networks from cyber threats.',
        skills: ['Cybersecurity', 'Risk Management', 'Network Security'],
        averageSalary: '$70,000 - $110,000'
      },
      'Content Writer': {
        description: 'Creates engaging and informative content for various platforms.',
        skills: ['Writing', 'Research', 'Communication'],
        averageSalary: '$40,000 - $70,000'
      },
    };

    const details = careerDetails[recommendedCareer];
    resultDiv.innerHTML = `
      <h2>Recommended Career Path: ${recommendedCareer}</h2>
      <p>${details.description}</p>
      <p><strong>Key Skills:</strong> ${details.skills.join(', ')}</p>
      <p><strong>Average Salary:</strong> ${details.averageSalary}</p>
      <a href="mailto:?subject=My Career Recommendation&body=I have been recommended to pursue a career as a ${recommendedCareer}.">Email My Results</a>
    `;
  });

  sendBtn.addEventListener('click', () => {
    const userText = userInput.value.trim();
    if (userText === '') return;

    chatbox.innerHTML += `<p><strong>You:</strong> ${userText}</p>`;
    const botResponse = getChatbotResponse(userText);
    chatbox.innerHTML += `<p><strong>Bot:</strong> ${botResponse}</p>`;
    userInput.value = '';
    chatbox.scrollTop = chatbox.scrollHeight;
  });

  function getChatbotResponse(userInput) {
    userInput = userInput.toLowerCase();
    if (userInput.includes('salary')) {
      return 'Salaries vary by location and experience. For example, Software Engineers earn between $80,000 and $120,000.';
    } else if (userInput.includes('skills')) {
      return 'Key skills include programming, problem-solving, and teamwork.';
    } else {
      return 'I can help you with information about various careers. Ask me about salary, skills, or job roles.';
    }
  }
});
