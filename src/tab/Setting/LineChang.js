import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { set, ref, onValue, update, remove } from "firebase/database";
import { Button, Mentions } from "antd";
var token_defalue=" ";
const LineChang = () => {
  const onChange = (value) => {
    setLineToken(value);
    console.log('Change:', value);
  };
  const onSelect = (option) => {
    console.log('select', option);
  };
  const [LineToken, setLineToken] = useState();
  const [todos, setTodos] = useState();
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      token_defalue=(data.Line.TOKEN1);
      console.log(LineToken)
    });
  }, []);

  const fansetup = () => {
    var TOKEN1 = LineToken;
    update(ref(db, `Line`), {
      TOKEN1,
    });
  }
  return (
    <div>
      <div className="line_token">
        {token_defalue}
      </div>
      <Mentions
        rows={2}
        style={{
          width: '100%',height:''
        }}
        onChange={onChange}
        onSelect
        defaultValue={''}
        options={[
          {
            value: 'Token',
            label: 'afc163',
          },

        ]}
      />
      <Button onClick={fansetup} type="primary" style={{ marginTop: "10px" }}>บันทึก</Button>
    </div>
  );
};
export default LineChang