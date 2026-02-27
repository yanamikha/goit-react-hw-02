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

  // ✅ Скачиваем PDF и создаём blob URL
  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await fetch('https://www.irs.gov/pub/irs-pdf/f1040.pdf');
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (err) {
        console.error('Failed to fetch PDF', err);
      }
    };
    fetchPdf();
  }, []);

  return (
    <>
      {pdfUrl && (
        <embed
          src={pdfUrl}
          type="application/pdf"
          className="h-[70vh] w-full rounded-b-lg"
        />
      )}
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