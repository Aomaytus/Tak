import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { onValue, ref, update } from "firebase/database";
import { Switch, Image } from "antd";

const Weigk_setoff = () => {
  const [disabled, setDisabled] = useState(false);
  const [we1, setWe1] = useState(0);

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const ST_IO_ch1 = data.Fram.State_Io_Weigh1_SC;
        setDisabled(ST_IO_ch1 === 2);
        setWe1((data.Fram.hx711_1_scale / 1000).toFixed(2));
      }
    });
  }, []);

  const State_Io_Weigh1 = (checked) => {
    update(ref(db, `Fram`), { State_Io_Weigh1_SC: checked ? 2 : 1 });
  };

  return (
    <div className="dry-body" style={{ marginTop: "5px" }}>
      <div>ชุดชั่งที่ 1</div>
      <div className="weighing_set">
        <div>
          <Image
            width={50}
            preview={false}
            src="https://cdn-icons-png.flaticon.com/512/7753/7753034.png"
          />
        </div>
        <div className="dry-body-one">{we1} กก.</div>
        <div>
          <Switch
            checked={disabled}
            checkedChildren="Read"
            unCheckedChildren="Load"
            onChange={State_Io_Weigh1}
          />
        </div>
      </div>
    </div>
  );
};

export default Weigk_setoff;
