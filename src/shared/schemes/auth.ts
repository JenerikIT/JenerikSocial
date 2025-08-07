import { m } from 'mobx-toolbox';

export const registerSchema = m.schema({
	email: m.reset()
		.string()
		.email({ message: "Неверный формат электронной почты." })
		.build(),
	password: m.reset()
		.string()
		.regex(/^(?=.*[a-z])(?=.*\d).+$/, { message: "Пароль должен содержать цифру и строчную букву." })
		.minLength(8, { message: "Пароль должен содержать 8 символов." })
		.build(),
	fullName: m.reset()
		.string()
		.minLength(3, { message: "Имя должно состоять минимум из 3 букв." })
		.build(),
});