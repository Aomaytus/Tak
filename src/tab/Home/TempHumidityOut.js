import React, { useState, useEffect } from "react";
import { Progress } from "antd";
import { db } from "../../firebase";
import { onValue, ref } from "firebase/database";

const TempHumidityOut = () => {
  const [outTemp, setOutTemp] = useState(0);
  const [outHum, setOutHum] = useState(0);

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      let temp = data?.Fram?.OutTemp ?? 0;
      let hum = data?.Fram?.OutHum ?? 0;

      if (temp <= 0 || temp >= 80) temp = 0;
      if (hum <= 0 || hum >= 101) hum = 0;

      setOutTemp(temp);
      setOutHum(hum);
    });
  }, []);

  return (
    <div className="dry-body">
      <div className="BT_View_ON_OFF">สภาพแวดล้อมภายนอกโรงเรือน</div>
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "flex", marginBottom: "-10px" }}>
          <div style={{ width: "100%" }}>
            <Progress
              type="circle"
              percent={outTemp}
              width={50}
              strokeColor={{ "100%": "#ff4415d3" }}
              format={(percent) => `${percent} C`}
            />
            <div style={{ marginTop: "2px", marginBottom: "2px" }}>อุณหภูมิ</div>
          </div>
          <div style={{ width: "100%" }}>
            <Progress
              type="circle"
              percent={outHum}
              width={50}
              format={(percent) => `${percent} %`}
            />
            <div style={{ marginTop: "2px", marginBottom: "10px" }}>ความชื้น</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempHumidityOut;
