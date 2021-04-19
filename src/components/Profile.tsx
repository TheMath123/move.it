import { useSession } from 'next-auth/client';
import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Profile.module.css';

export function Profile(){
    const { level } = useContext(ChallengeContext);
    const [session, loading] = useSession();

    return(
        <div className={styles.profileContainer}>
            {session ? (<>
                    <img src={session.user.image} alt="Foto de perfil"/>
                    <div>
                        <strong>{session.user.name}</strong>
                        <p>
                            <img src="icons/level.svg" alt="Level"/>
                            Level {level}
                        </p>
                    </div>
            </> ) : ( <>
                <img src="https://i.imgur.com/TQ2S6Rn.png" alt="Foto de perfil"/>
                <div>
                    <strong>Você</strong>
                    <p>
                        <img src="icons/level.svg" alt="Level"/>
                        Level {level}
                    </p>
                </div>
            </>)}
        </div>
    );
}