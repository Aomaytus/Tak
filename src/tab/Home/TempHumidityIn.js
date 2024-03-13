import React, { useState, useEffect } from "react";
import { Progress } from "antd";
import { db } from "../../firebase";
import { onValue, ref } from "firebase/database";

const InternalEnvironmentView = () => {
  const [InTemp, setInTemp] = useState(0);
  const [InHum, setInHum] = useState(0);

  useEffect(() => {
    const getDetail = () => {
      onValue(ref(db), (snapshot) => {
        const data = snapshot.val();
        let temp = data?.Fram?.InTemp ?? 0;
        let hum = data?.Fram?.InHum ?? 0;

        if (temp >= 80 || temp <= 15) temp = 0;
        if (hum <= 0 || hum >= 120) hum = 0;

        setInTemp(temp);
        setInHum(hum);
      });
    };

    getDetail();
  }, []);

  return (
    <div className="dry-body">
      <div className="BT_View_ON_OFF">สภาพแวดล้อมภายในโรงเรือน</div>
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "flex", marginBottom: "-10px" }}>
          <div style={{ width: "100%" }}>
            <Progress
              type="circle"
              percent={InTemp}
              width={50}
              strokeColor={{
                "100%": "#ff4415d3",
              }}
              format={(percent) => `${percent} C`}
            />
            <div style={{ marginTop: "2px", marginBottom: "2px" }}>
              อุณหภูมิ
            </div>
          </div>
          <div style={{ width: "100%" }}>
            <Progress
              type="circle"
              percent={InHum}
              width={50}
              format={(percent) => `${percent} %`}
            />
            <div style={{ marginTop: "2px", marginBottom: "10px" }}>
              ความชื้น
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternalEnvironmentView;
