import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { set, ref, onValue, update, remove } from "firebase/database";
import { Switch } from "antd";

const StartOnOffWeigh2 = () => {
  const [disabled, setDisabled] = useState();
  const [todo, setTodo] = useState();
  const [todos, setTodos] = useState();

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      var ST_IO = data.Fram.State_Io_Weigh2;
      if (ST_IO == 1 || ST_IO == 3) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
      console.log(ST_IO);
      if (data !== null) {
        Object.values(data).map((todo) => {
          setTodos((oldArray) => [...oldArray, todo]);
        });
      }
    });
  }, []);

  const State_Io_Weigh2 = (checked) => {
    console.log(`switch to ${checked}`);
    const State_Io_Weigh2 = checked ? 1 : 0;
    update(ref(db, `Fram`), {
      State_Io_Weigh2,
    });
  };
  return (
    <div>
      <Switch
        size="small"
        checked={disabled}
        style={{ marginLeft: "10px" }}
        onChange={State_Io_Weigh2}
      />
    </div>
  );
};

export default StartOnOffWeigh2;
