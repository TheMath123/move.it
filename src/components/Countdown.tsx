import { useContext } from 'react';
import styles from '../styles/components/Countdown.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faPlay, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CountdownContext } from '../contexts/CountdownContext';

export function Countdown(){
    const { minutes,
            seconds,
            hasFinished,
            isActive,
            resetCountdown,
            startCountdown
    } = useContext(CountdownContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2,'0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2,'0').split('');

    return (
        <div>          
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            <div>
                { hasFinished ? (
                    <button
                        disabled
                        className={styles.countdownButton}
                    >
                        Ciclo encerrado
                        <FontAwesomeIcon icon={faCheckCircle} className={styles.icons} color="var(--green)"/>
                    </button>
                ) : (
                    <>
                    { isActive ? (
                        <button 
                            type="button"
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                            onClick={resetCountdown}
                        >
                            Abandonar ciclo
                            <FontAwesomeIcon icon={faTimes} className={styles.icons}/>
                        </button>
                    ) : (
                        <button 
                            type="button"
                            className={styles.countdownButton}
                            onClick={startCountdown}
                        >
                            Iniciar um ciclo
                            <FontAwesomeIcon icon={faPlay} className={styles.icons}/>
                        </button>
                    )}
                    </>
                )}                
            </div>
        </div>
    );
}