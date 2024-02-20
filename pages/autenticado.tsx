import { GetServerSideProps } from "next";
import { signOut, useSession, getSession } from "next-auth/react";

import styles from '../src/styles/Page.module.css';

function Autenticado() {
  const { data: session } = useSession();

  return (
    <div className={styles.homeContainer}>
      <div className={styles.welcomeText}>Boas-Vindas</div>
      <div className={styles.userInfo}>
        <div className={styles.userName}>{session?.user?.name}</div>
      </div>

      <button
        type="submit"
        className={styles.logoutButton}
        onClick={() => signOut()}
      >
        Sair
      </button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
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

export default Autenticado;
