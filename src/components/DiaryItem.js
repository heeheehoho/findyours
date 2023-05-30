import React from "react";
import MyButton from "./MyButton";

const DiaryItem = ({ id, imageName, content, date, latLng, changeMapLoc }) => {
  const strDate = new Date(parseInt(date)).toLocaleDateString();

  return (
    <div className="DiaryItem">
      <div
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${imageName}`,
        ].join(" ")}
      >
        <img src={process.env.PUBLIC_URL + `assets/image/${imageName}.jpg`} />
      </div>
      <div className="info_wrapper">
        <div className="diary_date">실종자 발견 시간 : {strDate}</div>
        <div className="diary_content_preview">실종자 추정인 : {content}</div>
      </div>
      <div className="btn_wrapper">
        {/* <MyButton text={"사진 확대"} /> */}
        <MyButton
          className=""
          text={"지도 표시"}
          onClick={() => {
            console.log("is clicked!");
            changeMapLoc(latLng);
          }}
        />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
