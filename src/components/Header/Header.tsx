import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { authApi, useAuthMeQuery } from "../../api/auth/authApi";
import logotipSocial from "../../assets/img/logotipSocial.svg";
import { changeValueHeder } from "../../store/Slice/searchHeader";
import "./Header.scss";

const Header = () => {
  const { data, isLoading } = useAuthMeQuery();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [userAccount, setUserAccount] = useState<boolean>(false);
  const [valueHeader, setValue] = useState<string>("");
  const handleChandeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const timerID = setTimeout(() => {
      dispatch(changeValueHeder(valueHeader));
    }, 1000);
    return () => clearTimeout(timerID);
  }, [valueHeader]);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    authApi.util.resetApiState(); // Сброс всего кеша RTK Query
    navigate("/register");
  };
  return (
    <header className="header">
      <div className="header-container">
        <div className="header__logo">
          <NavLink to="/">
            <img src={logotipSocial} alt="" />
          </NavLink>

          <div className="searchUser">
            <svg
              width="10"
              height="10"
              viewBox="0 0 18 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.8645 11.3208H12.0463L11.7633 11.0377C12.7719 9.86964 13.3791 8.35163 13.3791 6.68954C13.3791 2.99485 10.3842 0 6.68954 0C2.99485 0 0 2.99485 0 6.68954C0 10.3842 2.99485 13.3791 6.68954 13.3791C8.35163 13.3791 9.86964 12.7719 11.0377 11.7684L11.3208 12.0515V12.8645L16.4666 18L18 16.4666L12.8645 11.3208ZM6.68954 11.3208C4.13208 11.3208 2.05832 9.247 2.05832 6.68954C2.05832 4.13208 4.13208 2.05832 6.68954 2.05832C9.247 2.05832 11.3208 4.13208 11.3208 6.68954C11.3208 9.247 9.247 11.3208 6.68954 11.3208Z"
                fill="#ffffffbc"
                fill-opacity="0.72"
              />
            </svg>

            <input
              type="text"
              placeholder="Поиск..."
              value={valueHeader}
              onChange={handleChandeValue}
            />
          </div>
        </div>
        <div className="header__user-top">
          {!pathname.includes("posts/create") &&
            !pathname.includes("posts/edit") && (
              <NavLink to="/posts/create">
                <button type="button" className="submit-button">
                  Создать статью
                </button>
              </NavLink>
            )}

          <div
            className="header__userLogo"
            onClick={() => setUserAccount(!userAccount)}
          >
            {data?.userData.avatarUrl ? (
              <img
                src={data?.userData.avatarUrl}
                alt="avatarImg"
                className="userImg"
              />
            ) : (
              <svg
                width="30"
                height="30"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 0C15.52 0 20 4.48 20 10C20 15.52 15.52 20 10 20C4.48 20 0 15.52 0 10C0 4.48 4.48 0 10 0ZM4.023 13.416C5.491 15.606 7.695 17 10.16 17C12.624 17 14.829 15.607 16.296 13.416C14.6317 11.8606 12.4379 10.9968 10.16 11C7.88171 10.9966 5.68751 11.8604 4.023 13.416ZM10 9C10.7956 9 11.5587 8.68393 12.1213 8.12132C12.6839 7.55871 13 6.79565 13 6C13 5.20435 12.6839 4.44129 12.1213 3.87868C11.5587 3.31607 10.7956 3 10 3C9.20435 3 8.44129 3.31607 7.87868 3.87868C7.31607 4.44129 7 5.20435 7 6C7 6.79565 7.31607 7.55871 7.87868 8.12132C8.44129 8.68393 9.20435 9 10 9Z"
                  fill="white"
                />
              </svg>
            )}
            <div className="user-info">
              <h1 className="user-name">{data?.userData.fullName}</h1>
              <div className="description">
                <div className="circle"></div>
                <p>junior</p>
                <svg
                  width="8"
                  height="5"
                  viewBox="0 0 15 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.5 6C6.89429 6 6.28858 5.81157 5.82997 5.4417L0.188203 0.891538C-0.0627343 0.689154 -0.0627343 0.354173 0.188203 0.151788C0.43914 -0.0505961 0.854485 -0.0505961 1.10542 0.151788L6.74719 4.70195C7.16253 5.03693 7.83747 5.03693 8.25281 4.70195L13.8946 0.151788C14.1455 -0.0505961 14.5609 -0.0505961 14.8118 0.151788C15.0627 0.354173 15.0627 0.689154 14.8118 0.891538L9.17003 5.4417C8.71142 5.81157 8.10571 6 7.5 6Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
            <div className={`account-menu ${userAccount ? "active" : ""}`}>
              <div className="account-menu__top">
                {data?.userData.avatarUrl ? (
                  <img
                    src={data.userData.avatarUrl}
                    alt="avatarImg"
                    className="avatarImgPop"
                  />
                ) : (
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 0C15.52 0 20 4.48 20 10C20 15.52 15.52 20 10 20C4.48 20 0 15.52 0 10C0 4.48 4.48 0 10 0ZM4.023 13.416C5.491 15.606 7.695 17 10.16 17C12.624 17 14.829 15.607 16.296 13.416C14.6317 11.8606 12.4379 10.9968 10.16 11C7.88171 10.9966 5.68751 11.8604 4.023 13.416ZM10 9C10.7956 9 11.5587 8.68393 12.1213 8.12132C12.6839 7.55871 13 6.79565 13 6C13 5.20435 12.6839 4.44129 12.1213 3.87868C11.5587 3.31607 10.7956 3 10 3C9.20435 3 8.44129 3.31607 7.87868 3.87868C7.31607 4.44129 7 5.20435 7 6C7 6.79565 7.31607 7.55871 7.87868 8.12132C8.44129 8.68393 9.20435 9 10 9Z"
                      fill="white"
                    />
                  </svg>
                )}
                <div className="account-menu__header">
                  {data?.userData.fullName}
                </div>
                <div className="account-menu__phone">
                  {data?.userData?.phone?.slice(0, 7)}....
                </div>
              </div>
              <ul className="account-menu__options">
                <li className="account-menu__option">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_2825_504)">
                      <path
                        d="M8 5C8.19698 5 8.39204 4.9612 8.57403 4.88582C8.75601 4.81044 8.92137 4.69995 9.06066 4.56066C9.19995 4.42137 9.31044 4.25601 9.38582 4.07403C9.4612 3.89204 9.5 3.69698 9.5 3.5C9.5 3.30302 9.4612 3.10796 9.38582 2.92597C9.31044 2.74399 9.19995 2.57863 9.06066 2.43934C8.92137 2.30005 8.75601 2.18956 8.57403 2.11418C8.39204 2.0388 8.19698 2 8 2C7.60218 2 7.22064 2.15804 6.93934 2.43934C6.65804 2.72064 6.5 3.10218 6.5 3.5C6.5 3.89782 6.65804 4.27936 6.93934 4.56066C7.22064 4.84196 7.60218 5 8 5ZM12 8C12.3978 8 12.7794 7.84196 13.0607 7.56066C13.342 7.27936 13.5 6.89782 13.5 6.5C13.5 6.10218 13.342 5.72064 13.0607 5.43934C12.7794 5.15804 12.3978 5 12 5C11.6022 5 11.2206 5.15804 10.9393 5.43934C10.658 5.72064 10.5 6.10218 10.5 6.5C10.5 6.89782 10.658 7.27936 10.9393 7.56066C11.2206 7.84196 11.6022 8 12 8ZM5.5 7C5.5 7.39782 5.34196 7.77936 5.06066 8.06066C4.77936 8.34196 4.39782 8.5 4 8.5C3.60218 8.5 3.22064 8.34196 2.93934 8.06066C2.65804 7.77936 2.5 7.39782 2.5 7C2.5 6.60218 2.65804 6.22064 2.93934 5.93934C3.22064 5.65804 3.60218 5.5 4 5.5C4.39782 5.5 4.77936 5.65804 5.06066 5.93934C5.34196 6.22064 5.5 6.60218 5.5 7ZM6 13C6.39782 13 6.77936 12.842 7.06066 12.5607C7.34196 12.2794 7.5 11.8978 7.5 11.5C7.5 11.1022 7.34196 10.7206 7.06066 10.4393C6.77936 10.158 6.39782 10 6 10C5.60218 10 5.22064 10.158 4.93934 10.4393C4.65804 10.7206 4.5 11.1022 4.5 11.5C4.5 11.8978 4.65804 12.2794 4.93934 12.5607C5.22064 12.842 5.60218 13 6 13Z"
                        fill="#C880FF"
                      />
                      <path
                        d="M16 8C16 11.15 14.134 10.585 12.433 10.07C11.42 9.763 10.465 9.473 10 10C9.397 10.683 9.525 11.819 9.649 12.92C9.826 14.495 9.996 16 8 16C6.41775 16 4.87103 15.5308 3.55544 14.6518C2.23985 13.7727 1.21447 12.5233 0.608967 11.0615C0.00346619 9.59966 -0.15496 7.99113 0.153721 6.43928C0.462403 4.88743 1.22433 3.46197 2.34315 2.34315C3.46197 1.22433 4.88743 0.462403 6.43928 0.153721C7.99113 -0.15496 9.59966 0.00346619 11.0615 0.608967C12.5233 1.21447 13.7727 2.23985 14.6518 3.55544C15.5308 4.87103 16 6.41775 16 8ZM8 15C8.611 15 8.654 14.829 8.655 14.824C8.733 14.678 8.779 14.36 8.725 13.705C8.711 13.537 8.688 13.335 8.664 13.114C8.612 12.65 8.552 12.109 8.546 11.652C8.536 10.945 8.629 10.042 9.25 9.338C9.619 8.921 10.095 8.76 10.522 8.72C10.926 8.682 11.334 8.746 11.682 8.824C12.025 8.901 12.384 9.01 12.707 9.108L12.735 9.116C13.081 9.221 13.393 9.315 13.688 9.382C14.341 9.53 14.592 9.465 14.679 9.406C14.717 9.38 15 9.161 15 8C15 6.61553 14.5895 5.26216 13.8203 4.11101C13.0511 2.95987 11.9579 2.06266 10.6788 1.53285C9.39971 1.00303 7.99224 0.86441 6.63437 1.13451C5.2765 1.4046 4.02922 2.07129 3.05026 3.05026C2.07129 4.02922 1.4046 5.2765 1.13451 6.63437C0.86441 7.99224 1.00303 9.39971 1.53285 10.6788C2.06266 11.9579 2.95987 13.0511 4.11101 13.8203C5.26216 14.5895 6.61553 15 8 15Z"
                        fill="#C880FF"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2825_504">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  Тема: <p>Темная</p>
                </li>
                <li className="account-menu__option">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 14C12.6569 14 14 12.6569 14 11C14 9.3431 12.6569 8 11 8C9.3431 8 8 9.3431 8 11C8 12.6569 9.3431 14 11 14Z"
                      stroke="#C880FF"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M18.6224 9.3954L17.5247 6.7448L19 5L17 3L15.2647 4.48295L12.5578 3.36974L11.9353 1H9.981L9.3491 3.40113L6.70441 4.51596L5 3L3 5L4.45337 6.78885L3.3725 9.4463L1 10V12L3.40111 12.6555L4.51575 15.2997L3 17L5 19L6.79116 17.5403L9.397 18.6123L10 21H12L12.6045 18.6132L15.2551 17.5155C15.6969 17.8313 17 19 17 19L19 17L17.5159 15.2494L18.6139 12.598L20.9999 11.9772L21 10L18.6224 9.3954Z"
                      stroke="#C880FF"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Настройки
                </li>
                <li className="account-menu__option" onClick={handleLogout}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 21 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 7.5H12.908L9.90797 4.5L10.9688 3.43922L15.7795 8.25L10.9688 13.0608L9.90797 12L12.908 9H6V15.9375C6 16.0867 6.05926 16.2298 6.16475 16.3352C6.27024 16.4407 6.41332 16.5 6.5625 16.5H20.4375C20.5867 16.5 20.7298 16.4407 20.8352 16.3352C20.9407 16.2298 21 16.0867 21 15.9375V0.5625C21 0.413316 20.9407 0.270242 20.8352 0.164752C20.7298 0.0592632 20.5867 0 20.4375 0H6.5625C6.41332 0 6.27024 0.0592632 6.16475 0.164752C6.05926 0.270242 6 0.413316 6 0.5625V7.5Z"
                      fill="#c880ff"
                    />
                    <path d="M6 7.5H0V9H6V7.5Z" fill="#c880ff" />
                  </svg>
                  Выйти
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
