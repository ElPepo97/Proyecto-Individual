import React from "react";
import '../Play/play.css';


const FlagQuiz = ({ contador,
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
    oscuro
}) => {

    const handleFlag = (e) => {
        e.preventDefault()
        setAnswering(true)
        if (e.target.value === country.name) {
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
        e.preventDefault()
        window.location.reload();
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
            <h1> Flags Quiz! </h1>
            <div className="play">
                <div className={oscuro ? "quiz-container-flag" : "quiz-container-flag-claro"} id="quiz">
                    <div className="quiz-header">
                        {
                        contador < 11 ?
                        <div className="flagQuiz">
                            <div>
                                <div>
                                    {contador}/10
                                </div>
                                <h2 id="question">Which country belongs the following flag?</h2>
                                <img src={country?.flag} alt={`${country?.name} flag`}/>
                            </div>
                            <ul>
                                {mixedCapitals
                                    ? mixedCapitals?.map((c, index) => {
                                        return (
                                            <div key={index}>
                                                <li>
                                                    <input
                                                        id="submit-flag"
                                                        type="button"
                                                        value={`${c.name}`}
                                                        className='answer'
                                                        name="answer"
                                                        onClick={answering ? null : handleFlag}
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

export default FlagQuiz;
