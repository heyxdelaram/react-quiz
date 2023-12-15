function Progress({
  questionIndex,
  numOfQuestions,
  points,
  maxPossiblePoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={numOfQuestions}
        value={questionIndex + Number(answer !== null)}
      />
      <p>
        Question <span>{questionIndex + 1}</span> / {numOfQuestions}
      </p>
      <p>
        <span>{points}</span> / {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
