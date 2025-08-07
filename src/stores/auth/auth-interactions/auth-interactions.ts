import { makeAutoObservable } from "mobx";
import { useMobxForm } from 'mobx-toolbox';
import { registerSchema } from '../../../shared/schemes/auth';

class AuthInteractions {
	constructor() { makeAutoObservable(this); }

	registerForm = useMobxForm({
		email: "",
		password: "",
		fullName: "",
	}, registerSchema);

}

export const authInteractions = new AuthInteractions();