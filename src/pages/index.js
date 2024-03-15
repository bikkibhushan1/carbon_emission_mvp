import { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import { deleteAuthToken, isLoggedIn } from '@/utils/auth';
import Main from '@/layout/main';

const LandingPage = () => {
	const router = useRouter();

	useEffect(() => {
		if (!isLoggedIn()) {
			router.push('/login');
		}
	}, []);
	const handleLogoutBtn = () => {
		deleteAuthToken();
		router.reload();
	};

	return (
		<div>
			<Main />
			<button onClick={handleLogoutBtn}> Logout</button>
		</div>
	);
};

export default LandingPage;
