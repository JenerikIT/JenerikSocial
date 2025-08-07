import { makeAutoObservable } from "mobx";
import { MobxSaiInstance, mobxSaiFetch, mobxSaiHandler } from 'mobx-toolbox';
import { SignUpBody } from '.';
import { AuthResponse, UserData } from '../../../api/auth/authApi';
import { baseInstance } from '../../../shared/api';
import { authInteractions } from '../auth-interactions/auth-interactions';
import { authServices } from '../auth-service/auth-services';

// endpoints: (builder) => ({
// 	registerPost: builder.mutation<AuthResponse, UserData>({
// 	  query: (userData) => ({
// 		 url: "/register",
// 		 method: "POST",
// 		 body: userData,
// 	  }),
// 	}),
// 	login: builder.mutation<AuthResponse, UserData>({
// 	  query: (userData) => ({
// 		 url: "/login",
// 		 method: "POST",
// 		 body: userData,
// 	  }),
// 	  transformResponse: (response: AuthResponse) => {
// 		 localStorage.setItem("token", response.token);
// 		 return response;
// 	  },
// 	}),
// 	authMe: builder.query<AuthResponseCheck, void>({
// 	  query: () => "/me",
// 	  transformErrorResponse: (response) => {
// 		 if (response.status === 401) {
// 			localStorage.removeItem("token");
// 		 }
// 		 return response;
// 	  },
// 	}),
//  }),

class AuthActions {
	constructor() { makeAutoObservable(this); }

	// REGISTER ACTIONS

	registerSai: MobxSaiInstance<AuthResponse> = {};

	registerAction = async () => {
		const { registerSuccessHandler, registerErrorHandler } = authServices;
		const { registerForm: { values } } = authInteractions;

		const body: SignUpBody = {
			email: values.email,
			password: values.password,
			fullName: values.fullName,
		};

		this.registerSai = mobxSaiFetch(() => registerFetch(body));

		mobxSaiHandler(
			this.registerSai,
			registerSuccessHandler,
			registerErrorHandler
		);
	};

	// LOGIN ACTIONS

	loginSai: MobxSaiInstance<AuthResponse> = {};

	loginAction = async () => {
		const { loginSuccessHandler, loginErrorHandler } = authServices;

		const body: UserData = {
			email: "",
			password: ""
		};

		this.loginSai = mobxSaiFetch(() => logIn(body));

		mobxSaiHandler(
			this.loginSai,
			loginSuccessHandler,
			loginErrorHandler
		);
	};
}

export const authActions = new AuthActions();

const logIn = async (body: UserData) => (await baseInstance.post('/auth/login', body)).data;
const registerFetch = async (body: UserData) => (await baseInstance.post('/auth/register', body)).data;