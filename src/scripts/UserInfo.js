export default class UserInfo {
	constructor({userName, userDiscription}) {
		this.userName = userName;
		this.userDiscription = userDiscription;
	}
	
	getUserInfo() {
		return this.userName.textContent, this.userDiscription.textContent
	}

	setUserInfo({name, profession}) {
		this.userName.textContent = name;
		this.userDiscription.textContent = profession;
	}
}