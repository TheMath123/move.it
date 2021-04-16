import React from 'react';
import { RankingPositionBox } from '../components/RankingPositionBox';
import styles from '../styles/pages/Leaderboard.module.css';

export default function Leaderboard() {
    return(
        <div className={styles.container}>
            <div className={styles.construction}>Em construção...</div>
            <header>
                <span>Leaderboard</span>
                <div className={styles.headerLeaderboard}>
                    <div className={styles.headerLeftSide}>
                        <p>Posição</p>
                        <p>Usuário</p>
                    </div>
                    <div className={styles.headerRightSide}>
                        <p>Desafios</p>
                        <p>Experiência</p>
                    </div>
                </div>
            </header>
            <div className={styles.rankingBox}>
                <RankingPositionBox 
                    rankingPosition={1}
                    name="Matheus P Agostinho"
                    avatar="https://avatars.githubusercontent.com/u/28405781?v=4"
                    level={25}
                    challengeCompleted={35}
                    totalExperience={12356789}
                />
                <RankingPositionBox 
                    rankingPosition={2}
                    name="Alpha Vylly"
                    avatar="https://avatars.githubusercontent.com/u/65187737?v=4"
                    level={15}
                    challengeCompleted={25}
                    totalExperience={123567}
                />
                <RankingPositionBox 
                    rankingPosition={1}
                    name="Matheus P Agostinho"
                    avatar="https://avatars.githubusercontent.com/u/28405781?v=4"
                    level={25}
                    challengeCompleted={35}
                    totalExperience={12356789}
                />
                <RankingPositionBox 
                    rankingPosition={2}
                    name="Alpha Vylly"
                    avatar="https://avatars.githubusercontent.com/u/65187737?v=4"
                    level={15}
                    challengeCompleted={25}
                    totalExperience={123567}
                />
                <RankingPositionBox 
                    rankingPosition={1}
                    name="Matheus P Agostinho"
                    avatar="https://avatars.githubusercontent.com/u/28405781?v=4"
                    level={25}
                    challengeCompleted={35}
                    totalExperience={12356789}
                />
                <RankingPositionBox 
                    rankingPosition={2}
                    name="Alpha Vylly"
                    avatar="https://avatars.githubusercontent.com/u/65187737?v=4"
                    level={15}
                    challengeCompleted={25}
                    totalExperience={123567}
                />
                <RankingPositionBox 
                    rankingPosition={1}
                    name="Matheus P Agostinho"
                    avatar="https://avatars.githubusercontent.com/u/28405781?v=4"
                    level={25}
                    challengeCompleted={35}
                    totalExperience={12356789}
                />
                <RankingPositionBox 
                    rankingPosition={2}
                    name="Alpha Vylly"
                    avatar="https://avatars.githubusercontent.com/u/65187737?v=4"
                    level={15}
                    challengeCompleted={25}
                    totalExperience={123567}
                />
            </div>
        </div>
    );
}
