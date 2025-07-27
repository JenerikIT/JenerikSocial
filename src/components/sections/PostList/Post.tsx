import { memo, useCallback, useEffect, useMemo, useState } from "react";
import HashTag from "../../../UI/HashTag";
import imgPost from "../../../assets/img/berserkPost.svg";
import Modal from "../../../UI/Modal";
import "./Modal.scss";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import { PostProps, useDeletePostMutation } from "../../../api/posts/postsApi";
import axios from "../../../api/axios";
import { addFavourite } from "../../../store/Slice/favourite";
import { useAuthMeQuery } from "../../../api/auth/authApi";
import { useNavigate } from "react-router-dom";
const Post = memo(
  ({
    text,
    user,
    tags,
    title,
    _id: id,
    createdAt,
    viewsCount,
    likeCount,
  }: PostProps) => {
    const navigate = useNavigate();
    createdAt = createdAt.slice(0, 10);
    const [deletePost] = useDeletePostMutation();
    const { data: AuthData } = useAuthMeQuery();
    const isAuthor = useMemo(() => {
      return AuthData?.userData?._id === user._id;
    }, [AuthData, user._id]);

    const handleDelete = useCallback(() => {
      if (window.confirm("Вы уверены, что хотите удалить пост?")) {
        try {
          deletePost(id).unwrap();
          location.reload();
        } catch (error) {
          alert("Не удалось удалить пост(");
        }
      }
    }, [deletePost, id]);
    const dispatch = useAppDispatch();
    const [activePopUp, setActivePopUp] = useState(false);
    const [complain, setComplain] = useState(false);
    const copyToClipboard = (text: string) => {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          alert("Скопировано в буфер обмена!");
        })
        .catch(() => {
          alert("Не удалось скопировать");
        });
    };
    const [modalPost, setModalPost] = useState(false);
    useEffect(() => {
      if (modalPost) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }, [modalPost]);
    const onClickModal = useCallback((i: boolean) => {
      setModalPost(i);
    }, []);
    const showOnePost = async (_id: string) => {
      await axios.get(`/posts/${_id}`);
    };
    const isFavourite = useSelector((state: RootState) =>
      state.favourite.itemsFavourite.some((obj) => obj._id === id)
    );
    return (
      <>
        <div className="post liked">
          <div className="top">
            <div className="post__logo">
              <img src={imgPost} alt="" width={50} height={50} />
              <div className="post__info">
                <div className="name">Ahma</div>
                <p>{createdAt}</p>
              </div>
            </div>
            <div className="container-PopUp-post">
              <ul className={`popUp ${activePopUp ? "active" : ""}`}>
                <li
                  className="popUp__item"
                  onClick={() => {
                    setActivePopUp(false);
                    alert("Добавлено в закаладки");
                  }}
                >
                  <svg
                    width="9"
                    height="13"
                    viewBox="0 0 9 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.75353 10.424L4.5 10.2749L4.24647 10.424L0.74919 12.4814C0.687024 12.5012 0.62989 12.5013 0.588606 12.4909C0.55337 12.482 0.525996 12.4655 0.503399 12.4339C0.502415 12.4316 0.501693 12.4298 0.501177 12.4284C0.501017 12.4263 0.50082 12.423 0.500643 12.4183C0.50007 12.4033 0.5 12.3849 0.5 12.35V1.95C0.5 1.11592 1.11705 0.5 1.92857 0.5H7.07143C7.88295 0.5 8.5 1.11592 8.5 1.95V12.35C8.5 12.433 8.47466 12.4626 8.46771 12.4697C8.46125 12.4762 8.4347 12.5 8.35714 12.5C8.32252 12.5 8.30471 12.4999 8.29019 12.4994C8.28724 12.4992 8.2849 12.4991 8.2831 12.499C8.28081 12.4981 8.27752 12.4966 8.27313 12.4946L4.75353 10.424Z"
                      stroke="white"
                    />
                  </svg>
                  Добавить в закладки
                </li>
                <li
                  className="popUp__item last"
                  onClick={() => {
                    setActivePopUp(false);
                    copyToClipboard(text);
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_2670_291)">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.69727 3.65625C4.12233 3.65625 3.65625 4.12233 3.65625 4.69727V10.334C3.65625 10.9089 4.12233 11.375 4.69727 11.375H10.334C10.9089 11.375 11.375 10.9089 11.375 10.334V4.69727C11.375 4.12233 10.9089 3.65625 10.334 3.65625H4.69727ZM2.84375 4.69727C2.84375 3.6736 3.6736 2.84375 4.69727 2.84375H10.334C11.3577 2.84375 12.1875 3.6736 12.1875 4.69727V10.334C12.1875 11.3577 11.3577 12.1875 10.334 12.1875H4.69727C3.6736 12.1875 2.84375 11.3577 2.84375 10.334V4.69727Z"
                        fill="white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2.84255 0.812502L2.84375 0.8125H8.32812L8.32928 0.812502C8.8134 0.813879 9.2773 1.0068 9.61962 1.34913C9.96194 1.69145 10.1549 2.15535 10.1562 2.63947C10.1563 2.64268 10.1562 2.64588 10.1562 2.64909L10.1435 3.25846C10.1388 3.48278 9.95316 3.66084 9.72884 3.65616C9.50453 3.65149 9.32647 3.46586 9.33114 3.24154L9.34373 2.63738C9.34181 2.36954 9.23458 2.11313 9.0451 1.92365C8.8547 1.73326 8.59674 1.62591 8.3275 1.625H2.8444C2.52134 1.6261 2.21182 1.75492 1.98337 1.98337C1.75492 2.21182 1.6261 2.52134 1.625 2.8444V8.3275C1.62591 8.59674 1.73326 8.8547 1.92365 9.0451C2.11405 9.23549 2.37203 9.34285 2.64128 9.34375H3.25C3.47437 9.34375 3.65625 9.52563 3.65625 9.75C3.65625 9.97437 3.47437 10.1562 3.25 10.1562H2.64062L2.63947 10.1562C2.15535 10.1549 1.69145 9.96194 1.34913 9.61962C1.0068 9.2773 0.813879 8.8134 0.812502 8.32928L0.8125 8.32812V2.84375L0.812502 2.84255C0.814092 2.30464 1.02848 1.78921 1.40885 1.40885C1.78921 1.02848 2.30464 0.814092 2.84255 0.812502Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2670_291">
                        <rect width="13" height="13" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Скопировать текст
                </li>
                <li
                  className="popUp__item popUp__item-complain"
                  onClick={() => {
                    setActivePopUp(false);
                    setComplain(true);
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 6.49689L11.5582 4.77019L11.7591 2.48447L9.62591 1.97516L8.50909 0L6.5 0.906832L4.49091 0L3.37409 1.97516L1.24091 2.47826L1.44182 4.76398L0 6.49689L1.44182 8.2236L1.24091 10.5155L3.37409 11.0248L4.49091 13L6.5 12.087L8.50909 12.9938L9.62591 11.0186L11.7591 10.5093L11.5582 8.2236L13 6.49689ZM7.09091 9.60248H5.90909V8.36025H7.09091V9.60248ZM7.09091 7.11801H5.90909V3.3913H7.09091V7.11801Z"
                      fill="#8488FF"
                    />
                  </svg>
                  Пожаловаться
                </li>
                {isAuthor && (
                  <li
                    className="popUp__item popUp__item-delete"
                    onClick={() => {
                      handleDelete();
                    }}
                  >
                    <svg
                      width="14"
                      height="16"
                      viewBox="0 0 14 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.75 15.5H3.25C2.42157 15.5 1.75 14.8284 1.75 14V4.25H0.25V2.75H3.25V2C3.25 1.17157 3.92157 0.5 4.75 0.5H9.25C10.0784 0.5 10.75 1.17157 10.75 2V2.75H13.75V4.25H12.25V14C12.25 14.8284 11.5784 15.5 10.75 15.5ZM3.25 4.25V14H10.75V4.25H3.25ZM4.75 2V2.75H9.25V2H4.75ZM9.25 12.5H7.75V5.75H9.25V12.5ZM6.25 12.5H4.75V5.75H6.25V12.5Z"
                        fill="#D70000"
                      />
                    </svg>
                    Удалить пост
                  </li>
                )}
              </ul>
              <svg
                onClick={() => setActivePopUp(!activePopUp)}
                width="5"
                height="17"
                viewBox="0 0 5 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.4999 4.3001C1.3401 4.3001 0.399902 3.3599 0.399902 2.2001C0.399902 1.0403 1.3401 0.100098 2.4999 0.100098C3.6597 0.100098 4.5999 1.0403 4.5999 2.2001C4.5999 3.3599 3.6597 4.3001 2.4999 4.3001Z"
                  fill="white"
                />
                <path
                  d="M2.4999 10.6001C1.3401 10.6001 0.399902 9.6599 0.399902 8.5001C0.399902 7.3403 1.3401 6.4001 2.4999 6.4001C3.6597 6.4001 4.5999 7.3403 4.5999 8.5001C4.5999 9.6599 3.6597 10.6001 2.4999 10.6001Z"
                  fill="white"
                />
                <path
                  d="M2.4999 16.9001C1.3401 16.9001 0.399902 15.9599 0.399902 14.8001C0.399902 13.6403 1.3401 12.7001 2.4999 12.7001C3.6597 12.7001 4.5999 13.6403 4.5999 14.8001C4.5999 15.9599 3.6597 16.9001 2.4999 16.9001Z"
                  fill="white"
                />
                <path
                  d="M2.4999 4.3001C1.3401 4.3001 0.399902 3.3599 0.399902 2.2001C0.399902 1.0403 1.3401 0.100098 2.4999 0.100098C3.6597 0.100098 4.5999 1.0403 4.5999 2.2001C4.5999 3.3599 3.6597 4.3001 2.4999 4.3001Z"
                  stroke="white"
                />
                <path
                  d="M2.4999 10.6001C1.3401 10.6001 0.399902 9.6599 0.399902 8.5001C0.399902 7.3403 1.3401 6.4001 2.4999 6.4001C3.6597 6.4001 4.5999 7.3403 4.5999 8.5001C4.5999 9.6599 3.6597 10.6001 2.4999 10.6001Z"
                  stroke="white"
                />
                <path
                  d="M2.4999 16.9001C1.3401 16.9001 0.399902 15.9599 0.399902 14.8001C0.399902 13.6403 1.3401 12.7001 2.4999 12.7001C3.6597 12.7001 4.5999 13.6403 4.5999 14.8001C4.5999 15.9599 3.6597 16.9001 2.4999 16.9001Z"
                  stroke="white"
                />
              </svg>
            </div>
          </div>
          <div className="image">
            <img
              src={imgPost}
              alt=""
              onClick={() => {
                onClickModal(true);
                showOnePost(id);
              }}
            />
          </div>
          <div
            className="description"
            onClick={() => {
              onClickModal(true);
            }}
          >
            {text}
          </div>
          <div className="post__footer">
            <span
              className="goToPost"
              onClick={() => {
                navigate(`/posts/${id}`);
              }}
            >
              Перейти к посту
            </span>
            <div className="tags">
              {tags.map((name, i) => (
                <HashTag title={name} key={i} />
              ))}
            </div>
            <div className="views">
              <ul className="imageTop">
                <li>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.77778 8.11111C2.77778 4.18375 5.96153 1 9.88889 1C13.8162 1 17 4.18375 17 8.11111C17 9.13335 16.7843 10.1052 16.3959 10.9837L17.0014 15.2215L13.3696 14.3136C12.3407 14.8922 11.1533 15.2222 9.88889 15.2222M1.00084 12.5556C1.00084 13.1945 1.13564 13.8019 1.37835 14.3509L1 16.9996L3.26966 16.4321C3.91263 16.7937 4.65466 17 5.44487 17C7.89923 17 9.88889 15.0102 9.88889 12.5556C9.88889 10.101 7.89923 8.11111 5.44487 8.11111C2.9905 8.11111 1.00084 10.101 1.00084 12.5556Z"
                      stroke="white"
                      stroke-width="1.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  124
                </li>
                <li>
                  <svg
                    onClick={() => {
                      const items = {
                        text,
                        title,
                        _id,
                        tags,
                        viewsCount,
                        user,
                        createdAt,
                        likeCount,
                      };
                      // axios.patch(`/posts/liked/${_id}`);
                      dispatch(addFavourite(items));
                    }}
                    width="15"
                    height="15"
                    viewBox="0 0 18 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.17212 2.17184C2.92223 1.42195 3.93946 1.00069 5.00012 1.00069C6.06078 1.00069 7.07801 1.42195 7.82812 2.17184L9.00012 3.34284L10.1721 2.17184C10.5411 1.7898 10.9825 1.48507 11.4705 1.27543C11.9585 1.06579 12.4834 0.95545 13.0145 0.950835C13.5456 0.946219 14.0723 1.04743 14.5639 1.24855C15.0555 1.44967 15.5021 1.74669 15.8777 2.12226C16.2533 2.49783 16.5503 2.94443 16.7514 3.43602C16.9525 3.92761 17.0537 4.45432 17.0491 4.98544C17.0445 5.51656 16.9342 6.04144 16.7245 6.52945C16.5149 7.01747 16.2102 7.45885 15.8281 7.82784L9.00012 14.6568L2.17212 7.82784C1.42224 7.07773 1.00098 6.06049 1.00098 4.99984C1.00098 3.93918 1.42224 2.92195 2.17212 2.17184V2.17184Z"
                      fill={isFavourite ? "#8488FF" : ""}
                      stroke="#8488FF"
                      stroke-linejoin="round"
                    />
                  </svg>
                  {likeCount}
                </li>
                <li>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.67977 12.1534H4.34532C2.86599 12.1534 1.66675 11.132 1.66675 9.63452C1.66675 8.137 2.86599 6.92301 4.34532 6.92301C4.44592 6.92301 4.54522 6.92863 4.64294 6.93957V6.92301H4.67978C4.65546 6.72562 4.64294 6.52452 4.64294 6.32046C4.64294 3.65819 6.77492 1.5 9.40484 1.5C11.1858 1.5 12.7383 2.48966 13.5552 3.95535C13.7548 3.92562 13.959 3.91023 14.1667 3.91023C16.4679 3.91023 18.3334 5.79865 18.3334 8.12813C18.3334 10.253 16.7812 11.8183 14.762 12.1107H12.6042M9.70246 7.22429V16.5M9.70246 16.5L7.59123 14.4173M9.70246 16.5L11.7579 14.4173"
                      stroke="white"
                      stroke-width="1.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </li>
              </ul>
              <span>{viewsCount}</span>
              <svg
                width="19"
                height="13"
                viewBox="0 0 19 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.16667 0C5 0 1.44167 2.59167 0 6.25C1.44167 9.90833 5 12.5 9.16667 12.5C13.3333 12.5 16.8917 9.90833 18.3333 6.25C16.8917 2.59167 13.3375 0 9.16667 0ZM9.16667 10.4167C6.86667 10.4167 5 8.55 5 6.25C5 3.95 6.86667 2.08333 9.16667 2.08333C11.4667 2.08333 13.3333 3.95 13.3333 6.25C13.3333 8.55 11.4667 10.4167 9.16667 10.4167ZM9.16667 3.75C7.7875 3.75 6.66667 4.87083 6.66667 6.25C6.66667 7.62917 7.7875 8.75 9.16667 8.75C10.5458 8.75 11.6667 7.62917 11.6667 6.25C11.6667 4.87083 10.5458 3.75 9.16667 3.75Z"
                  fill="#8488FF"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className={`modal-Post-container ${complain ? "active" : ""}`}>
          <div className={`modal-Post ${complain ? "active" : ""}`}>
            <div className="title">
              <h3>Пожаловаться</h3>
              <svg
                onClick={() => setComplain(false)}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_2748_1024)">
                  <path d="M24 0H0V24H24V0Z" fill="white" fill-opacity="0.01" />
                  <path
                    d="M12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.8285 9.17139L9.17163 14.8282"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.17163 9.17139L14.8285 14.8282"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2748_1024">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="content">
              <img src="" alt="" />
              <div className="content-info">
                <div className="content-info__description">
                  Каждый пиксель, анимация или интерактивный элемент влияют на
                  то, как пользователь чувствует себя на сайте. Хороший фронтенд
                  — это когда после клика хочется сказать: "Вау, как плавно!"
                </div>
                <div className="group-checked">
                  <label className="custom-checkbox">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    <span className="checked__name">Спам</span>
                  </label>
                  <label className="custom-checkbox">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    <span className="checked__name">Насилие</span>
                  </label>
                  <label className="custom-checkbox">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    <span className="checked__name">Не хочу это видеть</span>
                  </label>
                  <label className="custom-checkbox">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    <span className="checked__name">Обман</span>
                  </label>
                  <label className="custom-checkbox">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    <span className="checked__name">
                      Откровенное изображение
                    </span>
                  </label>
                  <button onClick={() => setComplain(false)}>
                    Отправить
                    <svg width="20" height="13" viewBox="0 0 20 13" fill="none">
                      <path
                        d="M18.4844 6.49992L9.00479 6.49992M5.01013 9.6269H3.1844M5.01013 6.60974H1.3844M5.01013 3.59259H3.1844M8.21494 0.946887L18.1564 5.76701C18.7687 6.06384 18.7687 6.936 18.1564 7.23284L8.21494 12.053C7.53388 12.3832 6.80999 11.687 7.11336 10.9936L8.9365 6.8264C9.02755 6.61827 9.02755 6.38157 8.9365 6.17345L7.11336 2.00628C6.80999 1.31285 7.53388 0.616677 8.21494 0.946887Z"
                        stroke="white"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          onClickModal={onClickModal}
          modalPost={modalPost}
          key={id}
          content={title}
          tags={tags}
          imgPost={imgPost}
        />
      </>
    );
  }
);

export default Post;
