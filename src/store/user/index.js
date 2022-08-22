import StateModule from '../module';

/**
 * Состояние товара
 */
class UserState extends StateModule {
	/**
	 * Начальное состояние
	 * @return {Object}
	 */
	initState() {
		return {
			isAuth: false,
			user: { email: '', profile: { name: '', phone: '' } },
			error: '',
		};
	}

	async login(data) {
		// this.setState({
		// 	...this.getState(),
		// });
		try {
			const response = await fetch('api/v1/users/sign', {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const json = await response.json();

			localStorage.setItem('yToken', json.result.token);

			this.setState({
				...this.getState(),
				isAuth: true,
				user: {
					email: json.result.user.email,
					profile: {
						name: json.result.user.profile.name,
						phone: json.result.user.profile.phone,
					},
				},
			});
		} catch (error) {
			this.setState({
				...this.initState(),
				error: error.message,
			});
		}
	}

	async getProfile() {
		// this.setState({
		// 	...this.getState(),
		// 	// isAuth: true
		// });
		try {
			const token = localStorage.getItem('yToken');
			const response = await fetch('api/v1/users/self', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-Token': token,
				},
			});

			const json = await response.json();

			if (!json.error) {
				this.setState({
					isAuth: true,
					user: {
						email: json.result.email,
						profile: {
							name: json.result.profile.name,
							phone: json.result.profile.phone,
						},
					},
				});
			}
		} catch (error) {
			console.log(error);
		}
	}

	async logout() {
		const token = localStorage.getItem('yToken');
		await fetch('api/v1/users/sign', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'X-Token': token,
			},
		});
		this.setState({
			...this.initState(),
		});
	}
}

export default UserState;