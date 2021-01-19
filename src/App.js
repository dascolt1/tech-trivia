import React, { useState, useEffect } from 'react'
import './App.css';
import Question from './components/Question';
import Answer from './components/Answer';
import Scoreboard from './components/Scoreboard';
import axios from 'axios';

function App() {

  //API key for quizapi.io
  const API_KEY = 'PmqvrSzNeY5KwlfXaMHbEFfqzT0SkZUZUsINQDEV'

  //sets question state
  const [question, setQuestion] = useState("Loading...");
  const [answers, setAnswers] = useState({});
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);

  //acts as componentDidMount to fetch random question on page load
  useEffect(() => {
    questionHandler();
    const savedScore = localStorage.getItem('score');
    const savedLives = localStorage.getItem('lives');
    //setScore(parseInt(savedScore));
    //setLives(parseInt(savedLives));
  }, []);

  useEffect(() => {
    localStorage.setItem('score', score);
    localStorage.setItem('lives', lives);
  }, [score, lives]);

   

  //sets questions into state using axios GET request
  const questionHandler = () => {
    axios.get(`https://quizapi.io/api/v1/questions?apiKey=${API_KEY}`)
    .then(blob => {
      let randomQuestion = generateRandomNumber(blob.data.length);
      if(blob.data[randomQuestion].multiple_correct_answers === 'false' && blob.data[randomQuestion].correct_answer !== null) {
        setQuestion(blob.data[randomQuestion].question);
        const api_answers = blob.data[randomQuestion].answers;
        setAnswers({...answers,
          answer_a: api_answers.answer_a, answer_b:api_answers.answer_b, answer_c: api_answers.answer_c, answer_d: api_answers.answer_d
        })
        getCorrectAnswer(blob.data[randomQuestion].correct_answers);
      }else {
        questionHandler();
      }
    })
    .catch(err => setQuestion("Looks like trouble... try refreshing!"))
  }

  //helper function to generate random number 
  function generateRandomNumber(limit) {
    return Math.floor((Math.random() * limit) + 1);
  }

  //helper function to get correct answer
  function getCorrectAnswer(answerObj){
    Object.keys(answerObj).map(key => {
      if(answerObj[key] === "true"){
        return setCorrectAnswer(`answer_${key[7]}`);
      }
      return null;
    })
  }

  //function to allow players play again
  function playAgain() {
    setLives(5);
    setScore(0);
    questionHandler();
  }

  //renders gameboard if player still has lives left
  //renders final score when all lives are used
  if(lives !== 0){
    return (
      <div className="App">
        <h1 className="title">Tech Trivia</h1>
        <div className="card">
          <Scoreboard 
          score={score} 
          lives={lives}
          />
            <Question 
            question={question} 
            />
            <Answer 
            answers={answers} 
            correctAnswer={correctAnswer}
            questionHandler={questionHandler}
            setScore={setScore}
            setLives={setLives}
            score={score}
            />
        </div>
      </div>
    );
  }else {
    return (
      <div className="App">
        <h1 className="title">Tech Interview Trivia</h1>
        <div className="card">
          <h1 className="final-score">Final Score: {score}</h1>
          <button className="btn" onClick={playAgain}>Play Again</button>
        </div>
      </div>
    );
  }
  
}

export default App;
