import styles from '../styles/components/RankingPositionBox.module.css'

interface RankingPBoxProps{
    rankingPosition: number,
    name: string,
    avatar: string,
    level: number,
    challengeCompleted: number,
    totalExperience: number,
}

export function RankingPositionBox(props: RankingPBoxProps){
    return(
        <div className={styles.container}>
            <div className={styles.position}>{props.rankingPosition}</div>
            <div className={styles.contentInfo}>

                <div className={styles.boxStart}>
                    <img 
                        className={styles.imageProfile}
                        src={props.avatar}
                        alt="Foto de perfil"
                    />
                    <div className={styles.firstDivName}>
                        <span>{props.name}</span>
                        <p>
                            <img 
                                className={styles.imageLevel}
                                src="icons/level.svg" 
                                alt="LevelUp"
                            />
                            Level {props.level}
                        </p>
                    </div>
                </div>
                <div className={styles.boxEnd}>
                    <div className={styles.infoText}>
                        <span>{props.challengeCompleted}</span> completados
                    </div>

                    <div className={styles.infoText}>
                        <span>{props.totalExperience}</span> xp
                    </div>
                </div>
            </div>
        </div>
    );
}