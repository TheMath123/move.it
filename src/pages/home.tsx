import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import styles from '../styles/pages/Home.module.css';
import Leaderboard from './leaderboard';
import Moveit from './moveit';

interface HomeProps {
    level: number;
    currentExperience: number;
    challengeCompleted: number;
}
  

export default function Home(props: HomeProps){

    const btnLeaderboard = useRef<HTMLButtonElement>(null);
    const btnHome = useRef<HTMLButtonElement>(null);
    const pageRefMoveit = useRef<HTMLDivElement>(null);
    const pageRefLeaderboard = useRef<HTMLDivElement>(null);
    const router = useRouter();

    //Imagem
    const [ imageBtnHome, setImageBtnHome ] = useState('icons/menu/home-blue.svg');
    const [ imageBtnLeaderboard , setImageBtnLeaderboard ] = useState('icons/menu/award-gray.svg');

    function handleClickHome(e) {
        let imgHomeGray = `icons/menu/home-gray.svg`;
        let imgHomeBlue = `icons/menu/home-blue.svg`

        e.preventDefault();

        // router.push('');

        if(imageBtnHome === imgHomeGray){
            setImageBtnHome(imgHomeBlue);
            setImageBtnLeaderboard('icons/menu/award-gray.svg');
            pageRefLeaderboard.current.style.display = 'none';
            pageRefMoveit.current.style.display = 'flex';
        }
    }

    function handleClickLeaderboard(e) {
        let imgAwardGray = `icons/menu/award-gray.svg`;
        let imgAwardBlue = `icons/menu/award-blue.svg`

        e.preventDefault();

        // router.push('ranking');

        if(imageBtnLeaderboard === imgAwardGray){
            setImageBtnLeaderboard(imgAwardBlue);
            setImageBtnHome('icons/menu/home-gray.svg')
            pageRefLeaderboard.current.style.display = 'flex';
            pageRefMoveit.current.style.display = 'none';
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.containerMenu}>
                <div className={styles.contentLogo}>
                    <img src="Logo.svg" alt="Move.it"/>
                </div>
                <div className={styles.contentMenu}>
                    <button ref={btnHome} type="button" onClick={handleClickHome}>
                        <img src={imageBtnHome} alt="Home"/>
                    </button>
                    <button ref={btnLeaderboard} type="button" onClick={handleClickLeaderboard}>
                        <img src={imageBtnLeaderboard} alt="Leaderboard"/>
                    </button>
                </div>
            </div>

            <div className={styles.pages}>
                <div ref={pageRefMoveit} className={styles.moveit}>
                    <Moveit
                      level={props.level}
                      currentExperience={props.currentExperience}
                      challengeCompleted={props.challengeCompleted}
                    />
                </div>
                <div ref={pageRefLeaderboard} className={styles.leaderboard}>
                    <Leaderboard />
                    {/* <h1>Em breve...</h1> */}
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { level, currentExperience, challengeCompleted } = ctx.req.cookies;
    return {
      props: {
        level: Number(level),
        currentExperience: Number(currentExperience),
        challengeCompleted: Number(challengeCompleted)
      }
    }
}
