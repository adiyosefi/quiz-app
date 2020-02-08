import React, {useState, useEffect} from 'react';
import './App.css';
import { QUESTIONS } from "./questions";


const Answer = ({ answer, currentQuestion, question, userAnswers, setUserAnswers }) => {
    const [answerValue, setAnswerValue] = useState(answer.ans_id);

    // change the state of the user answers
    const handleAnswerChange = (e) => {
        console.log("handleAnswerChange" , e.target.value);
        console.log(userAnswers);
        let tempUserAnswers = [...userAnswers];
        tempUserAnswers[currentQuestion] = e.target.value;
        setUserAnswers(tempUserAnswers);
        console.log(userAnswers);

    }

    //if there is any prev user selection, and if the current radio index == the prev user answer: check the radio!
    return (
        <div className="answerItem">
            <input name={question.question_content} type="radio" id={answer.ans_content} value={answer.ans_id}
                   onChange={e => handleAnswerChange(e)}
                   checked={userAnswers[currentQuestion] ? userAnswers[currentQuestion] == answer.ans_id : null}
            />
            <label className="answerLabel" htmlFor={answer.ans_content}>{answer.ans_content}
            </label>
            <div className="check">
                <div className="inside"></div>
            </div>
        </div>
    );
};


const RenderAnswers = ({ answers, currentQuestion, setQuestions, questions, question, userAnswers, setUserAnswers}) => {

    const renderAnswers = answers.map((answer, index) => {
        return (
            <li key={answer.ans_id}>
                <Answer answer={answer} currentQuestion={currentQuestion} setQuestions={setQuestions} questions={questions} question={question} userAnswers={userAnswers} setUserAnswers={setUserAnswers}/>
            </li>
        );
    });

    if (answers != null) {
        return (
            <div>
                {renderAnswers}
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
};

const Question = ({ questions, currentQuestion, setQuestions, userAnswers, setUserAnswers }) => {

    const questionItem = questions.map((question, index) => {
        if (question.id === currentQuestion) {
            return (
                <div key={question.id}>
                    <div className="questionTitle">
                        <h4>{question.question_content}</h4>
                    </div>
                    <ul className="answersList">
                        <RenderAnswers answers={question.answers} currentQuestion={currentQuestion} question={question}
                                       userAnswers={userAnswers} setQuestions={setQuestions} questions={questions}
                                       setUserAnswers={setUserAnswers}/>
                    </ul>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    });
    if (questions != null) {
        return (
            <div>
                {questionItem}
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
};

const PrevButton = ({ questions , currentQuestion, setCurrentQuestion }) => {
    const goToPrev = () => {
        if (currentQuestion > 0){
            setCurrentQuestion(currentQuestion-1);
        }
    };

    if (currentQuestion >= 0 && currentQuestion <= questions.length-1) {
        return (
            <button className="prevButton" type="button"
                    disabled={currentQuestion === 0 ? true : false}
                    onClick={goToPrev}><i className="fa fa-arrow-left" aria-hidden="true"></i> Prev</button>
        );
    }

};

const NextButton = ({ questions , currentQuestion, setCurrentQuestion }) => {
    const goToNext = () => {
        if (currentQuestion < questions.length){
            setCurrentQuestion(currentQuestion+1);
        }
    };

    if (currentQuestion >= 0 && currentQuestion <= questions.length-1) {
        return (
            <button className="nextButton" type="button"
                    disabled={currentQuestion === questions.length-1 ? true : false}
                    onClick={goToNext}>Next <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
        );
    }

};

const DoneButton = ({ questions , currentQuestion, setCurrentQuestion }) => {
    if (currentQuestion === questions.length-1) {
        return (
            <span>
            <input className="doneButton" type="submit" value="Done"/>
            </span>
        );
    }
    return (
        <span></span>
    );
}

const ResetButton = ({ questions , currentQuestion, setCurrentQuestion, handleReset }) => {
    return (
        <span>
            <input className="resetButton" type="reset" value="Reset" onClick={handleReset}/>
            </span>
    );
}

function App() {
    const [questions, setQuestions] = useState( QUESTIONS );

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [userAnswers, setUserAnswers] = useState( [] );

    const [userGrade, setUserGrade] = useState(null);


    const handleClick = () => {
        if (userAnswers.length == questions.length) {
            setUserGrade(0);
            let tempUserGrade = 0;
            for (let i=0 ; i<userAnswers.length ; i++){
                if (userAnswers[i] == questions[i].correct_ans_index){
                    setUserGrade( tempUserGrade += (100/questions.length));
                }
            }
        }
    };


    let renderUserGrade;
    if (userGrade != null){
        renderUserGrade = <div className="userGrade">Your grade is {userGrade}!</div>;
    }

    const handleReset = () => {
        setUserGrade(0);
        setUserAnswers([]);
        setUserGrade(null);
        setCurrentQuestion(0);
    };


    return (
        <div className="container">
            <div className="quizTitle">
                <h1><img className="logoQuiz" src="quiz-icon.png"/>Quiz Time!<img className="logoQuiz" src="quiz-icon.png"/></h1>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleClick();
            }}>
                <div className="quizForm">
                    <div>
                        <Question questions={questions} currentQuestion={currentQuestion} setQuestions={setQuestions}
                                  setCurrentQuestion={setCurrentQuestion} userAnswers={userAnswers} setUserAnswers={setUserAnswers}/>
                    </div>
                    <div className="mainButtons">
                        <PrevButton questions={questions} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}/>
                        <NextButton questions={questions} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}/>
                    </div>
                </div>
                <div className="lastButtons">
                    <DoneButton questions={questions} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}/>
                    <ResetButton questions={questions} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} handleReset={handleReset}/>
                </div>
            </form>
            {renderUserGrade}
            <div className="signature">
                <p> Made with <i className="fa fa-heart"></i> by Adi Nomberg</p>
            </div>
        </div>
    );
}

export default App;
