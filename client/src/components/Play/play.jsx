import React from "react";
import './play.css';
import NavBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCountries } from "../../redux/actions/actions";
import { useState } from "react";
import JSConfetti from 'js-confetti'
import CapitalQuiz from "../Games/capitalQuiz";
import FlagQuiz from "../Games/flagQuiz";
import BiggerOrLower from "../Games/bigOrLow";

const Play = () => {
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries2);
    const [country, setCountry] = useState({});
    const [mixedCapitals, setMixedCapitals] = useState([]);
    const [contador, setContador] = useState(1);
    const [correct, setCorrect] = useState([]);
    const [incorrect, setIncorrect] = useState([]);
    const [correctInput, setCorrectInput] = useState(0);
    const [oscuro, setOscuro] = useState(true);
    const [game, setGame] = useState('');
    const [answering, setAnswering] = useState(false);
    const [biggerCountry, setBiggerCountry] = useState({});
    const [lowerCountry, setLowerCountry] = useState({})
    
    useEffect(() => {
        dispatch(getAllCountries());
    }, [])
    
    useEffect(() => {
        randFunction();
    }, [country])

    useEffect(() => {
        setCountry(countries[Math.floor(Math.random()*250)]);
        setBiggerCountry(countries[Math.floor(Math.random()*250)]);
        setLowerCountry(countries[Math.floor(Math.random()*250)]);
    }, [countries])

    const handleGame = (e) => {
        e.preventDefault();
        if (e.target.value === 'Capitals Quiz') {
            return setGame('capital')
        }
        if (e.target.value === 'Flags Quiz') {
            return setGame('flag')
        }
        if (e.target.value === 'Bigger or Lower') {
            return setGame('bigOrLow')
        }
    }
    
    const mezclarArreglo = arreglo => {
        for (let i = arreglo.length - 1; i > 0; i--) {
            let indiceAleatorio = Math.floor(Math.random() * (i + 1));
            let temporal = arreglo[i];
            arreglo[i] = arreglo[indiceAleatorio];
            arreglo[indiceAleatorio] = temporal;
        }
        setMixedCapitals(arreglo);
    };
    
    const randFunction = () => {
        mezclarArreglo([
            countries[Math.floor(Math.random()*250)],
            countries[Math.floor(Math.random()*250)],
            countries[Math.floor(Math.random()*250)],
            country
        ]);
    }
    
    const handleConfetti = (e) => {
        const jsConfetti = new JSConfetti();
          jsConfetti.addConfetti({
              emojis: ["🎉", "🥳", "👏", "🏆", "🎈"],
          emojiSize: 35,
          confettiNumber: 200,
          confettiColors: [
            "#ff0a54",
            "#ff477e",
            "#ff7096",
            "#ff85a1",
            "#fbb1bd",
            "#f9bec7",
          ],
        });
        setContador(contador => contador + 1)
    }

    if(contador === 11 && game !== 'bigOrLow') {
        handleConfetti()
    }

    const handleFondo = () => {
        setOscuro(!oscuro)
    }

    return (
        <div className={oscuro ? "general" : 'generalClaro'}>
            <NavBar />
            <button onClick={handleFondo} className='walpaper-changer'>
                fondo
            </button>
            {
                game === '' ?
                <div>
                    <h1> Play Quiz! </h1>
                    <div className="play">
                        <div className='quiz-container'>
                            <div className='quiz-header'>
                                <h1 id="question">Game Selector</h1>
                                <ul>
                                    <li>
                                        <input
                                            value='Capitals Quiz'
                                            type='button'
                                            id="submit"
                                            className="answer"
                                            onClick={handleGame}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            value='Flags Quiz'
                                            type='button'
                                            id="submit"
                                            className="answer"
                                            onClick={handleGame}
                                        />
                                    </li>
                                    <li>
                                        <input
                                            value='Bigger or Lower'
                                            type='button'
                                            id="submit"
                                            className="answer"
                                            onClick={handleGame}
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                : game === 'capital' ?
                <CapitalQuiz
                    contador={contador}
                    country={country}
                    mixedCapitals={mixedCapitals}
                    correct={correct}
                    incorrect={incorrect}
                    correctInput={correctInput}
                    setContador={setContador}
                    setCorrect={setCorrect}
                    setIncorrect={setIncorrect}
                    setCountry={setCountry}
                    countries={countries}
                    answering={answering}
                    setAnswering={setAnswering}
                />
                : game === 'flag' ?
                <FlagQuiz
                    contador={contador}
                    country={country}
                    mixedCapitals={mixedCapitals}
                    correct={correct}
                    incorrect={incorrect}
                    correctInput={correctInput}
                    setContador={setContador}
                    setCorrect={setCorrect}
                    setIncorrect={setIncorrect}
                    setCountry={setCountry}
                    countries={countries}
                    answering={answering}
                    setAnswering={setAnswering}
                />
                : <BiggerOrLower
                    contador={contador}
                    biggerCountry={biggerCountry}
                    lowerCountry={lowerCountry}
                    correct={correct}
                    incorrect={incorrect}
                    correctInput={correctInput}
                    setContador={setContador}
                    setCorrect={setCorrect}
                    setIncorrect={setIncorrect}
                    setLowerCountry={setCountry}
                    countries={countries}
                    answering={answering}
                    setAnswering={setAnswering}
                />
            }
            {/* <div className="play">
                <div className="quiz-container" id="quiz">
                    <div className="quiz-header">
                        {
                        contador < 11 ?
                        <div>
                            <div>
                                {contador}/10
                            </div>
                            <h2 id="question">What is the capital of {country?.name}</h2>
                            <ul>
                                {mixedCapitals
                                    ? mixedCapitals?.map((c, index) => {
                                        return (
                                            <div key={index}>
                                                <li>
                                                    <input
                                                        id="submit"
                                                        type="button"
                                                        value={`${c}`}
                                                        className={correctInput > 0 ? "correct" : correctInput < 0 ? 'incorrect' : 'answer'}
                                                        name="answer"
                                                        onClick={handleAnswer}
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
                            </div>
                        </div>
                        }

                    </div>
                </div>
            </div> */}
        </div>
    )
};

export default Play;
