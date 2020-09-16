export default class Api {
	constructor(options) {
		this._baseUrl = options.baseUrl;
		this._headers = options.headers;
	}

	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			headers: this._headers
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: this._headers
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
	}

	postCard(newCard) {
		fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify({
				name: newCard.name,
				link: newCard.link
			}),
		})
	}

	deleteCard(id) {
		return	fetch(`${this._baseUrl}/cards/${id}`, {
			method: 'DELETE',
			headers: this._headers
		});
	}

	patchUserInfo(newData) {
		fetch(`${this._baseUrl}/users/me/`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: newData.name,
				about: newData.about
			}),
		})
	}


	patchAvatar(newData) {
		fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				avatar: newData.avatar
			})
		})
	}

	putLike(id) {
		return fetch(`${this._baseUrl}/cards/likes/${id}`, {
			method: 'PUT',
			headers: this._headers
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then((data) => {
			return (data.likes.length)
		})
	}

	removeLike(id) {
		return fetch(`${this._baseUrl}/cards/likes/${id}`, {
			method: 'DELETE',
			headers: this._headers
		}).then(res => {
			if (res.ok) {
				return res.json();
			}
		}).then((data) => {
			return (data.likes.length)
		})
	}
}