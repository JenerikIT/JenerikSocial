import imgPost from "../../../assets/img/berserkPost.svg";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetOnePostQuery,
  useUpdatePostMutation,
  useUploadImgMutation,
} from "../../../api/posts/postsApi";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./FullPost.scss";
import axios from "axios";
interface PostEditProps {
  title: string;
  text: string;
  tagsInput?: string;
  imageUrl: string;
  tags: string[];
}

const PostEdit = () => {
  const { id } = useParams<{ id: string }>();
  const [uploadImg] = useUploadImgMutation();
  const { data: post, isLoading, isError } = useGetOnePostQuery(id || "");
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
  const imgRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PostEditProps>({
    title: "",
    text: "",
    tagsInput: "",
    imageUrl: "",
    tags: [],
  });
  const addTags = () => {
    if (!formData.tagsInput?.trim()) return;
    const newTags = formData.tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    setFormData((prev) => ({
      ...prev,
      tags: [...new Set([...prev.tags, ...newTags])],
      tagsInput: "",
    }));
  };
  const removeTags = (i: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, index) => index !== i),
    }));
  };
  const handleChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const formDataFile = new FormData();
    const file = e.target.files[0];
    formDataFile.append("image", file);
    const { data } = await uploadImg(formDataFile);
    setFormData((prev) => ({
      ...prev,
      imageUrl: `http://localhost:4444${data.url}`,
    }));
  };
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        text: post.text,
        tags: post.tags || [],
        imageUrl: post.imageUrl || "",
      });
    }
  }, [post]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      await updatePost({ id, data: formData }).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );
  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка загрузки</div>;
  if (!post) return <div>Пост не найден</div>;

  const createdAt = post.createdAt.slice(0, 10);
  return (
    <div className="post">
      <div className="top">
        <div className="post__logo">
          <img src={imgPost} alt="" width={50} height={50} />
          <div className="post__info">
            <div className="name">Ahma</div>
            <p>{createdAt}</p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="image edit-mode">
          {!formData.imageUrl ? (
            <div
              className="upload-button"
              onClick={() => {
                if (imgRef.current) {
                  imgRef.current.click();
                }
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 17V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 12L12 8M12 8L16 12M12 8V16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Загрузить изображение
            </div>
          ) : (
            <div className="image-edit-overlay">
              <span
                className="edit-image-btn"
                onClick={() => {
                  if (imgRef.current) {
                    imgRef.current.click();
                  }
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M14.1666 2.49996C14.3855 2.28109 14.6453 2.10746 14.9313 1.98899C15.2173 1.87052 15.5238 1.80957 15.8333 1.80957C16.1428 1.80957 16.4493 1.87052 16.7353 1.98899C17.0213 2.10746 17.2811 2.28109 17.5 2.49996C17.7188 2.71883 17.8925 2.97869 18.0109 3.26467C18.1294 3.55064 18.1904 3.85716 18.1904 4.16663C18.1904 4.4761 18.1294 4.78262 18.0109 5.06859C17.8925 5.35457 17.7188 5.61443 17.5 5.83329L6.24996 17.0833L1.66663 18.3333L2.91663 13.75L14.1666 2.49996Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span>Изменить фото</span>
              </span>
            </div>
          )}
          {formData.imageUrl && <img src={formData.imageUrl} alt="" />}
          <input
            type="file"
            onChange={handleChangeImg}
            ref={imgRef}
            hidden
            accept="image/*"
          />
        </div>
        <div className="title">
          <label htmlFor="text" className="label">
            Заголовок статьи
          </label>
          <input
            defaultValue={formData.text}
            name="title"
            className="input-title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Например: Происшествие"
            required
          />
        </div>
        <div className="description">
          <label htmlFor="text" className="label">
            Текст статьи
          </label>
          <textarea
            defaultValue={formData.text}
            className="edit-mode"
            name="text"
            value={formData.text}
            onChange={handleChange}
            required
          />
        </div>
        <div className="tags-block">
          <label htmlFor="tag" className="label-tags label">
            Теги
            <span> (через запятую)</span>
          </label>
          <div className="container-tags">
            {formData.tags?.map((tag, i) => (
              <div key={i} className="tag">
                {tag}
                <button
                  type="button"
                  className="tag-remove"
                  onClick={() => {
                    removeTags(i);
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <input
            type="text"
            name="tagsInput"
            placeholder="Например: IT,easy,..."
            className="tagInput"
            value={formData.tagsInput}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                addTags();
              }
            }}
            onBlur={addTags}
          />
        </div>

        <div className="post__footer">
          <div className="edit-controls">
            <span className="cancel-btn" onClick={() => navigate("/")}>
              Отмена
            </span>
            <button className="save-btn" type="submit">
              {!isUpdating ? (
                <div>Сохранить изменения</div>
              ) : (
                <div>Загрузка...</div>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostEdit;
