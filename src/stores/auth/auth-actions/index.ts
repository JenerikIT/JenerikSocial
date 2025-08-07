
export interface SignUpBody {
	email: string;
	password: string;
	fullName: string;
}

export interface SignInBody {
	email: string;
	password: string;
}

export interface SignUpResponse {
	createdAt: string;
	email: string;
	favorites: [];
	fullName: string,
	token: string;
	updatedAt: string,
	__v: number;
	_id: string;
}