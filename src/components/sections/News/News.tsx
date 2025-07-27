import newsImg from '../../../assets/img/newsImg.svg'
import HashTag from '../../../UI/HashTag'
import './News.scss'

const News = () => {
	return (
		<div className='news'>
			<div className='title'>
				<h2>Today’s news</h2>
				<span>View all</span>
			</div>
			<div className='news__item'>
				<img src={newsImg} alt='' className='newsImg' />
				<div className='description'>
					Каждый пиксель, анимация или интерактивный элемент влияют на то, как
					пользовател....
				</div>
				<div className='tags'>
					<HashTag title={'ahmaTop'} />
					<HashTag title={'web'} />
				</div>
			</div>
			<div className='news__item'>
				<img src={newsImg} alt='' className='newsImg' />
				<div className='description'>
					Каждый пиксель, анимация или интерактивный элемент влияют на то, как
					пользовател....
				</div>
				<div className='tags'>
					<HashTag title={'ahmaTop'} />
				</div>
			</div>
		</div>
	)
}

export default News
