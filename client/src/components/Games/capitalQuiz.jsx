import React from "react";
import '../Play/play.css';


const CapitalQuiz = ({
    contador,
    country,
    mixedCapitals,
    correct,
    incorrect,
    setContador,
    setCorrect,
    setIncorrect,
    setCountry,
    countries,
    answering,
    setAnswering,
    oscuro,
    setGame
}) => {

    const handleCapital = (e) => {
        e.preventDefault()
        setAnswering(true);
        if (e.target.value === country.capital) {
            setCorrect(correct => [...correct, e.target.value])
        } else {
            setIncorrect(incorrect => [...incorrect, e.target.value])
        }
        setTimeout(() => {
            setCountry(countries[Math.floor(Math.random()*250)]);
            setContador(contador => contador + 1)
            setAnswering(false)
        }, 800)
    }

    const handleGoBack = (e) => {
        e.preventDefault();
        setContador(1);
        setCorrect([]);
        setIncorrect([]);
        setCountry(countries[Math.floor(Math.random()*250)]);
        setGame('');
    }

    const handleTryAgain = (e) => {
        e.preventDefault();
        setContador(1);
        setCorrect([]);
        setIncorrect([]);
        setCountry(countries[Math.floor(Math.random()*250)]);
    }

    return (
        <div>
            <h1> Capitals Quiz! </h1>
            <div className="play">
                <div className={oscuro ? "quiz-container" : "quiz-container-claro"} id="quiz">
                    <div className="quiz-header">
                        {
                        contador < 11 ?
                        <div>
                            <div>
                                {contador}/10
                            </div>
                            <h2 id="question">What is the capital of {country?.name}?</h2>
                            <ul>
                                {mixedCapitals
                                    ? mixedCapitals?.map((c, index) => {
                                        return (
                                            <div key={index}>
                                                <li>
                                                    <input
                                                        id="submit"
                                                        type='button'
                                                        value={`${c?.capital}`}
                                                        className='answer'
                                                        name="answer"
                                                        onClick={answering ? null : handleCapital}
                                                    />
                                                </li>
                                            </div>
                                        )
                                    })
                                    : null
                                }
                            </ul>
                        </div>
                        : <div>
                            <h1 className="finish">Game Over</h1>
                            <h2 id="question">Your scores: </h2>
                            <div>
                                <p>Correct answers: {correct.length}</p>
                                <p>Wrong answers: {incorrect.length}</p>
                                <div>
                                    <button id="submit" onClick={handleTryAgain}>Try again!</button>
                                    <button id="submit" onClick={handleGoBack}>Go back</button>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CapitalQuiz;
