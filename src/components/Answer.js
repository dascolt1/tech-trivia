import React from 'react';

const Answer = ({ answers, correctAnswer, questionHandler, setScore, setLives, score }) => {

    const handleButtonClick = (e) => {
        const buttonVal = e.target.value;
        if(buttonVal === correctAnswer) {
            setScore(score => score + 10);
            questionHandler();
        }else {
            setLives(lives => lives - 1);
        }
        
    }

    return(
        <div className="answer">
            {Object.keys(answers).map(key => {
                if(answers[key] !== null) {
                    return (
                        <button onClick={handleButtonClick} key={key} value={key} className="btn">{ answers[key] }</button>
                    )    
                }
                return null;
            })}
        </div>
    );
}

export default Answer;