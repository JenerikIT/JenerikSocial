import { NavigateFunction } from "react-router-dom";

export let navigate: any = null;

export const setNavigate = (navigateFunction: NavigateFunction) => {
	navigate = navigateFunction;
};