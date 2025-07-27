import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetOnePostQuery,
  useUpdatePostMutation,
} from "../../../api/posts/postsApi";
import imgPost from "../../../assets/img/imgPost.svg";
import "./FullPost.scss";

const FullPostEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: post, isLoading, isError } = useGetOnePostQuery(id || "");
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  interface PostFormData {
    title: string;
    text: string;
    tags: string[];
    imageUrl: string;
    viewsCount: number;
  }

  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    text: "",
    tags: [],
    imageUrl: "",
    viewsCount: 0,
  });
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        text: post.text,
        tags: post.tags || [],
        imageUrl: post.imageUrl || "",
        viewsCount: post.viewsCount || 0,
      });
    }
  }, [post]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setFormData((prev) => ({ ...prev, tags }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      await updatePost({ id, data: formData }).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  if (isLoading) return <div className="loading-spinner">Loading...</div>;
  if (isError || !post)
    return <div className="error-message">Post not found</div>;

  return (
    <div className="post-edit-container">
      <div className="edit-header">
        <h1>Редактировать публикацию</h1>
        <button className="close-button" onClick={() => navigate("/")}>
          &times;
        </button>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-section">
          <label className="form-label">Заголовок</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            placeholder="Введите заголовок"
            required
          />
        </div>
        <div className="form-section">
          <label className="form-label">Содержание</label>
          <textarea
            name="text"
            value={formData.text}
            onChange={handleChange}
            className="form-textarea"
            rows={8}
            placeholder="Напишите ваш текст здесь..."
            required
          />
        </div>
        <div className="form-section">
          <label className="form-label">Теги (через запятую)</label>
          <input
            type="text"
            value={formData.tags.join(", ")}
            onChange={handleTagsChange}
            className="form-input"
            placeholder="пример: react, javascript, web"
          />
        </div>
        <div className="form-section">
          <label className="form-label">Изображение (URL)</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="form-input"
            placeholder="https://example.com/image.jpg"
          />
          {formData.imageUrl && (
            <div className="image-preview-container">
              <img
                src={formData.imageUrl}
                alt="Предпросмотр"
                className="image-preview"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          )}
          <img src={imgPost} alt="imgPost" className="img" />
        </div>
        <div className="form-actions">
          <button type="submit" className="save-button" disabled={isUpdating}>
            {isUpdating ? (
              <span className="button-loading">Сохранение...</span>
            ) : (
              "Сохранить изменения"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FullPostEdit;
