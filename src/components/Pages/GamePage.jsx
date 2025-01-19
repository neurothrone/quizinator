import {useEffect, useState} from "react";

const GamePage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("/data.json")
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error("Error loading data:", error));
  }, []);

  function onAnswerClicked(answer) {
    const question = questions[currentQuestion];
    if (answer === question.answer) {
      // TODO: Show the correct feedback
      alert("Correct!");
      setScore(score + 1);
    } else {
      // TODO: Show the incorrect feedback
      alert("Incorrect!");
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // TODO: Show the result page
      alert(`Game Over! Your score is ${score}`);
    }
  }
  return (
    <main>
      {questions.length === 0
        ? <p>Loading...</p>
        : <div>
          <h2>{questions[currentQuestion].question}</h2>
          <ul>
            {questions[currentQuestion].options.map((answer, index) => (
              <li key={index}>
                <button onClick={() => onAnswerClicked(answer)}>
                  {answer}
                </button>
              </li>
            ))}
          </ul>
        </div>}
    </main>
  );
};

export default GamePage;