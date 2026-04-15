import { motion } from 'framer-motion'
import classicFace from '../../../assets/watchfaces/analog-classic.png'
import darkFace from '../../../assets/watchfaces/analog-dark.png'
import hourHandImg from '../../../assets/hands/hour.png'
import minuteHandImg from '../../../assets/hands/minute.png'
import secondHandImg from '../../../assets/hands/second.png'
import { minuteSweepTransition, secondSweepTransition } from '../../../animations/sweepHand'
import styles from './AnalogWatchRealistic.module.css'

interface AnalogWatchRealisticProps {
  minuteAngle: number
  secondAngle: number
}

export const AnalogWatchRealistic = ({ minuteAngle, secondAngle }: AnalogWatchRealisticProps) => {
  const hourAngle = minuteAngle / 12

  return (
    <div className={styles.watch}>
      <img className={styles.face} src={classicFace} alt="Mostrador classico" />
      <img className={`${styles.face} ${styles.overlay}`} src={darkFace} alt="" aria-hidden />

      <motion.img
        className={`${styles.hand} ${styles.hourHand}`}
        src={hourHandImg}
        alt=""
        aria-hidden
        animate={{ rotate: hourAngle }}
        transition={minuteSweepTransition}
      />
      <motion.img
        className={`${styles.hand} ${styles.minuteHand}`}
        src={minuteHandImg}
        alt=""
        aria-hidden
        animate={{ rotate: minuteAngle }}
        transition={minuteSweepTransition}
      />
      <motion.img
        className={`${styles.hand} ${styles.secondHand}`}
        src={secondHandImg}
        alt=""
        aria-hidden
        animate={{ rotate: secondAngle }}
        transition={secondSweepTransition}
      />

      <span className={styles.centerCap} />
    </div>
  )
}
