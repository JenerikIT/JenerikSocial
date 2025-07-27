import './musicFilter.scss'
export interface IAppProps {}

export function MusicFilter(props: IAppProps) {
	return (
		<div className='music-filter'>
			<div className='music-filter__input'>
				<input type='text' placeholder='Поиск' />
				<svg
					width='19'
					height='18'
					viewBox='0 0 19 18'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M13.331 11.3208H12.4888L12.1974 11.0377C13.2356 9.86964 13.8607 8.35163 13.8607 6.68954C13.8607 2.99485 10.7778 0 6.97442 0C3.17107 0 0.0881348 2.99485 0.0881348 6.68954C0.0881348 10.3842 3.17107 13.3791 6.97442 13.3791C8.6854 13.3791 10.2481 12.7719 11.4505 11.7684L11.7419 12.0515V12.8645L17.039 18L18.6175 16.4666L13.331 11.3208ZM6.97442 11.3208C4.34174 11.3208 2.20699 9.247 2.20699 6.68954C2.20699 4.13208 4.34174 2.05832 6.97442 2.05832C9.6071 2.05832 11.7419 4.13208 11.7419 6.68954C11.7419 9.247 9.6071 11.3208 6.97442 11.3208Z'
						fill='#8488FF'
					/>
				</svg>
			</div>
			<div className='music-filter-btn'>
				<button>
					<svg
						width='16'
						height='16'
						viewBox='0 0 16 16'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M13.3334 8.00065H2.66675'
							stroke='#8488FF'
							stroke-width='2'
							stroke-linecap='round'
						/>
						<path
							d='M7.99992 2.66602V13.3327'
							stroke='#8488FF'
							stroke-width='2'
							stroke-linecap='round'
						/>
					</svg>
				</button>

				<div>
					<span>View</span>
					<button>
						<svg
							width='16'
							height='16'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M19.4671 2.3999C20.6453 2.3999 21.6004 3.34194 21.6004 4.50401L21.6004 8.09583C21.6004 9.2579 20.6453 10.1999 19.4671 10.1999H16.2671C15.0889 10.1999 14.1337 9.2579 14.1337 8.09583L14.1337 4.50401C14.1337 3.34194 15.0888 2.3999 16.2671 2.3999L19.4671 2.3999Z'
								stroke='#8488FF'
								stroke-width='2'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
							<path
								d='M4.53372 2.3999C3.35552 2.3999 2.40039 3.34194 2.40039 4.50401L2.4004 8.09583C2.4004 9.2579 3.35553 10.1999 4.53373 10.1999H7.73373C8.91194 10.1999 9.86706 9.2579 9.86706 8.09583L9.86705 4.50401C9.86705 3.34194 8.91193 2.3999 7.73372 2.3999L4.53372 2.3999Z'
								stroke='#8488FF'
								stroke-width='2'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
							<path
								d='M19.4671 13.7999C20.6453 13.7999 21.6004 14.742 21.6004 15.9041V19.4958C21.6004 20.6579 20.6453 21.5999 19.4671 21.5999H16.2671C15.0889 21.5999 14.1337 20.6579 14.1337 19.4958L14.1337 15.9041C14.1337 14.742 15.0889 13.7999 16.2671 13.7999H19.4671Z'
								stroke='#8488FF'
								stroke-width='2'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
							<path
								d='M4.53373 13.7999C3.35552 13.7999 2.4004 14.742 2.4004 15.9041L2.4004 19.4958C2.4004 20.6579 3.35553 21.5999 4.53373 21.5999H7.73373C8.91194 21.5999 9.86707 20.6579 9.86707 19.4958L9.86706 15.9041C9.86706 14.742 8.91194 13.7999 7.73373 13.7999H4.53373Z'
								stroke='#8488FF'
								stroke-width='2'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
						</svg>
					</button>
					<button>
						<svg
							width='16'
							height='16'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M8.72059 6H21.6006M8.72059 12.48H21.6006M8.72059 18.96H21.6006M3.60059 6V6.0128M3.60059 12.48V12.4928M3.60059 18.96V18.9728'
								stroke='#ffffff'
								stroke-width='2'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	)
}
