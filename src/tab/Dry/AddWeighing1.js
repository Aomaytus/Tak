import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { set, ref, onValue, update, remove } from "firebase/database";

import { Col, InputNumber, Row, Slider, Space, Button } from "antd";
import { Checkbox } from "antd";
import { Image } from "antd";

var auto_set = 0;
const AddWeighing1 = () => {
  const [todo, setTodo] = useState();
  const [todos, setTodos] = useState();
  //check box
  const [pig, setpig] = useState(true);
  const [banana, setbanana] = useState(true);
  const [auto, setauto] = useState(true);
  const [autoWeigh, setautoWeigh] = useState(true);
  //value 
  const [ch, setch] = useState(0);
  const [percentage, setpercentage] = useState(70);
  const [inputValue1, setInputValue1] = useState(0);
  const [inputValue2, setInputValue2] = useState(0);
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setTodos([]);
      const data = snapshot.val();
      auto_set = data.Fram.hx711_1_scale;
      if (data !== null) {
        Object.values(data).map((todo) => {
          setTodos((oldArray) => [...oldArray, todo]);
        });
      }
    });
  }, []);

  const togglepig = () => {
    setbanana(!false)
    setpig(!true)
    setauto(true)
    setautoWeigh(!true)
    setpercentage(80)
    //Weighing1Type 
    setch(0)
  };
  const togglebanana = () => {
    setbanana(!true);
    setpig(!false);
    setauto(true);
    setautoWeigh(!true);
    setpercentage(76);
  setch(1);
  };

  const onChange1 = (newValue) => {
    setInputValue1(newValue);
  };
  const onChange2 = (newValue) => {
      setInputValue2(newValue);
  };
  const autoweigh = () => {
    setautoWeigh(!false);
    setauto(true);
    const Weighing1BeforeSet = parseFloat((auto_set).toFixed(2));
    setInputValue1(Weighing1BeforeSet / 1000);

  };
  const autotoggle = () => {
    setauto(false);
    var value = (((inputValue1) * 1000) / 100) * percentage;
    const Weighing1BehindSet = parseFloat((value).toFixed(2));
    setInputValue2(Weighing1BehindSet / 1000);

  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const All_add = () => {
    var Weighing1Type =ch;
    var Weighing1BeforeSet = inputValue1 * 1000
    var Weighing1BehindSet = inputValue2 * 1000
    update(ref(db, `Fram`), {
      Weighing1Type,
      Weighing1BeforeSet,
      Weighing1BehindSet,
    });
  }
  return (
    <div>
      <p style={{ marginBottom: "-1px" }}>เลือกวัตถุดิบตากแห้ง</p>
      <Row>
        <Checkbox
          checked={!pig}
          onClick={togglepig}
          style={{ marginRight: "10px" }}
        />
        <Col span={20}>
          {" "}
          เนื้อหมู
          <Image
            width={30}
            preview={false}
            src="https://cdn-icons-png.flaticon.com/512/8453/8453627.png"
          />{" "}
        </Col>

        <Col span={20}>
          <Checkbox
            checked={!banana}
            onClick={togglebanana}
            style={{ marginRight: "10px" }}
          />
          กล้วย
          <Image
            width={30}
            preview={false}
            src="https://cdn-icons-png.flaticon.com/512/9648/9648084.png"
            style={{ marginLeft: "8px" }}
          />{" "}
        </Col>
      </Row>{" "}
      <Image
        width={40}
        preview={false}
        onClick={showModal}
        src="https://cdn-icons-png.flaticon.com/512/6178/6178480.png"
      />{" "}
      น้ำหนักก่อนตาก
      <Row>
        <Col span={12}>
          <Slider
            min={0.10}
            max={2}
            onChange={onChange1}
            value={typeof inputValue1 === "number" ? inputValue1 : 0}
            step={0.01}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0.10}
            max={2}
            step={0.01}
            style={{
              margin: "0 16px",
            }}
            value={inputValue1.toFixed(2)}
            onChange={onChange1}
          />
        </Col>
        <Col span={20}>
          <Checkbox
            checked={autoWeigh}
            onClick={autoweigh}
            style={{ marginRight: "10px" }}
          />
          น้ำหนักก่อนตากอัตโนมัต
        </Col>
      </Row>{" "}
      <Image
        width={40}
        preview={false}
        onClick={showModal}
        src="https://cdn-icons-png.flaticon.com/512/6178/6178480.png"
      />{" "}
      น้ำหลักหลังตาก
      <Row>
        <Col span={12}>
          <Slider
            min={inputValue1 / 2}
            max={(inputValue1)}
            onChange={onChange2}
            value={inputValue2.toFixed(2)}
            step={0.01}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={inputValue1 / 2}
            max={inputValue1}
            step={0.01}
            style={{
              margin: "0 16px",
            }}
            value={inputValue2.toFixed(2)}
            onChange={onChange2}
          />
        </Col>
        <Col span={20}>
          <Checkbox
            checked={!auto}
            onClick={autotoggle}
            style={{ marginRight: "10px" }}
          />
          น้ำหนักหลังตากอัตโนมัต
        </Col>
      </Row>
      <div>
        <Button type="primary" onClick={All_add}>บันทึกค่า</Button>
      </div>

    </div>
  );
};

export default AddWeighing1;
