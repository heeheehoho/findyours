import React, { useState } from "react";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
});

const DiaryList = ({ diaryList, changeMapLoc }) => {
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("");

  const getProccessedDiaryList = () => {
    const filterCallBack = (item) => {
      var searchInput = document.getElementById("searchInput");
      console.log(item.content);
      console.log(searchInput.value);
      if (item.content.includes(searchInput.value)) return true;
      else return false;
    };

    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    const copyList = JSON.parse(JSON.stringify(diaryList));

    const filteredList =
      filter === "" ? copyList : copyList.filter((it) => filterCallBack(it));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <MyButton text="이름 검색 : " type="negative"></MyButton>
        </div>
        <input
          id="searchInput"
          type="text"
          name="name"
          size="10"
          placeholder="<검색어를 입력해주세요>"
        />
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"검색"}
            onClick={(e) => {
              var searchInput = document.getElementById("searchInput");
              setFilter(searchInput.value);
            }}
          />
        </div>
      </div>

      {getProccessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} changeMapLoc={changeMapLoc} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};
export default DiaryList;
