import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { update, ref, onValue } from "firebase/database";
import { Switch, Image } from "antd";
var w2;
const Weigk_setoff2 = () => {
  const [todos, setTodos] = useState();
  const [disabled, setDisabled] = useState();
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      const ST_IO_ch2 = data.Fram.State_Io_Weigh2_SC || 0;
      setDisabled(ST_IO_ch2 === 2);
      w2 = (data.Fram.hx711_2_scale || 0) / 1000;
      w2 = w2.toFixed(2);
      if (data) {
        setTodos(Object.values(data));
      }
    });
  }, []);

  const State_Io_Weigh2 = (checked) => {
    const State_Io_Weigh2_SC = checked ? 2 : 1;
    update(ref(db, `Fram`), { State_Io_Weigh2_SC });
  };

  return (
    <div className="dry-body">
      <div style={{ marginTop: "5px" }}>
        <div>ชุดชั่งที่ 2</div>
        <div className="weighing_set">
          <div>
            <Image
              width={50}
              preview={false}
              src="https://cdn-icons-png.flaticon.com/512/7753/7753034.png"
            />
          </div>
          <div className="dry-body-one">{w2} กก.</div>
          <div>
            <Switch
              checked={disabled}
              checkedChildren="Read"
              unCheckedChildren="Load"
              onChange={State_Io_Weigh2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Weigk_setoff2;
