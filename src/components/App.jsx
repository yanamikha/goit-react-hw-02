import { useState, useEffect } from 'react'
import './App.css'
import Description from './Description/Description'
import Feedback from './Feedback/Feedback'
import Options from './Options/Options'
import _Notification from './Notification/Notification'

function App() {
  let states = {
    good: 0,
    neutral: 0,
    bad: 0
  };
  const [feedback, setFeedback] = useState(() => {
    const savedStates = window.localStorage.getItem('states');
    if (savedStates !== null) {
      states = JSON.parse(savedStates);
    }
    return states;
  });

  const [totalFeedbackCount, setTotalFeedbackCount] = useState(() => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  });
  useEffect(() => {
    window.localStorage.setItem('states', JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = feedbackType => {
    const updatedFeedback = { ...feedback, [feedbackType]: feedback[feedbackType] + 1 };
    setFeedback(updatedFeedback);
    const { good, neutral, bad } = updatedFeedback;
    setTotalFeedbackCount(good + neutral + bad);
  }
  const resetFeedback = () => {
    setFeedback(states);
    setTotalFeedbackCount(0);
  }

  return (
    <>
      <Description></Description>
      <Options onUpdateFeedback={updateFeedback} onResetFeedback={resetFeedback} feedbackCount={totalFeedbackCount}></Options>
      {totalFeedbackCount > 0 ? <Feedback feedbackCount={totalFeedbackCount} states={feedback} positiveFeedbackRate={Math.round((feedback.good / totalFeedbackCount) * 100)}></Feedback> : <_Notification />}
    </>
  )
}

export default App