import { useState, useRef } from "react";
import {
  useCreatePostMutation,
  useUploadImgMutation,
} from "../../../api/posts/postsApi";
import EmojiPickerComponent from "../../../UI/EmodjiPicker";
import "./CreatePost.scss";
import { useNavigate } from "react-router-dom";

interface PostCreateProps {
  title: string;
  text: string;
  tagInput: string;
  tags: string[];
  emoji: string;
}
type Props = {
  close: boolean;
};

const CreatePost = ({ close }: Props) => {
  const navigate = useNavigate();
  const [uploadImg] = useUploadImgMutation();
  const [openEmoji, setOpenEmoji] = useState(false);
  const [imagePost, setImagePost] = useState("");
  const [formData, setFormData] = useState<PostCreateProps>({
    title: "",
    text: "",
    tagInput: "",
    tags: [],
    emoji: "",
  });
  const formRefs = useRef({
    title: null as HTMLInputElement | null,
    text: null as HTMLTextAreaElement | null,
    tags: null as HTMLInputElement | null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [createPost, { isLoading }] = useCreatePostMutation();

  const addTags = () => {
    if (!formData.tagInput.trim()) return;

    const newTags = formData.tagInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    setFormData((prev) => ({
      ...prev,
      tags: [...new Set([...prev.tags, ...newTags])],
      tagInput: "",
    }));
  };
  const handleKeyDown = (
    e: React.KeyboardEvent,
    fieldName: keyof typeof formRefs.current
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();

      switch (fieldName) {
        case "title":
          formRefs.current.text?.focus();
          break;
        case "text":
          formRefs.current.tags?.focus();
          break;
        case "tags":
          addTags(); // Обработка тегов
          break;
      }
    }
  };

  const removeTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) return;

    try {
      const formImgData = new FormData();
      const file = event.target.files[0];
      formImgData.append("image", file);
      const { data } = await uploadImg(formImgData);
      setImagePost(`http://localhost:4444${data.url}`);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Не удалось загрузить изображение");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const removeImage = () => {
    setImagePost("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const createPostApi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.text.trim()) {
      alert("Текст статьи не может быть пустым");
      return;
    }

    try {
      const postData = {
        title: formData.title,
        text: formData.text,
        tags: formData.tags,
        imageUrl: imagePost,
      };

      await createPost(postData).unwrap();
      navigate("/");
      // Сброс формы после успешного создания
      setFormData({
        title: "",
        text: "",
        tagInput: "",
        tags: [],
        emoji: "",
      });
      setImagePost("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      console.error("Ошибка при создании поста:", err);
      alert("Не удалось создать пост");
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setFormData((prev) => ({
      ...prev,
      text: prev.text + emoji,
    }));
    setOpenEmoji(false);
  };

  return (
    <div className="createPost">
      <form className="form" onSubmit={createPostApi}>
        <h1 className="form-title">
          Создайте свой пост и поделитесь эмоциями!
        </h1>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Заголовок статьи
              <span className="optional"> (необязательно)</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-input"
              placeholder="Введите заголовок статьи..."
              value={formData.title}
              onChange={handleChange}
              ref={(el) => (formRefs.current.title = el)}
              onKeyDown={(e) => handleKeyDown(e, "title")}
            />
          </div>

          <div className="form-group">
            <label htmlFor="content" className="form-label">
              Текст статьи
            </label>
            <div className="textarea-wrapper">
              <textarea
                id="content"
                ref={(el) => (formRefs.current.text = el)}
                name="text"
                className="form-textarea"
                placeholder="Расскажите что-нибудь интересное..."
                rows={5}
                value={formData.text}
                onChange={handleChange}
                required
                onKeyDown={(e) => handleKeyDown(e, "text")}
              />
              <button
                type="button"
                className="emoji-trigger"
                onClick={() => setOpenEmoji(!openEmoji)}
                aria-label="Добавить эмодзи"
              >
                😊
              </button>
              {openEmoji && (
                <div className="emoji-picker-wrapper">
                  <EmojiPickerComponent
                    openEmodji={openEmoji}
                    onEmojiClick={handleEmojiSelect}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tags" className="form-label">
              Теги
              <span className="optional"> (через запятую)</span>
            </label>
            <div className="tags-container">
              {formData.tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                  <button
                    type="button"
                    className="tag-remove"
                    onClick={() => removeTag(index)}
                    aria-label={`Удалить тег ${tag}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              id="tags"
              name="tagInput"
              className="form-input"
              placeholder="Например: путешествия, кулинария, IT..."
              value={formData.tagInput}
              ref={(el) => (formRefs.current.tags = el)}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, "tags")}
              onBlur={addTags}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Медиафайлы</label>
            <div className="media-upload">
              <input
                type="file"
                id="media-upload"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="media-input"
                accept="image/*"
              />
              <label htmlFor="media-upload" className="upload-button">
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
              </label>
            </div>
            {imagePost && (
              <div className="image-preview">
                <img src={imagePost} alt="Превью загруженного изображения" />
                <span>Удалить</span>
                <button
                  type="button"
                  className="remove-image"
                  onClick={removeImage}
                  aria-label="Удалить изображение"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          {close && (
            <button
              className="cancel-btn"
              onClick={() => {
                navigate("/");
              }}
            >
              Отмена
            </button>
          )}

          <button
            type="submit"
            className="submit-button"
            disabled={isLoading || !formData.text.trim()}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              <>
                Опубликовать
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
