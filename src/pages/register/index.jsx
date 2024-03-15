import { useRouter } from 'next/router';
import styles from './styles.module.scss';
import { useState } from 'react';
import { REGISTER_USER } from '@/api/apiEndpoints';
import axiosInstance from '@/api/axios';
import showToast from '@/utils/toastNotify';
const LoginPage = () => {
	const router = useRouter();
	const handleSignUpClick = () => {
		const payload = {
			username: username,
			email: email,
			password: password,
		};
		axiosInstance
			.post(REGISTER_USER, payload)
			.then((resposne) => {
				if (resposne?.status == 201) {
					router.push('/login');
				}
			})
			.catch((error) => {
				showToast('error', 'SignUp Failed !');
			});
	};

	const handleLoginClick = () => {
		router.push('/login');
	};
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	return (
		<div className={styles.loginContainer}>
			<div className={styles.formStructor}>
				<div className={styles.signup}>
					{/* <h4 className={styles.formTitle} id='signup'>
						Create new account
					</h4> */}
					<div className={styles.formHolder}>
						<input
							type='text'
							className={styles.input}
							placeholder='Username'
							onChange={({ target }) => setUsername(target.value)}
						/>
						<input
							type='email'
							className={styles.input}
							placeholder='Email'
							onChange={({ target }) => setEmail(target.value)}
						/>
						<input
							type='password'
							className={styles.input}
							placeholder='Password'
							onChange={({ target }) => setPassword(target.value)}
						/>
					</div>
					<button onClick={handleSignUpClick} className={styles.submitBtn}>
						Sign Up
					</button>
				</div>
				<div className={`${styles.login} ${styles.slideUp}`}>
					<div className={styles.center}>
						<h2 onClick={handleLoginClick} className={styles.formTitle} id='login'>
							<span>or</span>
							<span style={{ color: 'black' }}>Login</span>
						</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
