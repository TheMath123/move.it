import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/pages/Login.module.css';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/client'

export default function Index(){
    const router = useRouter();
    const [userName, setUserName] = useState('');
    const buttonSubmit = useRef<HTMLButtonElement>(null);
    const errorMessage = useRef<HTMLParagraphElement>(null);

    const [ session, loading ] = useSession();
    
    useEffect(() => { //Altera cor do botão, se tiver algo escrito no input
        if(userName === ''){
            buttonSubmit.current.style.background = 'var(--blue-dark)';
        }else{
            buttonSubmit.current.style.background = 'var(--green)';
        }
    }, [userName])

    useEffect(() => { //Entrar automático caso usuário estiver logado
        if(session){
            router.push('home')
        }
    }, [session])

    function handleSubmitLogin(e){ //Login apenas com userName
        e.preventDefault();

        if(userName === '' || userName === null){
            errorMessage.current.style.display = 'flex';
            return;
        }

        router.push('home');
    }

    function handleSubmitLoginGithub(e) { //Login com github
        e.preventDefault();
        signIn('github');
    }

    return(
        <div className={styles.container}>
            <title>move.it</title>

            <div className={styles.contentSymbol}>
                <img src="simbolo.svg" alt="Simbolo"/>
            </div>
            <div className={styles.contentLogin}>
                <div className={styles.logoFull}>
                    <img src="logo-full-white.svg" alt="Logo"/>
                </div>
                <div className={styles.boxLogin}>
                    <span>Bem-vindo</span>
                    <button title="Fazer login com github" className={styles.btnGithub} onClick={handleSubmitLoginGithub}>
                        <img src="github.svg" alt="Github"/>
                        <p>Faça login com seu Github para começar</p>
                    </button>
                    <form>
                        <div className={styles.boxInputLogin}>
                            <input
                            type="text"
                            placeholder="Digite seu username"
                            onChange={ (e)=> setUserName(e.currentTarget.value) }
                            />
                            <button title="Entrar" type="submit" ref={buttonSubmit} onClick={handleSubmitLogin}>
                                <img src="icons/arrow-right.svg"/>
                            </button>
                        </div>
                    </form>
                    <p ref={errorMessage} className={styles.errorM}>Nome de usuário invalido!</p>
                </div>
            </div>
        </div>
    );
}