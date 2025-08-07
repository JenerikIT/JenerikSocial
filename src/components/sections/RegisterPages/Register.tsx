import axios from "axios";
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useRegisterPostMutation
} from "../../../api/auth/authApi";
import { AmericanFlag } from '../../../assets/icons/AmericanFlag';
import { GoogleIcon } from '../../../assets/icons/GoogleIcon';
import { UserIcon } from '../../../assets/icons/UserIcon';
import { VkIcon } from '../../../assets/icons/VkIcon';
import { InputUi } from '../../../shared/ui/InputUi/InputUi';
import { LoaderUi } from '../../../shared/ui/LoaderUi/LoaderUi';
import { authActions } from '../../../stores/auth/auth-actions/auth-actions';
import { authInteractions } from '../../../stores/auth/auth-interactions/auth-interactions';
import "./register.scss";

type FormData = {
  fullName: string;
  password: string;
  phone: string;
  email: string;
  checkbox: string;
};
export const Register = observer(() => {
  const { registerAction, registerSai: { status } } = authActions;
  const {
    registerForm: {
      disabled,
      errors,
      values,
      setValue
    }
  } = authInteractions;
  const navigate = useNavigate();

  const [checked, SetChecked] = useState(false);
  const [trueReg, SetTrueReg] = useState<boolean>(false);
  const [fullName, SetFullNameValue] = useState("");
  const [registerPost, { isLoading }] = useRegisterPostMutation();
  const [avatarUrl, SetAvatarUser] = useState("");
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

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__header">
          <h1 className="register__title">Регистрация</h1>
        </div>
        <div
          className="register__form"
        >
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
                  <UserIcon />
                )}

                <div className="overlay-img">
                  <span>Добавить фото</span>
                </div>
              </div>
            </div>
            <div className="register__input-container">
              <InputUi
                values={values}
                errors={errors}
                name='fullName'
                setValue={setValue}
                ref={inputRef}
                type="text"
                placeholder="Имя"
                className="register__input"
              />
            </div>

            <InputUi
              label="Пароль:"
              values={values}
              errors={errors}
              name='password'
              setValue={setValue}
              style={errors.password ? { border: "1px solid #D70000" } : {}}
              type="password"
              placeholder="Пароль"
              className={`register__input ${errors.password ? "register__input--error" : ""}`}
            />

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
                  <AmericanFlag />
                </div>
                {/* <input
                  style={errors.phone && { border: "1px solid #D70000" }}
                  type="tel"
                  placeholder="телефон..."
                  className={`register__input register__input--phone ${errors.phone ? "register__input--error" : ""
                    }`}
                  {...register("phone", {
                    required: "Phone is required",
                  })}
                /> */}
              </div>
            </div>
            {/* {errors.phone && (
              <span className="register__error">{errors.phone.message}</span>
            )} */}

            <div className="register__email-container">
              <InputUi
                label="Email"
                type="email"
                values={values}
                errors={errors}
                setValue={setValue}
                name='email'
                placeholder="Введите электронную почту"
                className={`register__input ${errors.email ? "register__input--error" : ""}`}
              />
            </div>
          </div>

          <button
            className="register__submit-button"
            type="submit"
            disabled={disabled}
            onClick={registerAction}
          >
            {status === "pending" ? (
              <LoaderUi />
            ) : "Зарегистрироваться"}
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
              <GoogleIcon />
            </button>
            <button className="register__social-button">
              <VkIcon />
            </button>
          </div>

          <div className="register__login-link">
            У вас есть аккаунт?
            <Link to="/login" className="register__login-button">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});
