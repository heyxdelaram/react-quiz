function Start({ numOfQuestions }) {
  return (
    <div className="start">
      <h2>Welcome to The Ultimate React Quiz!</h2>
      <h3>{numOfQuestions} questions to test your React mastery</h3>
      <button className="btn">Start</button>
    </div>
  );
}

export default Start;
