import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import styles from '../styles/pages/Home.module.css';
import Leaderboard from './leaderboard';
import Moveit from './moveit';
import { signOut, useSession } from 'next-auth/client'

interface HomeProps {
    level: number;
    currentExperience: number;
    challengeCompleted: number;
}
  

export default function Home(props: HomeProps){

    const btnLeaderboard = useRef<HTMLButtonElement>(null);
    const btnHome = useRef<HTMLButtonElement>(null);
    const btnLogout = useRef<HTMLButtonElement>(null);
    const pageRefMoveit = useRef<HTMLDivElement>(null);
    const pageRefLeaderboard = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const [ session, loading ] = useSession();

    const [pageActive, setPageActive] = useState('Inicio');

    //Imagem
    const [ imageBtnHome, setImageBtnHome ] = useState('icons/menu/home-blue.svg');
    const [ imageBtnLeaderboard , setImageBtnLeaderboard ] = useState('icons/menu/award-gray.svg');

    function handleClickHome(e) { // Função para ativar home menu
        let imgHomeGray = `icons/menu/home-gray.svg`;
        let imgHomeBlue = `icons/menu/home-blue.svg`

        e.preventDefault();

        // router.push('');

        if(imageBtnHome === imgHomeGray){
            setPageActive('Inicio');
            setImageBtnHome(imgHomeBlue);
            setImageBtnLeaderboard('icons/menu/award-gray.svg');
            pageRefLeaderboard.current.style.display = 'none';
            pageRefMoveit.current.style.display = 'flex';
        }
    }

    function handleClickLeaderboard(e) { // Função para ativar leaderboard menu
        e.preventDefault();
        let imgAwardGray = `icons/menu/award-gray.svg`;
        let imgAwardBlue = `icons/menu/award-blue.svg`

        if(imageBtnLeaderboard === imgAwardGray){
            setPageActive('Leaderboard');
            setImageBtnLeaderboard(imgAwardBlue);
            setImageBtnHome('icons/menu/home-gray.svg')
            pageRefLeaderboard.current.style.display = 'flex';
            pageRefMoveit.current.style.display = 'none';
        }
    }

    function handleClickLogout(e) { //Função de log out
        e.preventDefault();

        signOut({ callbackUrl: 'http://localhost:3000/' })
        router.push('/');
    }

    return(
        <div className={styles.container}>
            <title>{pageActive} | move.it</title>

            <div className={styles.containerMenu}>
                <div className={styles.contentLogo}>
                    <img src="Logo.svg" alt="Move.it"/>
                </div>
                <div className={styles.contentMenu} >
                    <button title="Home" ref={btnHome} type="button" onClick={handleClickHome}>
                        <img src={imageBtnHome} alt="Home"/>
                    </button>
                    <button title="Leaderboard" ref={btnLeaderboard} type="button" onClick={handleClickLeaderboard}>
                        <img src={imageBtnLeaderboard} alt="Leaderboard"/>
                    </button>
                </div>
                <div className={styles.contentLogout}>
                    <button title="Sair"ref={btnLogout} type="button" onClick={handleClickLogout}>
                        <img src="icons/menu/exit.svg" alt="Sair"/>
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
