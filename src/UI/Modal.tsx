import HashTag from "./HashTag";

type Props = {
  modalPost: boolean;
  imgPost?: string;
  content: string;
  onClickModal: (i: boolean) => void;
  tags: string[];
};

function Modal({ modalPost, onClickModal, content, imgPost, tags }: Props) {
  return (
    <div
      className={`modal-Post-container ${modalPost ? "active" : ""}`}
      onClick={() => onClickModal(false)}
    >
      <div className={`modal-Post ${modalPost ? "active" : ""}`}>
        <img src={imgPost} alt="" className="modal-Post__image" />

        <div className="modal-Post__description">{content}</div>
        <div className="tags">
          {tags.map((name) => (
            <HashTag title={name} key={name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Modal;
