import HashTag from "./HashTag";

type Props = {
  modalPost: boolean;
  imgPost?: string;
  onClickModal: (i: boolean) => void;
  tags: string[];
  text: string;
  _id: string;
};

function Modal({ modalPost, onClickModal, text, imgPost, tags }: Props) {
  return (
    <div
      className={`modal-Post-container ${modalPost ? "active" : ""}`}
      onClick={() => onClickModal(false)}
    >
      <div className={`modal-Post ${modalPost ? "active" : ""}`}>
        {imgPost ? (
          <img src={imgPost} alt="" className="modal-Post__image" />
        ) : (
          ""
        )}

        <div className="modal-Post__description">{text}</div>
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
