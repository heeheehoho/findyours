import "./App.css";
import Kakao from "./components/Kakao";
import DiaryList from "./components/DiaryList";
import { useState } from "react";

var data = [
  {
    id: 0,
    date: new Date().getTime(),
    content: "정희호",
    imageName: "heho",
    latLng: { lat: 35.24583143713699, lng: 128.86862757470834 },
  },
  {
    id: 1,
    date: new Date(null).getTime(),
    content: "김민성",
    imageName: "minsung",
    latLng: { lat: 33.450701, lng: 126.570667 },
  },
  {
    id: 2,
    date: new Date("2011-11-11").getTime(),
    content: "한요한",
    imageName: "yohan",
    latLng: { lat: 34.450701, lng: 126.570667 },
  },
  {
    id: 3,
    date: new Date("2030-4-4").getTime(),
    content: "박지원",
    imageName: "park",
    latLng: { lat: 36.450701, lng: 126.570667 },
  },
];
function App() {
  var [mapLoc, setMapLoc] = useState({ lat: 37.5506391, lng: 127.07384086 });
  console.log(mapLoc);
  return (
    <div>
      <Kakao target={mapLoc} />
      <DiaryList diaryList={data} changeMapLoc={setMapLoc} />
    </div>
  );
}

export default App;
