import { observer } from 'mobx-react-lite';
import { LoaderUi } from '../LoaderUi/LoaderUi';

interface AsyncDataRenderProps<T> {
	status: "pending" | "fulfilled" | "rejected" | undefined;
	data: T | null | undefined;
	render: (data: NonNullable<T>) => React.ReactNode;
	errorComponent?: React.ReactNode;
	pendingComponent?: React.ReactNode;
	noDataComponent?: React.ReactNode;
}

export const AsyncDataRender = observer(<T,>({
	status,
	data,
	render,
	errorComponent,
	pendingComponent,
	noDataComponent,
}: AsyncDataRenderProps<T>) => {
	const finalData = typeof data === "object" ? data : [];

	return (
		<>
			{status === 'pending' ? (
				pendingComponent || (
					<div>
						<span>Loading...</span>
						<LoaderUi />
					</div>
				)
			) : status === "fulfilled" ? (
				<>
					{/* @ts-ignore */}
					{(finalData?.length > 0) ? render(finalData!) : typeof finalData === "object" ? render(finalData!) : noDataComponent || (
						<div>
							<span>No data</span>
						</div>
					)}
				</>
			) : (
				errorComponent || <div>Error</div>
			)}
		</>
	);
});