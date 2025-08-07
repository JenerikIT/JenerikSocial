import { observer } from 'mobx-react-lite';
import { forwardRef } from 'react';
import s from "./index.module.scss";

interface InputUiProps extends React.InputHTMLAttributes<HTMLInputElement> {
	values?: any;
	errors?: any;
	name?: string;
	label?: string;
	setValue?: (field: string, value: string) => void;
}

export const InputUi = observer(forwardRef((
	{
		values, errors, name, label, setValue, ...props
	}: InputUiProps,
	ref: React.Ref<HTMLInputElement>
) => {
	return (
		<div className={s.input_container}>
			<span className={s.label}>{label}</span>
			<input
				className={s.input}
				style={errors[name || ""] ? { border: "1px solid #D70000" } : {}}
				name={name || ""}
				value={values[name || ""] || ""}
				placeholder={props.placeholder || ""}
				onChange={(e) => setValue?.(name || "", e.target.value)}
				ref={ref}
				{...props}
			/>
			<span className={s.error}>{errors[name + "Err"]}</span>
		</div>
	);
}));