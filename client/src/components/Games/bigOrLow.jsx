import React from "react";
import '../Play/play.css'

const BiggerOrLower = ({
    contador,
    biggerCountry,
    lowerCountry,
    correct,
    incorrect,
    correctInput,
    setContador,
    setCorrect,
    setIncorrect,
    setLowerCountry,
    countries,
    answering,
    setAnswering
}) => {
    
    const handleAnswer = (e) => {
        e.preventDefault();
        setAnswering(true)
        if (e.target.name === 'A') {
            if (Number(biggerCountry.area.split(' ')[0]) >= Number(lowerCountry.area.split(' ')[0])) {
                setCorrect(correct => [...correct, biggerCountry]);
                setContador(contador => contador + 1);
            } else {
                setIncorrect(incorrect => [...incorrect, biggerCountry]);
            }
        } else {
            if (Number(lowerCountry.area.split(' ')[0]) >= Number(biggerCountry.area.split(' ')[0])) {
                setCorrect(correct => [...correct, lowerCountry]);
                setContador(contador => contador + 1);
            } else {
                setIncorrect(incorrect => [...incorrect, lowerCountry]);
            }
        }
        setTimeout(() => {
            setAnswering(false)
        }, 500)
    }
    
    return (
        <div>
            <div className='biggest'>
                <h1>
                    Wich country is bigger?
                </h1>
            </div>
        <div className='bigger'>
            <div className='contador'>{contador}</div>
            <div className="big">
                <div className="country">
                    <h1>{biggerCountry.name}</h1>
                    <img src={biggerCountry.flag}/>
                    <div>
                        <input type="button" value='BIGGER' name='A' onClick={answering ? null : handleAnswer} />
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="big">
                <div className="country">
                    <h1>{lowerCountry.name}</h1>
                    <img src={lowerCountry.flag}/>
                    <div>
                        <input type="button" value='BIGGER' name='B' onClick={answering ? null : handleAnswer} />
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
};

export default BiggerOrLower;
