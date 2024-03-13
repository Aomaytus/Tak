import React, { useState, useEffect } from "react";
import { Image } from "antd";
import { db } from "../../firebase";
import { onValue, ref } from "firebase/database";

const Weighing2 = () => {
  const [todos, setTodos] = useState([]);
  const [weighingState, setWeighingState] = useState("");
  const [weighingType, setWeighingType] = useState("");
  const [weighingBefore, setWeighingBefore] = useState(0);
  const [weighingBehind, setWeighingBehind] = useState(0);
  const [weighingPercent, setWeighingPercent] = useState(0);

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      const stateWeighing2 = data.Fram.State_Io_Weigh2;
      const scale2 = data.Fram.scale2;
      const weighing2Before = data.Fram.Weighing2BeforeSet;
      const weighing2Behind = data.Fram.Weighing2Behind;
      const weighing2Percent = data.Fram.Weighing2Percent;
      const weighing2Type = data.Fram.Weighing2Type;

      if (scale2 === 1 && weighing2Before >= 0.0) {
        setWeighingState("ข้อมูลผิดพลาด");
      } else {
        setWeighingState(stateWeighing2 >= 1 ? "เปิด" : "ปิด");
        setWeighingType(weighing2Type >= 1 ? "กล้วย" : "หมู");
        setWeighingBefore(weighing2Before);
        setWeighingBehind(weighing2Behind);
        setWeighingPercent(weighing2Percent);
      }
    });
  }, []);

  const contentStyle = {
    margin: 0,
    height: "90px",
    width: "100%",
    color: "#000000",
    background: "#f3f3f3",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
  };

  return (
    <div>
      <div className="dry-body">
        <div className="BT_View_ON_OFF">
          <Image
            width={15}
            preview={false}
            src="https://cdn-icons-png.flaticon.com/512/7753/7753034.png"
          />
          สถานะการทำงานชุดชั่งน้ำหนักที่ 2 {weighingState}
        </div>

        <div style={contentStyle}>
          <div>
            <div>วัตถุดิบตากแห้ง</div>
            <div>น้ำหนักก่อนตาก</div>
            <div>น้ำหนักหลังตาก</div>
            <div>น้ำหนักแห้ง</div>
          </div>

          <div style={{ textAlignLast: "right" }}>
            <div>{weighingType}</div>
            <div>{weighingBefore} กก.</div>
            <div>{weighingBehind} กก.</div>
            <div>{weighingPercent} %</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weighing2;
