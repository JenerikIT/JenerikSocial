import { makeAutoObservable } from 'mobx';
import { navigate } from '../../../shared/utils/navigate';
import { SignUpResponse } from '../auth-actions';

class AuthServices {
	constructor() { makeAutoObservable(this); }

	// LOGIN HANDLERS

	loginSuccessHandler = (data: any) => {
		console.log(data);
	};

	loginErrorHandler = (error: any) => {
		console.log(error);
	};

	// REGISTER HANDLERS

	registerSuccessHandler = (data: SignUpResponse) => {
		localStorage.setItem("token", data.token);
		navigate("/");
	};

	registerErrorHandler = (error: any) => {
		console.log(error);
	};
}

export const authServices = new AuthServices();