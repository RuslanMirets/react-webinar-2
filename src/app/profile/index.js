import React from 'react';
import useTranslate from '../../hooks/use-translate';
import Tools from '../../containers/tools';
import LayoutFlex from '../../components/layout-flex';
import Layout from '../../components/layout';
import LocaleSelect from '../../containers/locale-select';
import AuthHead from '../../containers/auth-head';
import ProfileCard from '../../containers/profile-card';

function Profile() {
	const { t } = useTranslate();

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
			<ProfileCard />
		</Layout>
	);
}

export default React.memo(Profile);
