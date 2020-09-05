export default class UserInfo {
	constructor({userName, userDiscription}) {
		this.userName = userName;
		this.userDiscription = userDiscription;
	}
	
	getUserInfo() {
		return {
      userName: this.userName.textContent,
      userDescription: this.userDiscription.textContent
    }
	}

	setUserInfo({name, profession}) {
		this.userName.textContent = name;
		this.userDiscription.textContent = profession;
	}
}