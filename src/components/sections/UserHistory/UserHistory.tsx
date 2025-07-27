import { FC, useState } from "react";
import HistoryModalSwiper from "../../modals/History/HistoryModalSwiper";
import "./UserHistory.scss";

interface UserHistoryProp {
  type: string;
}

const UserHistory: FC<UserHistoryProp> = ({ type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const OpenHistoryHandler = () => {
    setIsModalOpen(true);
  };

  const CloseHistoryHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={`user-history ${type == "circle" ? "circle" : ""}`}>
        <ul>
          <li onClick={OpenHistoryHandler}>
            <div
              className="history"
              style={{
                backgroundImage:
                  "url(https://wallpapers.com/images/hd/1440p-nature-background-n1kwq7ikw7uu0jgx.jpg)",
              }}
            >
              <div className="user">
                <div
                  style={{
                    backgroundImage:
                      "url(https://avatars.mds.yandex.net/i?id=34e94bf3ff3a006652355703cbb5c32b_l-9044040-images-thumbs&n=13)",
                  }}
                ></div>
                <span>Wookee</span>
              </div>
            </div>
          </li>
          <li onClick={OpenHistoryHandler}>
            <div className="history">
              <div className="user">
                <div></div>
                <span>Jeneric</span>
              </div>
            </div>
          </li>
          <li onClick={OpenHistoryHandler}>
            <div
              className="history"
              style={{
                backgroundImage:
                  "url(https://avatars.mds.yandex.net/i?id=5c980bf91eff54c17edac51cb9b213d8_l-5210240-images-thumbs&ref=rim&n=13&w=640&h=640)",
              }}
            >
              <div className="user">
                <div
                  style={{
                    backgroundImage:
                      "url(https://avatars.mds.yandex.net/i?id=8db83d29d61256cf52229af9c31845fc_l-5388140-images-thumbs&n=13)",
                  }}
                ></div>
                <span>Maja</span>
              </div>
            </div>
          </li>
          <li className="add">
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0001 4.7998L12 19.1998M19.2 11.9998L4.80005 11.9998"
                  stroke="#ffffff"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </li>
        </ul>
      </div>
      <HistoryModalSwiper
        isModalOpen={isModalOpen}
        CloseHistoryHandler={CloseHistoryHandler}
      />
    </>
  );
};

export default UserHistory;
