import React, { useState, useEffect } from "react";
import styled from "styled-components";

function InputStats({ type, statFilter }) {
  const [input, setInput] = useState({ from: "", to: "" });
  let [flag, setFlag] = useState(0);

  let tempObj = {};

  const changeFrom = (e) => {
    setInput({ from: e.target.value.replace(/\D/g, "") });
  };

  const changeTo = (e) => {
    setInput({ to: e.target.value.replace(/\D/g, "") });
  };

  useEffect(() => {
    if (input.from !== undefined && input.from !== "") {
      if (!tempObj[type.replace("-", "").toLowerCase() + "From"])
        tempObj[type.replace("-", "").toLowerCase() + "From"] = Number(
          input.from
        );
    }
    if (input.to !== undefined && input.to !== "") {
      if (!tempObj[type.replace("-", "").toLowerCase() + "To"])
        tempObj[type.replace("-", "").toLowerCase() + "To"] = Number(input.to);
    }
    if (Object.keys(tempObj).length !== 0){
        statFilter(tempObj);
    }
  }, [flag]);

  return (
    <Stat>
      <StatBlock>
        {type}:
        <StatRage>
          <InputStat
            value={input.from}
            onChange={changeFrom}
            onBlurCapture={() => setFlag(flag + 1)}
          />{" "}
          -{" "}
          <InputStat
            value={input.to}
            onChange={changeTo}
            onBlurCapture={() => setFlag(flag + 1)}
          />
        </StatRage>
      </StatBlock>
    </Stat>
  );
}

export default InputStats;

const Stat = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin: 10px 0px 20px 0px;
`;
const StatBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StatRage = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const InputStat = styled.input`
  width: 50px;
  height: 25px;
  margin: 0px 10px 0px 10px;
`;
