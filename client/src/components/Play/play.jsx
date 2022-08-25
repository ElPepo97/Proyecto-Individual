import React from "react";
import './play.css';
import NavBar from "../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllCountries } from "../../redux/actions/actions";
import { useState } from "react";
import JSConfetti from 'js-confetti'

const Play = () => {
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries2);
    const [country, setCountry] = useState({});
    const [mixedCapitals, setMixedCapitals] = useState([]);
    const [contador, setContador] = useState(1);
    const [correct, setCorrect] = useState(0);
    const [incorrect, setIncorrect] = useState(0);
    const [correctInput, setCorrectInput] = useState(0);
    
    useEffect(() => {
        dispatch(getAllCountries());
    }, [])
    
    useEffect(() => {
        randFunction();
    }, [country])

    useEffect(() => {
        setCountry(countries[Math.floor(Math.random()*250)]);
    }, [countries])

    const handleAnswer = (e) => {
        e.preventDefault()
        if (e.target.value === country.capital) {
            setCorrect(correct => correct + 1)
        } else {
            setIncorrect(incorrect => incorrect + 1)
        }
        setTimeout(() => {
            setCountry(countries[Math.floor(Math.random()*250)]);
            setContador(contador => contador + 1)
        }, 800)
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

    const renderCountry = () => {
        setCountry(countries[Math.floor(Math.random()*250)]);
    }
    
    const randFunction = () => {
        mezclarArreglo([
            countries[Math.floor(Math.random()*250)]?.capital,
            countries[Math.floor(Math.random()*250)]?.capital,
            countries[Math.floor(Math.random()*250)]?.capital,
            country?.capital
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
    }

    if(contador > 10) {
        handleConfetti()
    }

    return (
        <div className="general">
            <NavBar />
            <h1> Play Quiz! </h1>
            <div className="play">
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
                                <p>Correct answers: {correct}</p>
                                <p>Wrong answers: {incorrect}</p>
                            </div>
                        </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
};

export default Play;
