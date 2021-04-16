import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengeProviderData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengeCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completedChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengeProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengeCompleted: number;
}

export const ChallengeContext = createContext({} as ChallengeProviderData);

export function ChallengeProvider({ children, ...rest }:ChallengeProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengeCompleted, setChallengeCompleted] = useState(rest.challengeCompleted ?? 0);

    const[isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const [activeChallenge, setActiveChallenge] = useState(null);

    useEffect(() => { //Requisitando permissão para emitir notificações web
        Notification.requestPermission();
    }, [])

    useEffect(() => { //Salvando nos cookies
        Cookies.set('level',String(level));
        Cookies.set('currentExperience',String(currentExperience));
        Cookies.set('challengeCompleted',String(challengeCompleted));

    }, [level, currentExperience, challengeCompleted])

    //Funções do níveis
    function levelUp(){ //Sobe de nível
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal(){ //Fechar modal
        setIsLevelUpModalOpen(false);
    }

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
    
    //Funções dos desafios
    function startNewChallenge(){ //Inicia um novo desafio
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);
        
        new Audio('./notification.mp3').play();

        if(Notification.permission === 'granted'){ //Emitir notificação de novo desafio no navegador
            new Notification('Novo desafio 🎉',{
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge(){ //Restada desafios
        setActiveChallenge(null);
    }

    function completedChallenge(){
        if(!activeChallenge){
            return;
        }
        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengeCompleted(challengeCompleted + 1);
    }

    return( //Componente 
        <ChallengeContext.Provider
            value={{
                level,
                currentExperience,
                experienceToNextLevel,
                challengeCompleted,
                activeChallenge,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completedChallenge,
                closeLevelUpModal
            }}
        >
            { children }
            { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengeContext.Provider>
    );
}