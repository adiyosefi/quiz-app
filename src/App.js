import React, {useState} from 'react';
import './App.css';
import { QUESTIONS } from "./questions";


const Answer = ({ answer, currentQuestion, setQuestions, questions, question, userAnswers, setUserAnswers }) => {

    const handleAnswerChange = (e) => {
        // setQuestions(questions.map((q, i) => {
        //     if (q.id === currentQuestion){
        //         q.user_ans_index = e.target.value;
        //     }
        // }));
        // (userAnswers.map((userAnswer, index) => {
        //     if (question[currentQuestion]) {
        //         userAnswer = e.target.value;
        //     }
        // }));

        console.log(userAnswers);
    }


    return (
        <div>
            <input name={question.question_content} type="radio" id={answer.ans_content} value={answer.ans_id}
                   onChange={e => handleAnswerChange(e)}/>
            <label htmlFor={answer.ans_content}>{answer.ans_content}</label>
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
                <form>
                {renderAnswers}
                </form>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
};

const Question = ({ questions, currentQuestion, setQuestions, setCurrentQuestion, userAnswers, setUserAnswers }) => {

    const questionItem = questions.map((question, index) => {
        if (question.id === currentQuestion) {
            return (
                <div key={question.id}>
                    <div>
                        <h4>{question.question_content}</h4>
                    </div>
                        <ul>
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
            <button type="button" disabled={currentQuestion === 0 ? true : false} onClick={goToPrev}>Prev</button>
        );
    }

}

const NextButton = ({ questions , currentQuestion, setCurrentQuestion }) => {
    const goToNext = () => {
        if (currentQuestion < questions.length){
            setCurrentQuestion(currentQuestion+1);
        }
    };

    if (currentQuestion >= 0 && currentQuestion <= questions.length-1) {
        return (
            <button type="button" disabled={currentQuestion === questions.length-1 ? true : false} onClick={goToNext}>Next</button>
        );
    }

}

const DoneButton = ({ questions , currentQuestion, setCurrentQuestion }) => {
    if (currentQuestion === questions.length-1) {
        return (
            <button type="submit">Done</button>
        );
    }
    return (
        <span></span>
    );
}

function App() {
    const [questions, setQuestions] = useState( QUESTIONS );

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const [userAnswers, setUserAnswers] = useState( [] );


    const handleClick = () => {
        if (userAnswers[currentQuestion] != null) {
            setQuestions([
                ...questions,
                questions[currentQuestion].user_ans_index=userAnswers[currentQuestion]
            ]);
            setUserAnswers([]);
        }
    };

    return (
        <div className="container">
            <div>
                <h1>Quiz Time!</h1>
            </div>
            {/*<form onSubmit={(e) => {*/}
            {/*    e.preventDefault();*/}
            {/*    handleClick();*/}
            {/*}}>*/}
            <Question questions={questions} currentQuestion={currentQuestion} setQuestions={setQuestions}
                      setCurrentQuestion={setCurrentQuestion} userAnswers={userAnswers} setUserAnswers={setUserAnswers}/>
            <div>
                <PrevButton questions={questions} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}/>
                <NextButton questions={questions} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}/>
                <DoneButton questions={questions} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}/>
            </div>
            {/*</form>*/}
        </div>
    );
}

export default App;
