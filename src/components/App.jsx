import { useState, useEffect } from 'react';
import Description from './Description/Description';
import Feedback from './Feedback/Feedback';
import Options from './Options/Options';
import Notification from './Notification/Notification';

function App() {
  const defaultStates = { good: 0, neutral: 0, bad: 0 };
  const [feedback, setFeedback] = useState(() => {
    const savedStates = window.localStorage.getItem('states');
    return savedStates ? JSON.parse(savedStates) : defaultStates;
  });

  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    window.localStorage.setItem('states', JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (feedbackType) => {
    const updatedFeedback = { ...feedback, [feedbackType]: feedback[feedbackType] + 1 };
    setFeedback(updatedFeedback);
  };

  const resetFeedback = () => {
    setFeedback(defaultStates);
  };

  const totalFeedbackCount = feedback.good + feedback.neutral + feedback.bad;

  useEffect(() => {
    let blobUrl = null;

    fetch('/test.pdf')
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      });

    debugger;
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, []);

  return (
    <>
      {pdfUrl && (
        <embed
          src={pdfUrl}
          type="application/pdf"
          className="h-[70vh] w-full rounded-b-lg"
        />)}
      <embed
        src="https://file-examples.com/wp-content/uploads/2017/10/file-sample_150kB.pdf"
        type="application/pdf"
        className="h-[70vh] w-full rounded-b-lg"
      />

      <Description />
      <Options
        onUpdateFeedback={updateFeedback}
        onResetFeedback={resetFeedback}
        feedbackCount={totalFeedbackCount}
      />
      {totalFeedbackCount > 0 ? (
        <Feedback
          feedbackCount={totalFeedbackCount}
          states={feedback}
          positiveFeedbackRate={Math.round((feedback.good / totalFeedbackCount) * 100)}
        />
      ) : (
        <Notification />
      )}
    </>
  );
}

export default App;