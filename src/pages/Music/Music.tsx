import * as React from 'react'
import MusicModal from '../../components/modals/Music/Music.tsx'
import { MusicFilter } from '../../components/sections/music-filter/MusicFilter'
import './Music.scss'

interface IAppProps {}

const Music: React.FunctionComponent<IAppProps> = () => {
	return (
		<>
			<div className='music'>
				<MusicFilter />
				<ul className='sound-list'>
					{Array.from({ length: 10 }).map((item, index) => (
						<li className='sound' key={index}>
							<div className='sound__img'>
								<svg
									width='42'
									height='42'
									viewBox='0 0 42 42'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<circle cx='20.8236' cy='20.9222' r='20.5882' fill='white' />
									<path
										d='M31.1177 20.9211L15.6765 29.836V12.0061L31.1177 20.9211Z'
										fill='#141414'
									/>
								</svg>
							</div>
							<div className='sound__info'>
								<div>
									<small>Maja</small>
									<span>Samurai Remix</span>
								</div>
								<div className='info-action'>
									<svg
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											fill-rule='evenodd'
											clip-rule='evenodd'
											d='M3.8065 6.20659C4.70663 5.30673 5.92731 4.80122 7.2001 4.80122C8.47288 4.80122 9.69356 5.30673 10.5937 6.20659L12.0001 7.61179L13.4065 6.20659C13.8493 5.74815 14.3789 5.38247 14.9646 5.13091C15.5502 4.87934 16.18 4.74693 16.8174 4.74139C17.4547 4.73585 18.0868 4.8573 18.6767 5.09865C19.2666 5.34 19.8025 5.69641 20.2532 6.1471C20.7039 6.59778 21.0603 7.13371 21.3016 7.72361C21.543 8.31352 21.6644 8.94558 21.6589 9.58292C21.6534 10.2203 21.5209 10.8501 21.2694 11.4357C21.0178 12.0214 20.6521 12.551 20.1937 12.9938L12.0001 21.1886L3.8065 12.9938C2.90664 12.0937 2.40112 10.873 2.40112 9.60019C2.40112 8.32741 2.90664 7.10673 3.8065 6.20659V6.20659Z'
											stroke='black'
											stroke-width='2'
											stroke-linejoin='round'
										/>
									</svg>

									<svg
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											d='M3.6001 15.2197V18.9256C3.6001 19.4873 3.82135 20.0259 4.21517 20.423C4.609 20.8202 5.14314 21.0433 5.7001 21.0433H18.3001C18.8571 21.0433 19.3912 20.8202 19.785 20.423C20.1788 20.0259 20.4001 19.4872 20.4001 18.9256V15.2197M12.0435 14.9565L12.0435 2.95654M12.0435 2.95654L7.24346 7.54169M12.0435 2.95654L16.8434 7.54169'
											stroke='black'
											stroke-width='2'
											stroke-linecap='round'
											stroke-linejoin='round'
										/>
									</svg>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
			<div className='popular-sounds'>
				<span>Popular sounds</span>
				<ul>
					<li>
						<div className='img'></div>
						<div className='sound-info'>
							<small>billie eilish</small>
							<span>wildflower</span>
						</div>
					</li>
					<li>
						<div className='img'></div>
						<div className='sound-info'>
							<small>LOVV66</small>
							<span>V+V=FOREVER</span>
						</div>
					</li>
					<li>
						<div className='img'></div>
						<div className='sound-info'>
							<small>maja</small>
							<span>Samurai Remix</span>
						</div>
					</li>
				</ul>
			</div>
			<MusicModal />
		</>
	)
}

export default Music
