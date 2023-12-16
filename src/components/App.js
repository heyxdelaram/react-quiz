import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./Start";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finish from "./Finish";

const INITIAL_STATE = {
  questions: {},
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  questionIndex: 0,
  answer: null,
  points: 0,
  highscore: 0,
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
        //points
        points:
          action.payload === state.questions[state.questionIndex].correctOption
            ? state.points + state.questions[state.questionIndex].points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        questionIndex: state.questionIndex + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [
    { questions, status, questionIndex, answer, points, highscore },
    dispatch,
  ] = useReducer(reducer, INITIAL_STATE);

  const numOfQuestions = questions.length;
  // const maxPossiblePoints = questions.reduce(
  //   (prev, cur) => prev + cur.points,
  //   0
  // );
  const maxPossiblePoints = 280;

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
            <Progress
              questionIndex={questionIndex}
              numOfQuestions={numOfQuestions}
              maxPossiblePoints={maxPossiblePoints}
              points={points}
              answer={answer}
            />
            <Question
              question={questions[questionIndex]}
              answer={answer}
              dispatch={dispatch}
            />
            {answer !== null ? (
              <NextButton dispatch={dispatch} questionIndex={questionIndex} />
            ) : null}
          </>
        )}
        {status === "finished" && (
          <Finish
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}
