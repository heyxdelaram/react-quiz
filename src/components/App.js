import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Question from "./Question";
import NextButton from "./NextButton";

const INITIAL_STATE = {
  questions: {},
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  questionIndex: 0,
  answer: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "error":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "answered":
      return {
        ...state,
        answer: action.payload,
      };
    case "nextQuestion":
      return {
        ...state,
        questionIndex: state.questionIndex + 1,
        answer: null,
      };
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [{ questions, status, questionIndex, answer }, dispatch] = useReducer(
    reducer,
    INITIAL_STATE
  );

  const numOfQuestions = questions.length;

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "error" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Start numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Question
              question={questions[questionIndex]}
              answer={answer}
              dispatch={dispatch}
            />
            {answer !== null ? <NextButton dispatch={dispatch} /> : null}
          </>
        )}
      </Main>
    </div>
  );
}
