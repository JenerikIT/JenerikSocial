import { FC, useEffect, useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import "./HistoryModalSwiper.scss";

type SlideData = {
  id: number;
  image: string;
  duration: number;
};

interface HistoryModalSwiperProp {
  isModalOpen: boolean;
  CloseHistoryHandler: () => void;
}

const HistoryModalSwiper: FC<HistoryModalSwiperProp> = ({
  isModalOpen,
  CloseHistoryHandler,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const swiperRef = useRef<SwiperClass | null>(null);

  const slides: SlideData[] = [
    {
      id: 1,
      image:
        "https://yandex-images.clstorage.net/SWKY99334/eb1f038dRN/95_vxp4fE9-pMLGhbWx5QCtRFz8HbF5ylvRCBTVeGFuanteOVP_WO8pqKIP97_7rvh-tH3V-hdxF6K4m3PPKHrXHrZ7cVRDboCL4vX8vaU0mEhspVS0KfMzPIHNMLH8gruHz9COxjzCePWPJuarCga13nDUfC66oL6_QIPqOqXj3j-LzmRl20J8myqx0dHl1ITU8ECoKYwOK0i1wYCRVIKTJ2egFvIcmoDB1tJmT17L3QKEqPCCtrT2v9C3eh7Ji1aT44IcWSPSHKOuIVWl-QhoVACIdC2UMiMk9WEU5chyp_eX1CaGNGKMUYaaJk-qP1Gm5HQ8Kgq8Lq8cs6JK5Vcao_u6eDljfvAjVq0ZvW0A8KxUtOi5nHZ7YGGZ7LFY9v93V2yqxizWsCmGQjojSq-9HsTgEL5SIKLzYDua2l3vlu-jigRRP07o57oFjTE1gJg4jMxw3WAK16gtwbw1uKajP-dEVo4MfkyFWo4CT17X1fqk_HCeNhgaX-hzhpoN507X30rojZdWjF8-IZUBOSyAKOiMqEkUMkvU7a04pawi_2ML4G6SiEY4ZX72yt_GrwGa7EB4FtKQtissIw5GyasqtwcyfFXPYhTH0nUFPek8BJyw2FRJGBor7JmBDG24DjO7l9B2cmQS_G3mskYfYv8ZEkzA4B7WOE7vrIee7r2DZusrXgANn-r47_r9idEdJNx0AFhEneA-w5zhiYjpxKIbe7c0uqbsLkDJzi6WdxY3ATK4oJgOpvje70QnirZRhy6ro8rQ-TMqdNvG0QUlkZgMQFD81OlAZjOEcVWQ8TjmM0ePTPbykMKMpeaqFrduczEuEKT4xpb8wvvIU962qTeus1NeqI3vIhRf0oUtUZEkqGBspHwVyGZf_DWddNkImu-395Byiuh2JE1WjrYXFj8BXozElOqi_N5LTCtSZl2nDs-rzpQBO1IMCzJN9d0hwEBM-OBQndBevxjdTagk",
      duration: 3000,
    },
    {
      id: 2,
      image:
        "https://i.pinimg.com/736x/b9/30/8b/b9308bc5a55148e99e4a68972d40b4b2.jpg",
      duration: 2330,
    },
    {
      id: 3,
      image:
        "https://avatars.mds.yandex.net/i?id=a68443048965e8e6f63e1441a571f302_l-5869166-images-thumbs&n=13",
      duration: 4000,
    },
    {
      id: 4,
      image:
        "https://i.pinimg.com/736x/1e/e0/f7/1ee0f7ed6681a6cf1f634df48669dd50.jpg",
      duration: 2500,
    },
  ];

  useEffect(() => {
    if (isModalOpen && swiperRef.current) {
      setIsPlaying(true);
      swiperRef.current.autoplay.start();
    } else if (swiperRef.current) {
      setIsPlaying(false);
      swiperRef.current.autoplay.stop();
    }
  }, [isModalOpen]);

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveIndex(swiper.realIndex);
    if (swiper.autoplay && swiper.params.autoplay) {
      swiper.autoplay.stop();
      swiper.params.autoplay.delay = slides[swiper.realIndex].duration;
      swiper.autoplay.start();
    }
  };

  return (
    <div className={`historyModalSwiper-modal  ${isModalOpen ? "hide" : ""}`}>
      <div className="historyModalSwiper-modal__wrapper">
        <button className="close-button" onClick={CloseHistoryHandler}>
          <svg
            width="34"
            height="34"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 8L8 16M16 16L8 8"
              stroke="#ffffff"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setActiveIndex(swiper.realIndex);
          }}
          onSlideChange={handleSlideChange}
          spaceBetween={70}
          slidesPerView={"auto"}
          centeredSlides={true}
          grabCursor={true}
          autoplay={{
            delay: slides[0].duration,
            disableOnInteraction: false,
            stopOnLastSlide: false,
            waitForTransition: true,
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
        >
          {slides.map((slide, index) => (
            <SwiperSlide
              className={`${activeIndex !== index ? "blur" : ""}`}
              key={slide.id}
            >
              <div className="slide-content">
                <img src={slide.image} alt={`Slide ${slide.id}`} />
                {isModalOpen && activeIndex === index && (
                  <div className="active-slide-info">
                    <div className="duration-indicator">
                      <div
                        className="progress-bar"
                        style={{
                          animationDuration: `${slide.duration}ms`,
                          animationPlayState: isPlaying ? "running" : "paused",
                        }}
                      />
                    </div>
                    <div className="user">
                      <div className="user__img"></div>
                      <div className="user__name">
                        <span>Jeneric</span>
                        <small>Сегодня в 23:30</small>
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className={`user-info ${activeIndex !== index ? "hide" : ""}`}
                >
                  <div className="user-info__img"></div>
                </div>

                {activeIndex === index && (
                  <div className="history-action">
                    <div className="input">
                      <input type="text" placeholder="Введите сообщение" />

                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21.0708 2.92949L10.4068 13.5935M3.27149 8.23517L19.8774 2.47394C20.9 2.11915 21.8811 3.10028 21.5264 4.12291L15.7651 20.7288C15.3704 21.8664 13.773 21.8976 13.3342 20.7763L10.6973 14.0375C10.5656 13.701 10.2993 13.4347 9.96275 13.303L3.22402 10.6661C2.10268 10.2273 2.13387 8.62985 3.27149 8.23517Z"
                          stroke="#ffffff"
                          stroke-width="1"
                          stroke-linecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default HistoryModalSwiper;
