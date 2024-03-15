import { useRouter } from 'next/router';
import { isLoggedIn, setAuthToken } from '@/utils/auth';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import axiosInstance from '@/api/axios';
import { LOGIN } from '@/api/apiEndpoints';
import qs from 'qs';
import showToast from '@/utils/toastNotify';

const LoginPage = () => {
	const router = useRouter();
	const handleLogin = () => {
		const payload = {
			username: email,
			password: password,
		};
		axiosInstance
			.post(LOGIN, qs.stringify(payload), {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			})
			.then((resposne) => {
				if (resposne?.data) {
					setAuthToken(resposne?.data?.access_token);
					showToast('success', 'Login Successfull !');
				}
			})
			.catch((error) => {
				showToast('error', 'Login Failed !');
			});
	};

	const handleRegisterClick = () => {
		router.push('/register');
	};

	useEffect(() => {
		isLoggedIn() && router.push('/');
	}, []);

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	return (
		<div className={styles.loginContainer}>
			<div className={styles.formStructor}>
				<div className={styles.signup}>
					<h2 className={styles.formTitle} id='signup'>
						Welcome !!!
					</h2>
					<div className={styles.formHolder}>
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
					<button onClick={handleLogin} className={styles.submitBtn}>
						Login
					</button>
				</div>
				<div className={`${styles.login} ${styles.slideUp}`}>
					<div className={styles.center}>
						<h2 onClick={handleRegisterClick} className={styles.formTitle} id='login'>
							<span>or</span>
							<span style={{ color: '#000' }}>Register</span>
						</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
