import css from './Feedback.module.css'

export default function Feedback({ feedbackCount, states, positiveFeedbackRate }) {
  return (
    <ul className={css.list}>
      <li><span>❣️Good: {states.good}</span></li>
      <li><span>😐Neutral: {states.neutral}</span></li>
      <li><span>💢Bad: {states.bad}</span></li>
      <li><span>Total: {feedbackCount}</span></li>
      <li><span className={positiveFeedbackRate > 60 ? css.success_text : (positiveFeedbackRate < 50 ? css.alarm_text : css.info_text)}>Positive: {positiveFeedbackRate}%</span></li>
    </ul >
  );
};