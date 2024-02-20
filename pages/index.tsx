import { GetServerSideProps } from "next";
import { FiGithub,  } from 'react-icons/fi';
import { signIn, getSession } from "next-auth/react";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../src/styles/Home.module.css';

function Login() {
    const [isRegisterActive, setIsRegisterActive] = useState(false);
    const router = useRouter();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [password, setPassword] = useState('');

    useEffect(() => {
        const loginPassword = document.getElementById("loginPassword") as HTMLInputElement;
        const toggleLoginPassword = document.getElementById("toggleLoginPassword") as HTMLInputElement;
        const registerPassword = document.getElementById("registerPassword") as HTMLInputElement;
        const toggleRegisterPassword = document.getElementById("toggleRegisterPassword") as HTMLInputElement;

        attachEventListeners();

        function attachEventListeners() {
            if (loginPassword && toggleLoginPassword) {
                loginPassword.addEventListener("input", () => updateIcon(loginPassword, toggleLoginPassword));
                toggleLoginPassword.addEventListener("click", () => togglePassword(loginPassword, toggleLoginPassword));
            }

            if (registerPassword && toggleRegisterPassword) {
                registerPassword.addEventListener("input", () => updateIcon(registerPassword, toggleRegisterPassword));
                toggleRegisterPassword.addEventListener("click", () => togglePassword(registerPassword, toggleRegisterPassword));
            }
        }        


        function togglePassword(passwordField: HTMLInputElement, iconElement: HTMLElement) {
            const type = passwordField.type === "password" ? "text" : "password";
            passwordField.type = type;
            setIsPasswordVisible(type === "text");
            iconElement.classList.toggle('bx-show', type === "text");
            iconElement.classList.toggle('bx-hide', type === "password");
        }

        function updateIcon(passwordField: HTMLInputElement, iconElement: HTMLElement) {
            if (passwordField.value) {
                iconElement.classList.replace('bxs-lock-alt', 'bx-show');
            } else {
                iconElement.classList.replace('bxs-eye', 'bxs-lock-alt');
                iconElement.classList.replace('bx-show', 'bxs-lock-alt');
            }
        }

    }, []);

    const handleTogglePassword = () => {
        setIsPasswordVisible(!isPasswordVisible);
      };
      


    const handleRegisterClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setIsRegisterActive(!isRegisterActive);
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        console.log('Email:', email);
        console.log('Password:', password);

        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');

        console.log('Stored Email:', storedEmail);
        console.log('Stored Password:', storedPassword);

        if (email === storedEmail && password === storedPassword) {
            toast.success('Login realizado com sucesso');
            router.push('/autenticado');
        } else {
            toast.error('E-mail ou senha incorretos');
        }
    };

    const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const existingUser = localStorage.getItem('email');

        if (existingUser === email) {
            handleDuplicateUser();
        } else {
            toast.success('Cadastro realizado com sucesso');
            handleAlertClose();

            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);

            setIsRegisterActive(false);
            router.push('/');
        }
    };


    const handleAlertClose = () => {
        setIsRegisterActive(false);
        router.push('/');
    }

    const handleDuplicateUser = () => {
        toast.error('Usuário já cadastrado. Faça login.');
    }


    return (
        <div className={`${styles.wrapper} ${isRegisterActive ? styles.active : ''}`}>

            <title>Jonatha Fabricio</title>
            <link rel='stylesheet' href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' />

            <span className={styles["bg-animate"]}></span>
            <span className={styles["bg-animate2"]}></span>

            <div className={`${styles["form-box"]} ${styles.login}`}>
                <h2 className={`${styles.animation}`} style={{ "--i": 0, "--j": 21 } as React.CSSProperties}>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className={`${styles["input-box"]} ${styles.animation}`} style={{ "--i": 1, "--j": 22 } as React.CSSProperties}>
                        <input type="text" name="email" required />
                        <label>E-mail</label>
                        <i className='bx bxs-envelope'></i>
                    </div>
                    <div className={`${styles["input-box"]} ${styles.animation}`} style={{ "--i": 2, "--j": 23 } as React.CSSProperties}>
                        <input
                            type={isPasswordVisible ? "text" : "password"}
                            name="password"
                            id="password"
                            required
                        />
                        <label>Senha</label>
                        <i
                            className={`bx ${isPasswordVisible ? "bx-show" : "bx-hide"}`}
                            onClick={handleTogglePassword}
                        ></i>
                    </div>

                    <button type="submit" className={`${styles.btn} ${styles.animation}`} style={{ "--i": 3, "--j": 24 } as React.CSSProperties}>Login</button>

                    <div className={`${styles.detailsGitBtn} ${styles.animation}`} style={{ "--i": 4, "--j": 25 } as React.CSSProperties}>
                        <p className={`${styles.detailsGit} ${styles.animation}`} style={{ "--i": 5, "--j": 26 } as React.CSSProperties}>ou entre com 
                        <button type="button" onClick={() => signIn('github', { callbackUrl: `${window.location.origin}/autenticado` })} className={`${styles.btnGit} ${styles.animation}`} style={{ "--i": 6, "--j": 27 } as React.CSSProperties}>
                            <FiGithub size={24} />
                        </button>
                        </p>
                    </div>

                    <div className={`${styles["logreg-link"]} ${styles.animation}`} style={{ "--i": 7, "--j": 28} as React.CSSProperties}>
                        <p>Ainda não tem uma conta?<a href="#" className={styles["register-link"]} onClick={handleRegisterClick}>Cadastre-se</a></p>
                    </div>
                </form>
            </div>

            <div className={`${styles["info-text"]} ${styles.login}`}>
                <h2 className={`${styles.animation}`} style={{ "--i": 0, "--j": 20 } as React.CSSProperties}>Welcome Back!</h2>
                <p className={`${styles.animation}`} style={{ "--i": 1, "--j": 21 } as React.CSSProperties}>Bem vindo(a) de volta!</p>
            </div>

            <div className={`${styles["form-box"]} ${styles.register}`}>
                <h2 className={`${styles.animation}`} style={{ "--i": 17, "--j": 0 } as React.CSSProperties}>Sign Up</h2>

            <form onSubmit={handleRegistration}>
                <div className={`${styles["input-box"]} ${styles.animation}`} style={{ "--i": 18, "--j": 1 } as React.CSSProperties}>
                    <input type="text" name="username" required />
                    <label>Username</label>
                    <i className='bx bxs-user'></i>
                </div>
                <div className={`${styles["input-box"]} ${styles.animation}`} style={{ "--i": 19, "--j": 2 } as React.CSSProperties}>
                    <input type="text" name="email" required />
                    <label>E-mail</label>
                    <i className='bx bxs-envelope'></i>
                </div>

                <div className={`${styles["input-box"]} ${styles.animation}`} style={{ "--i": 20, "--j": 3 } as React.CSSProperties}>
                <input type={isPasswordVisible ? "text" : "password"}
                            name="password"
                            id="password"
                            required
                        />
                        <label>Senha</label>
                        <i
                            className={`bx ${isPasswordVisible ? "bx-show" : "bx-hide"}`}
                            onClick={handleTogglePassword}
                        ></i>
                </div>

                {/* <button type="submit" className={`${styles.btn} ${styles.animation}`} style={{ "--i": 21, "--j": 4 } as React.CSSProperties} onClick={() => setIsRegisterActive(false)}>Sign Up</button> */}
                <button type="submit" className={`${styles.btn} ${styles.animation}`} style={{ "--i": 21, "--j": 4 } as React.CSSProperties}>
                    Sign Up
                </button>

                <button
                    type="button"
                    className={`${styles.btnBack} ${styles.animation}`}
                    style={{ "--i": 22, "--j": 5 } as React.CSSProperties}
                    onClick={() => setIsRegisterActive(false)}
                >
                    Voltar
                </button>
            </form>

            </div>
            <div className={`${styles["info-text"]} ${styles.register}`}>
                <h2 className={`${styles.animation}`} style={{ "--i": 17, "--j": 0 } as React.CSSProperties}>Boas vindas!</h2>
                <p className={`${styles.animation}`} style={{ "--i": 18, "--j": 1 } as React.CSSProperties}>Preencha os dados para concluir seu cadastro.</p>
            </div>
            <ToastContainer />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    if (session) {
        return {
            redirect: {
                destination: '/autenticado',
                permanent: false
            }
        }
    } 

    return {
        props: {
            session
        }
    }
}

export default Login;