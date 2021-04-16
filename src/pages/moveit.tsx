import React from "react";
import Head  from 'next/head';
import { GetServerSideProps } from 'next';
import styles from '../styles/pages/Moveit.module.css';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengeProvider } from "../contexts/ChallengeContext";

interface ApplicationProps {
  level: number;
  currentExperience: number;
  challengeCompleted: number;
}

export default function Moveit(props: ApplicationProps) {
  return (
    <ChallengeProvider 
      level={props.level}
      currentExperience={props.currentExperience}
      challengeCompleted={props.challengeCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengeProvider>
  );
}

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { level, currentExperience, challengeCompleted } = ctx.req.cookies;
//   return {
//     props: {
//       level: Number(level),
//       currentExperience: Number(currentExperience),
//       challengeCompleted: Number(challengeCompleted)
//     }
//   }
// }