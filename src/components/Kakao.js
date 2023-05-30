import { useEffect, useState } from "react";
const { kakao } = window;

function Kakao({ target }) {
  //   useEffect(() => {
  //     var container = document.getElementById("map");
  //     var options = {
  //       center: new kakao.maps.LatLng(33.450701, 126.570667),
  //       level: 3,
  //     };

  //     const map = new kakao.maps.Map(container, options);

  //     var markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);

  //     var marker = new kakao.maps.Marker({
  //       position: markerPosition,
  //     });

  //     marker.setMap(map);

  //     kakao.maps.event.addListener(map, "click", function (mouseEvent) {
  //       var latlng = mouseEvent.latLng;
  //       marker.setPosition(latlng);
  //       var message = "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
  //       message += "경도는 " + latlng.getLng() + " 입니다";
  //       var resultDiv = document.getElementById("clickLatlng");
  //       resultDiv.innerHTML = message;
  //     });
  //   }, []);

  var [functions, setFunctions] = useState({
    setMapType: function () {},
    zoomIn: function () {
      console.log("zoom");
    },
    zoomOut: function () {},
  });

  useEffect(() => {
    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById("centerAddr");

        for (var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === "H") {
            infoDiv.innerHTML = result[i].address_name;
            break;
          }
        }
      }
    }

    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(target.lat, target.lng), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    var geocoder = new kakao.maps.services.Geocoder();

    var markerPosition = new kakao.maps.LatLng(target.lat, target.lng);
    var marker = new kakao.maps.Marker({ position: markerPosition }), // 클릭한 위치를 표시할 마커입니다
      infowindow = new kakao.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

    marker.setMap(map);
    searchDetailAddrFromCoords(markerPosition, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var detailAddr = !!result[0].road_address
          ? "<div>도로명주소 : " +
            result[0].road_address.address_name +
            "</div>"
          : "";
        detailAddr +=
          "<div>지번 주소 : " + result[0].address.address_name + "</div>";

        var content =
          '<div class="bAddr">' +
          '<span class="title">법정동 주소정보</span>' +
          detailAddr +
          "</div>";

        // 마커를 클릭한 위치에 표시합니다
        marker.setPosition(markerPosition);
        marker.setMap(map);

        // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
        infowindow.setContent(content);
        infowindow.open(map, marker);
      }
    });

    // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var detailAddr = !!result[0].road_address
            ? "<div>도로명주소 : " +
              result[0].road_address.address_name +
              "</div>"
            : "";
          detailAddr +=
            "<div>지번 주소 : " + result[0].address.address_name + "</div>";

          var content =
            '<div class="bAddr">' +
            '<span class="title">법정동 주소정보</span>' +
            detailAddr +
            "</div>";

          // 마커를 클릭한 위치에 표시합니다
          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      });
    });

    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, "idle", function () {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    var resultDiv = document.getElementById("clickLatlng");
    resultDiv.innerHTML =
      "<클릭한 위치의 위도는 " +
      target.lat +
      " 이고, " +
      "경도는 " +
      target.lng +
      " 입니다>";
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      var latlng = mouseEvent.latLng;
      marker.setPosition(latlng);
      var message = "<클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
      message += "경도는 " + latlng.getLng() + " 입니다>";
      var resultDiv = document.getElementById("clickLatlng");
      resultDiv.innerHTML = message;
    });

    // 지도타입 컨트롤의 지도 또는 스카이뷰 버튼을 클릭하면 호출되어 지도타입을 바꾸는 함수입니다
    var tempFunc = {};
    tempFunc.setMapType = function setMapType(maptype) {
      var roadmapControl = document.getElementById("btnRoadmap");
      var skyviewControl = document.getElementById("btnSkyview");
      if (maptype === "roadmap") {
        map.setMapTypeId(kakao.maps.MapTypeId.ROADMAP);
        roadmapControl.className = "selected_btn";
        skyviewControl.className = "btn";
      } else {
        map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
        skyviewControl.className = "selected_btn";
        roadmapControl.className = "btn";
      }
    };

    // // 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
    tempFunc.zoomIn = function zoomIn() {
      map.setLevel(map.getLevel() - 1);
      console.log("zoomIn");
    };

    // // 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다

    tempFunc.zoomOut = function zoomOut() {
      map.setLevel(map.getLevel() + 1);
    };

    setFunctions(tempFunc);
  }, [target]);

  return (
    <div className="map_caption">
      <div className="map_wrap">
        <div
          id="map"
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        ></div>
        <div className="hAddr">
          <span className="title">지도중심기준 행정동 주소정보</span>
          <span id="centerAddr"></span>
        </div>
        <div className="custom_typecontrol radius_border">
          <span
            id="btnRoadmap"
            className="selected_btn"
            onClick={() => functions.setMapType("roadmap")}
          >
            지도
          </span>
          <span
            id="btnSkyview"
            className="btn"
            onClick={() => functions.setMapType("skyview")}
          >
            스카이뷰
          </span>
        </div>

        <div className="custom_zoomcontrol radius_border">
          <span
            onClick={() => {
              functions.zoomIn();
            }}
          >
            <img
              src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
              alt="확대"
            />
          </span>
          <span onClick={() => functions.zoomOut()}>
            <img
              src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
              alt="축소"
            />
          </span>
        </div>
      </div>
      <div id="clickLatlng"></div>
    </div>
  );
}
export default Kakao;
