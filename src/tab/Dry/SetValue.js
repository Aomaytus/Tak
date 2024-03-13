import React, { useState } from "react";
import { db } from "../../firebase";
import { update, ref } from "firebase/database";
import { Col, InputNumber, Row, Slider, Button } from "antd";
import { Image } from "antd";

const SetValue = () => {
  const [HmStart, setHmStart] = useState(0);
  const [MinStart, setMinStart] = useState(0);
  const [HmStop, setHmStop] = useState(0);
  const [MinStop, setMinStop] = useState(0);
  const [inputValueTemp, setInputValueTemp] = useState(40);
  const [inputValueHum, setInputValueHum] = useState(45);

  const handleHMStartChange = (value) => {
    setHmStart(value);
  };
  const handleMinStartChange = (value) => {
    setMinStart(value);
  };
  const handleHMStopChange = (value) => {
    setHmStop(value);
  };
  const handleMinStopChange = (value) => {
    setMinStop(value);
  };
  const handleTempChange = (value) => {
    setInputValueTemp(value);
  };
  const handleHumChange = (value) => {
    setInputValueHum(value);
  };
  const handleAllSet = () => {
    update(ref(db, `Fram`), {
      TempSet: inputValueTemp,
      HumSet: inputValueHum,
      HmStart,
      MinStart,
      HmStop,
      MinStop,
    });
  };

  return (
    <div>
      <div>
        <div>
          <Image
            width={30}
            preview={false}
            src="https://cdn-icons-png.flaticon.com/512/850/850960.png"
          />
          กำหนดเวลาการตากแห้ง
        </div>
        <div>
          <div style={{ margin: "5px 0px" }}>เริ่มทำงาน</div>
          <InputNumber
            min={0}
            max={24}
            defaultValue={0}
            prefix="ชั่วโมง:"
            onChange={handleHMStartChange}
            style={{ marginRight: "10px" }}
          />
          :
          <InputNumber
            min={0}
            max={59}
            defaultValue={0}
            prefix="นาที:"
            onChange={handleMinStartChange}
            style={{ marginLeft: "10px" }}
          />
          <div style={{ margin: "5px 0px" }}>หยุดทำงาน</div>
          <InputNumber
            min={0}
            max={23}
            defaultValue={0}
            prefix="ชั่วโมง:"
            onChange={handleHMStopChange}
            style={{ marginRight: "10px" }}
          />
          :
          <InputNumber
            min={0}
            max={59}
            defaultValue={0}
            prefix="นาที:"
            onChange={handleMinStopChange}
            style={{ marginLeft: "10px" }}
          />
        </div>
      </div>
      <div>
        <Image
          width={30}
          preview={false}
          style={{ margin: "10px 0px" }}
          src="https://cdn-icons-png.flaticon.com/512/2100/2100100.png"
        />{" "}
        กำหนดอุณหภูมิควบคุม
        <Row>
          <Col span={12}>
            <Slider
              min={30}
              max={70}
              onChange={handleTempChange}
              value={typeof inputValueTemp === "number" ? inputValueTemp : 40}
              step={1}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={30}
              max={70}
              style={{ margin: "0px 10px" }}
              value={inputValueTemp}
              onChange={handleTempChange}
            />
          </Col>
        </Row>
      </div>
      <div>
        <Image
          width={30}
          preview={false}
          src="https://cdn-icons-png.flaticon.com/512/8923/8923689.png"
        />{" "}
        กำหนดความชื้นควบคุม
        <Row>
          <Col span={12}>
            <Slider
              min={10}
              max={50}
              onChange={handleHumChange}
              value={
                typeof inputValueHum === "number" ? inputValueHum : 40
              }
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={10}
              max={50}
              style={{ margin: "0px 10px" }}
              value={inputValueHum}
              onChange={handleHumChange}
            />
          </Col>
        </Row>
      </div>
      <Button type="primary" onClick={handleAllSet}>
        บันทึกค่า
      </Button>
    </div>
  );
};

export default SetValue;
