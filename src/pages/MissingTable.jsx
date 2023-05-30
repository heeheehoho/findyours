import React, { useState, useEffect } from 'react';

const MissingTable = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // JSON 데이터 가져오기
    fetch("/missingPersons.json")
      .then(response => response.json())
      .then(jsonData => {
        const slicedData = Object.values(jsonData).slice(0, 30);
        setData(slicedData);
      })
      .catch(error => {
        console.log("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>현재나이 </th>
            <th>사진</th>
            <th>실종일</th>
            <th>실종장소</th>
            <th>특이사항</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map(item => (
              <tr key={item.ms_ps_id}>
                <td className='item_name'>{item.name}</td>
                <td>({item.age_now}세)</td>
                <td>
                  <img src={`/MImages/${item.ms_ps_id}.jpeg`} alt={item.Name} />
                </td>
                <td className='item_occur_date'>{item.occur_date}</td>
                <td className='item_occur_adres'>{item.occur_adres}</td>
                <td>키 : {item.height}cm, 몸무게 : {item.weight}kg
                <br />
                특이사항 : {item.etc_data}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default MissingTable;
