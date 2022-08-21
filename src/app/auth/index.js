import React, { useEffect } from 'react';
import Tools from '../../containers/tools';
import LayoutFlex from '../../components/layout-flex';
import Layout from '../../components/layout';
import LocaleSelect from '../../containers/locale-select';
import AuthHead from '../../containers/auth-head';
import useTranslate from '../../hooks/use-translate';
import Login from '../../containers/login';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';

function Auth() {
	const { isAuth } = useSelector((state) => ({
		isAuth: state.user.isAuth,
	}));

	const navigate = useNavigate();
	useEffect(() => {
		if (isAuth === true) {
			navigate('/');
		}
	}, [isAuth]);

	const { t } = useTranslate();

	if (isAuth === true) {
		return null;
	}

	return (
		<Layout
			auth={<AuthHead />}
			head={
				<LayoutFlex flex='between'>
					<h1>{t('title')}</h1>
					<LocaleSelect />
				</LayoutFlex>
			}
		>
			<Tools />
			<Login />
		</Layout>
	);
}

export default React.memo(Auth);
