import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  useAuthMeQuery,
  useRegisterPostMutation,
} from "../../../api/auth/authApi";
import "./register.scss";
import axios from "axios";

type FormData = {
  fullName: string;
  password: string;
  phone: string;
  email: string;
  checkbox: string;
};
function Register({}) {
  const navigate = useNavigate();

  const [checked, SetChecked] = useState(false);
  const [trueReg, SetTrueReg] = useState<boolean>(false);
  const [fullName, SetFullNameValue] = useState("");
  const [registerPost, { isLoading }] = useRegisterPostMutation();
  const [avatarUrl, SetAvatarUser] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const imgUserRef = useRef<HTMLInputElement>(null);
  const handleImageUploadUser = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files?.length === 0) return;
    const formDataImgUser = new FormData();
    const file = e.target.files[0];
    formDataImgUser.append("image", file);

    try {
      const { data } = await axios.post(
        "http://localhost:4444/upload/user",
        formDataImgUser
      );
      if (!data || !data.url) {
        throw new Error("Invalid server response");
      }
      SetAvatarUser(`http://localhost:4444${data.url}`);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const onSubmit = async (formData: FormData) => {
    if (fullName.length < 4)
      return alert("Имя должно состоять минимум из 4 букв");
    if (checked && formData) {
      try {
        const newFormData = {
          ...formData,
          fullName: fullName,
          avatarUrl: avatarUrl,
        };
        const { token } = await registerPost(newFormData).unwrap();
        localStorage.setItem("token", token);
        navigate("/");
      } catch (error) {
        console.error("Ошибка регистрации:", error);
      }
    }
  };
  return (
    <div className="register">
      <div className="register__container">
        <div className="register__header">
          <h1 className="register__title">Регистрация</h1>
        </div>
        <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
          <div className={`register__input-group ${!trueReg ? "err" : ""}`}>
            <div className="container-user">
              <input
                type="file"
                hidden
                ref={imgUserRef}
                onChange={handleImageUploadUser}
                accept="image/*"
              />
              <div
                className="img-container"
                onClick={() => imgUserRef.current?.click()}
              >
                {avatarUrl ? (
                  <img src={avatarUrl} alt="imgUser" className="userImg" />
                ) : (
                  <svg
                    className="userImg"
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 40C0 17.9086 17.9086 0 40 0V0C62.0914 0 80 17.9086 80 40V40C80 62.0914 62.0914 80 40 80V80C17.9086 80 0 62.0914 0 40V40Z"
                      fill="black"
                    />
                    <path
                      d="M39.5 34.6328C42.3793 34.6328 44.7332 37.0244 44.7334 39.999C44.7334 42.9738 42.3795 45.3662 39.5 45.3662C36.6205 45.3662 34.2666 42.9739 34.2666 39.999C34.2668 37.0244 36.6206 34.6328 39.5 34.6328Z"
                      fill="black"
                      fill-opacity="0.87"
                      stroke="white"
                    />
                    <path
                      d="M44.6519 22.166L47.7808 25.666L47.9302 25.833H53.8335C55.5173 25.833 56.9163 27.2478 56.9165 28.999V50.999C56.9165 52.7504 55.5174 54.166 53.8335 54.166H25.1665C23.4827 54.1658 22.0835 52.7503 22.0835 50.999V28.999C22.0837 27.2479 23.4828 25.8332 25.1665 25.833H31.0698L31.2192 25.666L34.3481 22.166H44.6519ZM39.5005 30.333C34.2687 30.333 30.0417 34.6739 30.0415 39.999C30.0415 45.3243 34.2686 49.666 39.5005 49.666C44.7323 49.6658 48.9585 45.3242 48.9585 39.999C48.9583 34.674 44.7321 30.3332 39.5005 30.333Z"
                      fill="#0D0D17"
                      fill-opacity="0.87"
                      stroke="white"
                    />
                  </svg>
                )}

                <div className="overlay-img">
                  <span>Добавить фото</span>
                </div>
              </div>
            </div>
            <div className="register__input-container">
              <input
                value={fullName}
                onChange={(e) => {
                  SetFullNameValue(e.target.value);
                }}
                ref={inputRef}
                style={
                  fullName.length < 4 ? { border: "1px solid #D70000" } : {}
                }
                type="text"
                placeholder="Имя"
                className="register__input"
              />
              <span className="register__hint">
                {fullName.length < 5 && "Минимум 5 букв"}
              </span>
            </div>
            <input
              style={errors.password && { border: "1px solid #D70000" }}
              type="password"
              defaultValue={"nara19801980"}
              placeholder="Пароль"
              className={`register__input ${
                errors.password ? "register__input--error" : ""
              }`}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z]).{8,}$/,
                  message:
                    "Пароль должен содержать 8 символов, включая цифру и строчную букву.",
                },
              })}
            />
            {errors.password && (
              <span className="register__error">{errors.password.message}</span>
            )}
          </div>
          <p className="register__description">
            Пароль должен содержать 8 символов, включая цифру и строчную букву.
          </p>

          <div className="register__contacts">
            <div className="register__phone-container">
              <span className="register__label">Телефон:</span>
              <div className="register__phone-input">
                <div className="register__country-code">
                  +7
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 21 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_3169_1325)">
                      <path
                        d="M20.4254 17.0498V17.8085C20.4244 18.2269 20.1176 18.5658 19.7388 18.567H1.19985C0.82097 18.5658 0.514247 18.2269 0.513184 17.8085V17.0498H20.4254Z"
                        fill="#E6E7E8"
                      />
                      <path
                        d="M20.4254 4.1532V17.0497H0.513184V4.1532C0.514247 3.73459 0.82097 3.39571 1.19985 3.39453H19.7388C20.1176 3.39571 20.4244 3.73476 20.4254 4.1532Z"
                        fill="#C03A2B"
                      />
                      <path
                        d="M1.19985 3.39453H10.126V10.9807H0.513184V4.1532C0.513184 3.73425 0.820514 3.39453 1.19985 3.39453Z"
                        fill="#285680"
                      />
                      <path
                        d="M10.126 4.91187H20.4254V6.42903H10.126V4.91187Z"
                        fill="#E6E7E8"
                      />
                      <path
                        d="M10.126 7.94629H20.4254V9.46362H10.126V7.94629Z"
                        fill="#E6E7E8"
                      />
                      <path
                        d="M0.513184 10.9807H20.4254V12.498H0.513184V10.9807Z"
                        fill="#E6E7E8"
                      />
                      <path
                        d="M12.9823 15.5325H20.4254V14.0151H0.513184V15.5325H7.95627"
                        fill="#E6E7E8"
                      />
                      <path
                        d="M1.20006 3.77393L1.35927 4.1301L1.71506 4.18733L1.45756 4.46461L1.51833 4.85603L1.20006 4.6714L0.881793 4.85603L0.94256 4.46461L0.685059 4.18733L1.0407 4.1301L1.20006 3.77393Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M2.57311 3.77393L2.73247 4.1301L3.08811 4.18733L2.83061 4.46461L2.89138 4.85603L2.57311 4.6714L2.25484 4.85603L2.31561 4.46461L2.05811 4.18733L2.4139 4.1301L2.57311 3.77393Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M3.94664 3.77393L4.10585 4.1301L4.4615 4.18733L4.20415 4.46461L4.26491 4.85603L3.94664 4.6714L3.62837 4.85603L3.68914 4.46461L3.43164 4.18733L3.78728 4.1301L3.94664 3.77393Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M5.31969 3.77393L5.47905 4.1301L5.83469 4.18733L5.57719 4.46461L5.63796 4.85603L5.31969 4.6714L5.00142 4.85603L5.06219 4.46461L4.80469 4.18733L5.16033 4.1301L5.31969 3.77393Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M6.69323 3.77393L6.85244 4.1301L7.20808 4.18733L6.95058 4.46461L7.01134 4.85603L6.69323 4.6714L6.37496 4.85603L6.43572 4.46461L6.17822 4.18733L6.53386 4.1301L6.69323 3.77393Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M8.06627 3.77393L8.22563 4.1301L8.58128 4.18733L8.32377 4.46461L8.38454 4.85603L8.06627 4.6714L7.748 4.85603L7.80877 4.46461L7.55127 4.18733L7.90691 4.1301L8.06627 3.77393Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M9.43966 3.77393L9.59902 4.1301L9.95466 4.18733L9.69716 4.46461L9.75792 4.85603L9.43966 4.6714L9.12154 4.85603L9.18231 4.46461L8.9248 4.18733L9.28045 4.1301L9.43966 3.77393Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M1.97237 5.21045L2.13173 5.56662L2.48737 5.62386L2.22987 5.90114L2.29064 6.29256L1.97237 6.10759L1.65425 6.29256L1.71502 5.90114L1.45752 5.62386L1.81316 5.56662L1.97237 5.21045Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M3.34557 5.21045L3.50493 5.56662L3.86057 5.62386L3.60307 5.90114L3.66384 6.29256L3.34557 6.10759L3.0273 6.29256L3.08807 5.90114L2.83057 5.62386L3.18621 5.56662L3.34557 5.21045Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M4.71895 5.21045L4.87832 5.56662L5.23396 5.62386L4.97645 5.90114L5.03722 6.29256L4.71895 6.10759L4.40068 6.29256L4.46145 5.90114L4.2041 5.62386L4.55974 5.56662L4.71895 5.21045Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M6.09215 5.21045L6.25136 5.56662L6.60715 5.62386L6.34965 5.90114L6.41042 6.29256L6.09215 6.10759L5.77388 6.29256L5.83465 5.90114L5.57715 5.62386L5.93279 5.56662L6.09215 5.21045Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M7.46569 5.21045L7.62505 5.56662L7.98069 5.62386L7.72319 5.90114L7.78396 6.29256L7.46569 6.10759L7.14742 6.29256L7.20819 5.90114L6.95068 5.62386L7.30648 5.56662L7.46569 5.21045Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M8.83873 5.21045L8.99794 5.56662L9.35358 5.62386L9.09624 5.90114L9.157 6.29256L8.83873 6.10759L8.52046 6.29256L8.58123 5.90114L8.32373 5.62386L8.67937 5.56662L8.83873 5.21045Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M1.20006 6.64648L1.35927 7.00299L1.71506 7.05989L1.45756 7.33717L1.51833 7.72893L1.20006 7.54396L0.881793 7.72893L0.94256 7.33717L0.685059 7.05989L1.0407 7.00299L1.20006 6.64648Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M2.57311 6.64648L2.73247 7.00299L3.08811 7.05989L2.83061 7.33717L2.89138 7.72893L2.57311 7.54396L2.25484 7.72893L2.31561 7.33717L2.05811 7.05989L2.4139 7.00299L2.57311 6.64648Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M3.94664 6.64648L4.10585 7.00299L4.4615 7.05989L4.20415 7.33717L4.26491 7.72893L3.94664 7.54396L3.62837 7.72893L3.68914 7.33717L3.43164 7.05989L3.78728 7.00299L3.94664 6.64648Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M5.31969 6.64648L5.47905 7.00299L5.83469 7.05989L5.57719 7.33717L5.63796 7.72893L5.31969 7.54396L5.00142 7.72893L5.06219 7.33717L4.80469 7.05989L5.16033 7.00299L5.31969 6.64648Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M6.69323 6.64648L6.85244 7.00299L7.20808 7.05989L6.95058 7.33717L7.01134 7.72893L6.69323 7.54396L6.37496 7.72893L6.43572 7.33717L6.17822 7.05989L6.53386 7.00299L6.69323 6.64648Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M8.06627 6.64648L8.22563 7.00299L8.58128 7.05989L8.32377 7.33717L8.38454 7.72893L8.06627 7.54396L7.748 7.72893L7.80877 7.33717L7.55127 7.05989L7.90691 7.00299L8.06627 6.64648Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M9.43966 6.64648L9.59902 7.00299L9.95466 7.05989L9.69716 7.33717L9.75792 7.72893L9.43966 7.54396L9.12154 7.72893L9.18231 7.33717L8.9248 7.05989L9.28045 7.00299L9.43966 6.64648Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M1.20006 9.51929L1.35927 9.87546L1.71506 9.93269L1.45756 10.21L1.51833 10.6014L1.20006 10.4168L0.881793 10.6014L0.94256 10.21L0.685059 9.93269L1.0407 9.87546L1.20006 9.51929Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M2.57311 9.51929L2.73247 9.87546L3.08811 9.93269L2.83061 10.21L2.89138 10.6014L2.57311 10.4168L2.25484 10.6014L2.31561 10.21L2.05811 9.93269L2.4139 9.87546L2.57311 9.51929Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M3.94664 9.51929L4.10585 9.87546L4.4615 9.93269L4.20415 10.21L4.26491 10.6014L3.94664 10.4168L3.62837 10.6014L3.68914 10.21L3.43164 9.93269L3.78728 9.87546L3.94664 9.51929Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M5.31969 9.51929L5.47905 9.87546L5.83469 9.93269L5.57719 10.21L5.63796 10.6014L5.31969 10.4168L5.00142 10.6014L5.06219 10.21L4.80469 9.93269L5.16033 9.87546L5.31969 9.51929Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M6.69323 9.51929L6.85244 9.87546L7.20808 9.93269L6.95058 10.21L7.01134 10.6014L6.69323 10.4168L6.37496 10.6014L6.43572 10.21L6.17822 9.93269L6.53386 9.87546L6.69323 9.51929Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M8.06627 9.51929L8.22563 9.87546L8.58128 9.93269L8.32377 10.21L8.38454 10.6014L8.06627 10.4168L7.748 10.6014L7.80877 10.21L7.55127 9.93269L7.90691 9.87546L8.06627 9.51929Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M9.43966 9.51929L9.59902 9.87546L9.95466 9.93269L9.69716 10.21L9.75792 10.6014L9.43966 10.4168L9.12154 10.6014L9.18231 10.21L8.9248 9.93269L9.28045 9.87546L9.43966 9.51929Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M1.97237 8.08301L2.13173 8.43918L2.48737 8.49641L2.22987 8.7737L2.29064 9.16512L1.97237 8.98048L1.65425 9.16512L1.71502 8.7737L1.45752 8.49641L1.81316 8.43918L1.97237 8.08301Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M3.34557 8.08301L3.50493 8.43918L3.86057 8.49641L3.60307 8.7737L3.66384 9.16512L3.34557 8.98048L3.0273 9.16512L3.08807 8.7737L2.83057 8.49641L3.18621 8.43918L3.34557 8.08301Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M4.71895 8.08301L4.87832 8.43918L5.23396 8.49641L4.97645 8.7737L5.03722 9.16512L4.71895 8.98048L4.40068 9.16512L4.46145 8.7737L4.2041 8.49641L4.55974 8.43918L4.71895 8.08301Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M6.09215 8.08301L6.25136 8.43918L6.60715 8.49641L6.34965 8.7737L6.41042 9.16512L6.09215 8.98048L5.77388 9.16512L5.83465 8.7737L5.57715 8.49641L5.93279 8.43918L6.09215 8.08301Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M7.46569 8.08301L7.62505 8.43918L7.98069 8.49641L7.72319 8.7737L7.78396 9.16512L7.46569 8.98048L7.14742 9.16512L7.20819 8.7737L6.95068 8.49641L7.30648 8.43918L7.46569 8.08301Z"
                        fill="#ECF0F1"
                      />
                      <path
                        d="M8.83873 8.08301L8.99794 8.43918L9.35358 8.49641L9.09624 8.7737L9.157 9.16512L8.83873 8.98048L8.52046 9.16512L8.58123 8.7737L8.32373 8.49641L8.67937 8.43918L8.83873 8.08301Z"
                        fill="#ECF0F1"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_3169_1325">
                        <rect
                          width="19.9122"
                          height="22"
                          fill="white"
                          transform="translate(0.513184)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <input
                  style={errors.phone && { border: "1px solid #D70000" }}
                  type="tel"
                  placeholder="телефон..."
                  className={`register__input register__input--phone ${
                    errors.phone ? "register__input--error" : ""
                  }`}
                  {...register("phone", {
                    required: "Phone is required",
                  })}
                />
              </div>
            </div>
            {errors.phone && (
              <span className="register__error">{errors.phone.message}</span>
            )}

            <div className="register__email-container">
              <span className="register__label">Email:</span>
              <input
                style={errors.email && { border: "1px solid #D70000" }}
                type="email"
                defaultValue={"ahmamagik@gmail.com"}
                placeholder="Введите электронную почту"
                className={`register__input ${
                  errors.email ? "register__input--error" : ""
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <span className="register__error">{errors.email.message}</span>
            )}
          </div>

          <button className="register__submit-button" type="submit">
            зарегистрироваться
          </button>

          <div className="register__agreement">
            <input
              type="checkbox"
              className={
                !checked ? "register__checkbox important" : "register__checkbox"
              }
              checked={checked}
              onChange={() => {
                SetChecked(!checked);
              }}
            />
            <span className="register__agreement-text">
              Я ознакомлен(а), понимаю и принимаю
              <span className="register__link">
                Пользовательское соглашение, Политику конфиденциальности
              </span>
            </span>
          </div>
          <div className="register__divider">
            <span className="register__divider-line"></span>
            <span className="register__divider-text">или</span>
            <span className="register__divider-line"></span>
          </div>
          <div className="register__social-login">
            <button className="register__social-button">
              <svg
                width="55"
                height="56"
                viewBox="0 0 55 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 28C0 12.8122 12.3122 0.5 27.5 0.5C42.6878 0.5 55 12.8122 55 28C55 43.1878 42.6878 55.5 27.5 55.5C12.3122 55.5 0 43.1878 0 28Z"
                  fill="white"
                />
                <path
                  d="M27 21.2533C29.0656 21.2533 30.4589 22.1456 31.2533 22.8911L34.3578 19.86C32.4511 18.0878 29.97 17 27 17C22.6978 17 18.9822 19.4689 17.1733 23.0622L20.73 25.8244C21.6222 23.1722 24.0911 21.2533 27 21.2533Z"
                  fill="#EA4335"
                />
                <path
                  d="M37.56 28.2462C37.56 27.3418 37.4867 26.6818 37.3278 25.9973H27V30.0795H33.0622C32.94 31.094 32.28 32.6218 30.8133 33.6484L34.2844 36.3373C36.3622 34.4184 37.56 31.5951 37.56 28.2462Z"
                  fill="#4285F4"
                />
                <path
                  d="M20.7422 30.1775C20.51 29.4931 20.3756 28.7598 20.3756 28.002C20.3756 27.2442 20.51 26.5109 20.73 25.8264L17.1733 23.0642C16.4278 24.5553 16 26.2298 16 28.002C16 29.7742 16.4278 31.4487 17.1733 32.9398L20.7422 30.1775Z"
                  fill="#FBBC05"
                />
                <path
                  d="M27 38.999C29.97 38.999 32.4633 38.0212 34.2844 36.3346L30.8133 33.6457C29.8844 34.2934 28.6378 34.7457 27 34.7457C24.0911 34.7457 21.6222 32.8268 20.7422 30.1746L17.1855 32.9368C18.9944 36.5301 22.6978 38.999 27 38.999Z"
                  fill="#34A853"
                />
              </svg>
            </button>
            <button className="register__social-button">
              <svg
                width="55"
                height="55"
                viewBox="0 0 55 55"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 27.5C0 12.3122 12.3122 0 27.5 0C42.6878 0 55 12.3122 55 27.5C55 42.6878 42.6878 55 27.5 55C12.3122 55 0 42.6878 0 27.5Z"
                  fill="#4680C2"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M23.2664 15.95H30.634C37.3581 15.95 38.9502 17.542 38.9502 24.2661V31.6338C38.9502 38.3579 37.3581 39.95 30.634 39.95H23.2664C16.5423 39.95 14.9502 38.3579 14.9502 31.6338V24.2661C14.9502 17.542 16.5423 15.95 23.2664 15.95Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M34.597 24.2154C34.7156 23.8427 34.597 23.5717 34.072 23.5717H32.3275C31.8871 23.5717 31.6839 23.8089 31.5653 24.0629C31.5653 24.0629 30.6676 26.2309 29.4143 27.6367C29.0078 28.0432 28.8215 28.1787 28.6013 28.1787C28.4827 28.1787 28.3303 28.0432 28.3303 27.6705V24.1984C28.3303 23.7581 28.1948 23.5548 27.8222 23.5548H25.0783C24.8074 23.5548 24.638 23.7581 24.638 23.9613C24.638 24.3847 25.2647 24.4864 25.3324 25.672V28.2464C25.3324 28.8053 25.2308 28.907 25.0106 28.907C24.4178 28.907 22.9781 26.7221 22.1143 24.2323C21.945 23.7411 21.7756 23.5548 21.3352 23.5548H19.5738C19.0656 23.5548 18.981 23.7919 18.981 24.046C18.981 24.5033 19.5738 26.8067 21.7417 29.8554C23.1814 31.9387 25.2308 33.0566 27.0769 33.0566C28.1948 33.0566 28.3303 32.8025 28.3303 32.3791V30.8039C28.3303 30.2958 28.4319 30.2111 28.7876 30.2111C29.0416 30.2111 29.499 30.3466 30.5321 31.3459C31.7177 32.5315 31.921 33.0735 32.5815 33.0735H34.3261C34.8342 33.0735 35.0713 32.8195 34.9358 32.3283C34.7834 31.8371 34.2075 31.1257 33.4623 30.2789C33.0558 29.8046 32.446 29.2796 32.2597 29.0255C32.0057 28.6868 32.0734 28.5513 32.2597 28.2464C32.2428 28.2464 34.3769 25.2316 34.597 24.2154Z"
                  fill="#4680C2"
                />
              </svg>
            </button>
          </div>
          <div className="register__login-link">
            У вас есть аккаунт?
            <Link to="/login" className="register__login-button">
              Войти
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
