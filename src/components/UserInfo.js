export default class UserInfo {
	constructor({ userName, userDiscription, avatar }) {
		this.userName = userName;
		this.userDiscription = userDiscription;
		this.avatar = avatar;
	}

	getUserInfo() {
		return {
			userName: this.userName.textContent,
			userDescription: this.userDiscription.textContent,
		}
	}

	setUserInfo({ name, about, id }) {
		this.userName.textContent = name;
		this.userDiscription.textContent = about;
	}

	setAvatar(avatar) {
		this.avatar.src = avatar;
	}
}