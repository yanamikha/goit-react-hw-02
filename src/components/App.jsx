import { useState, useEffect } from 'react'
import './App.css'
import Description from './Description/Description'
import Feedback from './Feedback/Feedback'
import Options from './Options/Options'
import Notification from './Notification/Notification'

function App() {
  const defaultStates = {
    good: 0,
    neutral: 0,
    bad: 0
  };
  const [feedback, setFeedback] = useState(() => {
    const savedStates = window.localStorage.getItem('states');
    return savedStates && JSON.parse(savedStates) || defaultStates;
  });
  useEffect(() => {
    window.localStorage.setItem('states', JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = feedbackType => {
    const updatedFeedback = { ...feedback, [feedbackType]: feedback[feedbackType] + 1 };
    setFeedback(updatedFeedback);
  }
  const totalFeedbackCount = feedback.good + feedback.neutral + feedback.bad;

  const resetFeedback = () => {
    setFeedback();
  }

  return (
    <>
      <embed
        src='blob:https://ln9-ptl01-dr.isd.dp.ua:8222/461cc0aa-4c04-47d0-9771-d8ce2041da3d'
        type="application/pdf"
        className="h-[70vh] w-full rounded-b-lg"
      />
      <embed
        src='blob:https://ln9-ptl01-dr.isd.dp.ua:8222/461cc0aa-4c04-47d0-9771-d8ce2041da3d'
        type="application/pdf"
        className="h-[70vh] w-full rounded-b-lg"
      />
      <embed
        src='blob:https://ln9-ptl01-dr.isd.dp.ua:8222/461cc0aa-4c04-47d0-9771-d8ce2041da3d'
        type="application/pdf"
        className="h-[70vh] w-full rounded-b-lg"
      />
      <Description></Description>
      <Options onUpdateFeedback={updateFeedback} onResetFeedback={resetFeedback} feedbackCount={totalFeedbackCount}></Options>
      {totalFeedbackCount > 0 ? <Feedback feedbackCount={totalFeedbackCount} states={feedback} positiveFeedbackRate={Math.round((feedback.good / totalFeedbackCount) * 100)}></Feedback> : <Notification />}
    </>
  )
}

export default App
