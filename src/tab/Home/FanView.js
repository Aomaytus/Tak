import React, { useState, useEffect } from "react";
import { Progress, Image } from "antd";
import { db } from "../../firebase";
import { onValue, ref } from "firebase/database";

const FanView = () => {
  const [State_Fan, setState_Fan] = useState();
  const [FanPercentage, setFanPercentage] = useState();

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      const fanPercentage = data?.Fram?.FanPercentage ?? -1;
      const fanStatus = data?.Fram?.State_Fanch1 ?? 0;

      setFanPercentage(fanPercentage);
      setState_Fan(fanStatus > 0 ? "เปิด" : "ปิด");
    });
  }, []);

  return (
    <div className="Icon_item">
      <Image
        width={40}
        preview={false}
        src="https://cdn-icons-png.flaticon.com/512/3653/3653189.png"
      />
      <Progress percent={FanPercentage} size="small" status="active" />
      <div>{State_Fan}</div>
    </div>
  );
};

export default FanView;
