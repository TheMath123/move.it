import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from '../styles/pages/Login.module.css';
import { useRouter } from 'next/router';
import axios, { AxiosResponse } from 'axios';

export default function Index(){
    const router = useRouter();
    const [userName, setUserName] = useState('');
    const buttonSubmit = useRef<HTMLButtonElement>(null);
    const errorMessage = useRef<HTMLParagraphElement>(null);

    
    useEffect(() => {
        if(userName === ''){
            buttonSubmit.current.style.background = 'var(--blue-dark)';
        }else{
            buttonSubmit.current.style.background = 'var(--green)';
        }
    }, [userName])



    function handleSubmitLogin(e) {
        e.preventDefault();

        if(userName === '' || userName === null){
            errorMessage.current.style.display = 'flex';
            return;
        }

        // const respo: AxiosResponse = axios.post('/api/authentication', { email })

        // if(respo.status === 201){
        // }

        router.push('home');
    }

    return(
        <div className={styles.container}>
            <div className={styles.contentSymbol}>
                <img src="simbolo.svg" alt="Simbolo"/>
            </div>
            <div className={styles.contentLogin}>
                <div className={styles.logoFull}>
                    <img src="logo-full-white.svg" alt="Logo"/>
                </div>
                <div className={styles.boxLogin}>
                    <span>Bem-vindo</span>
                    <div className={styles.boxGithub}>
                        <img src="github.svg" alt="Github"/>
                        <p>Faça login com seu Github para começar</p>
                    </div>
                    <form>
                        <div className={styles.boxInputLogin}>
                            <input
                              type="text"
                              placeholder="Digite seu username"
                              onChange={ (e)=> setUserName(e.currentTarget.value) }
                            />
                            <button type="submit" ref={buttonSubmit} onClick={handleSubmitLogin}>
                                <img src="icons/arrow-right.svg"/>
                            </button>
                        </div>
                        <p ref={errorMessage} className={styles.errorM}>Nome de usuário invalido!</p>
                    </form>
                </div>
            </div>
        </div>
    );
}