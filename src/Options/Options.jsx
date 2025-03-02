import { motion } from "motion/react"
import css from './Options.module.css'

export default function Options({ onUpdateFeedback, onResetFeedback, feedbackCount }) {
  return (
    <ul className={css.cardlist}>
      <li><motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.85 }} onClick={() => onUpdateFeedback('good')}>Good</motion.button></li>
      <li><motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.85 }} onClick={() => onUpdateFeedback('neutral')}>Neutral</motion.button></li>
      <li><motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.85 }} onClick={() => onUpdateFeedback('bad')}>Bad</motion.button></li>
      {feedbackCount > 0 ? <li><motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.85 }} onClick={onResetFeedback}>Reset</motion.button></li> : ''}
    </ul>
  );
};