import React from "react";
import '../Play/play.css'

const BiggerOrLower = ({
    contador,
    contador2,
    setContador2,
    biggerCountry,
    lowerCountry,
    correct,
    incorrect,
    setContador,
    setCorrect,
    setIncorrect,
    setLowerCountry,
    setBiggerCountry,
    countries,
    answering,
    setAnswering,
    oscuro,
    setGame
}) => {
    
    const handleAnswer = (e) => {
        e.preventDefault();
        setAnswering(true)
        if (e.target.name === 'A') {
            if (Number(biggerCountry.area.split(' ')[0]) >= Number(lowerCountry.area.split(' ')[0])) {
                if (contador === 1) {
                    setContador2(1);
                }
                setCorrect(correct => [...correct, biggerCountry]);
                setLowerCountry(countries[Math.floor(Math.random()*250)])
                if (biggerCountry.name === 'Russia') {
                    setContador(1);
                    setBiggerCountry(countries[Math.floor(Math.random()*250)])
                } else {
                    setContador(contador = contador + 1);
                    if (contador > 7) {
                        setContador(1);
                        setBiggerCountry(countries[Math.floor(Math.random()*250)])
                    }
                }
            } else {
                setIncorrect(incorrect => [...incorrect, biggerCountry]);
            }
        } else {
            if (Number(lowerCountry.area.split(' ')[0]) >= Number(biggerCountry.area.split(' ')[0])) {
                if (contador2 === 1) {
                    setContador(1);
                }
                setCorrect(correct => [...correct, lowerCountry]);
                setBiggerCountry(countries[Math.floor(Math.random()*250)])
                if (biggerCountry.name === 'Russia') {
                    setContador2(1);
                    setLowerCountry(countries[Math.floor(Math.random()*250)])
                } else {
                    setContador2(1);
                    setContador2(contador2 = contador2 + 1);
                    if (contador2 > 7) {
                        setContador2(1);
                        setLowerCountry(countries[Math.floor(Math.random()*250)])
                    }
                }
            } else {
                setIncorrect(incorrect => [...incorrect, lowerCountry]);
            }
        }
        setTimeout(() => {
            setAnswering(false)
        }, 10)
    }

    const handleTryAgain = (e) => {
        e.preventDefault();
        setContador(1);
        setContador2(1);
        setCorrect([]);
        setIncorrect([]);
        setBiggerCountry(countries[Math.floor(Math.random()*250)]);
        setLowerCountry(countries[Math.floor(Math.random()*250)]);
    }

    const handleGoBack = (e) => {
        e.preventDefault();
        setContador(1);
        setContador2(1);
        setCorrect([]);
        setIncorrect([]);
        setGame('');
    }
    
    return (
        <div>
            <div className='biggest'>
                <h1>
                    Wich country is bigger?
                </h1>
            </div>
            {
            !incorrect.length ?
                <div className='bigger'>
                    <div className='contador'>{correct.length}</div>
                    <div className={oscuro ? "big" : "bigClaro"}>
                        <div className="country">
                            <h1>{biggerCountry.name}</h1>
                            <img src={biggerCountry.flag} alt={`${biggerCountry.name} flag`}/>
                            <div>
                                <input id="biggerOrLower" type="button" value='BIGGER' name='A' onClick={answering ? null : handleAnswer} />
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className={oscuro ? "big" : "bigClaro"}>
                    <div className="country">
                        <h1>{lowerCountry.name}</h1>
                        <img src={lowerCountry.flag} alt={`${lowerCountry.name} flag`}/>
                        <div>
                            <input id="biggerOrLower" type="button" value='BIGGER' name='B' onClick={answering ? null : handleAnswer} />
                        </div>
                    </div>
                </div>
            </div>
            : <div>
                <h1 className="finish">Game Over</h1>
                <h2 id="question">Your scores: </h2>
                <div>
                    <p>You get {correct.length} correct answers</p>
                    <div className="aaaaa">
                        <button id="biggerOrLower" onClick={handleTryAgain}>Try again!</button>
                        <button id="biggerOrLower" onClick={handleGoBack}>Go back</button>
                    </div>
                </div>
            </div>
        }
        </div>
    )
};

export default BiggerOrLower;
