function NextButton({ dispatch, questionIndex }) {
  const isFinished = questionIndex === 14;
  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        dispatch({ type: `${isFinished ? "finish" : "nextQuestion"}` })
      }
    >
      {isFinished ? "Finish" : "Next"}
    </button>
  );
}

export default NextButton;
