import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { set, ref, onValue, update, remove } from "firebase/database";
import {
  Switch,
} from "antd";

import FanView from "../Home/FanView";
import LineSetting from "./LineSetting";
import LineValue from "./LineValue";
const LineTOKEN = () => {
    const [todo, setTodo] = useState();
    const [todos, setTodos] = useState();
    const [disabled, setDisabled] = useState();
    useEffect(() => {
      onValue(ref(db), (snapshot) => {
        setTodos([]);
        const data = snapshot.val();
        var ST_IO = data.Fram.State_Fan;
        if (ST_IO == 1) {
          setDisabled(true);
        } else {
          setDisabled(false);
        }
        // console.log(ST_IO);
        if (data !== null) {
          Object.values(data).map((todo) => {
            setTodos((oldArray) => [...oldArray, todo]);
          });
        }
      });
    }, []);
  
    const State_Fan = (checked) => {
      console.log(`Fan ${checked}`);
       var State_Fan;
      if (checked == true) {
        State_Fan = 1;
      } else {
        State_Fan = 0;
      }
  
      update(ref(db, `Fram`), {
        State_Fan,
      });
    };
    return (
      <div className="dry-body">
        <LineSetting />
      </div>
    );
  };
export default LineTOKEN