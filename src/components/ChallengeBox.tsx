import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox(){
    const { activeChallenge, resetChallenge, completedChallenge } = useContext(ChallengeContext);
    const { resetCountdown, startCountdown } = useContext(CountdownContext);

    function handleChallengeSucceeded(){
        completedChallenge();
        resetCountdown();
        startCountdown();
    }

    function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();
    }

    return(
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`}/>
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button
                          type="button"
                          className={styles.failedButton}
                          onClick={handleChallengeFailed}
                        >
                            Falhei
                        </button>
                        <button
                          type="button"
                          className={styles.succeededButton}
                          onClick={handleChallengeSucceeded}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>

                    <strong>
                        Inicie um ciclo para receber desafios
                    </strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level UP"/>
                        Avance de level completando os desafios.
                    </p>

                </div>
            )}
        </div>
    );
}