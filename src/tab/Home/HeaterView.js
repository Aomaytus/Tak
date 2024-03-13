import React, { useState, useEffect } from "react";
import { Progress, Image } from "antd";
import { db } from "../../firebase";
import { onValue, ref } from "firebase/database";

const HeaterView = () => {
  const [Heater_State, setHeater_State] = useState();
  const [HeaterPercentage, setHeaterPercentage] = useState();

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      const heaterPercentage = data?.Fram?.HeaterPercentage ?? -1;
      const stateHeater = data?.Fram?.State_Heaterch1 ?? 0;

      setHeaterPercentage(heaterPercentage);
      setHeater_State(stateHeater > 0 ? "เปิด" : "ปิด");
    });
  }, []);

  return (
    <div className="Icon_item">
      <Image
        width={40}
        preview={false}
        src="https://cdn-icons-png.flaticon.com/512/6504/6504211.png"
      />
      <Progress percent={HeaterPercentage} size="small" status="active" />
      <div>{Heater_State}</div>
    </div>
  );
};

export default HeaterView;
