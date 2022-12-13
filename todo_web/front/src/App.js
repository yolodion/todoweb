import "./App.css";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

const TodoBox = styled.div`
  width: 500px;
  height: 1000px;
  border: 1px solid gray;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const TodoCreate = styled.div`
  width: 450px;
  height: 80px;
  background-color: #eeeeee;
  color: black;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-top: 20px;
`;

const CreateBox = styled.div`
  width: 400px;
  height: 200px;
  border: 1px solid gray;
  z-index: 2;
  position: absolute;
  top: 200px;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const PutBox = styled.div`
  width: 400px;
  height: 200px;
  border: 1px solid gray;
  z-index: 2;
  position: absolute;
  top: 200px;
  background-color: white;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Input = styled.input`
  width: 300px;
  height: 50px;
`;

const Button = styled.button`
  margin-top: 20px;
`;

const Todo = styled.div`
  margin-top: 20px;
  width: 400px;
  height: 80px;
  border: 1px solid gray;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 22px;
  position: relative;
`;

function App() {
  const [popup, setPopup] = useState(false);
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [idValue, setIdValue] = useState(0);
  const [putInput, setPutInput] = useState(true);
  const [putText, setPutText] = useState("");
  const [putId, setPutId] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001/posting")
      .then((res) => res.data)
      .then((res) => setList(res));
  }, []);

  const createHandler = () => {
    setPopup(!popup);
  };

  const inputHandler = (e) => {
    setText(e.target.value);
  };

  const addHandler = () => {
    setIdValue(list[list.length - 1].id + 1);
    axios
      .post("http://localhost:3001/posting", {
        id: idValue,
        text,
      })
      .then((res) => {
        setPopup(false);
        window.location.reload();
      });
  };

  const deleteHandler = (id) => {
    axios.delete(`http://localhost:3001/posting/${id}`).then(() => {
      window.location.reload();
    });
  };

  const putTextHandler = (e) => {
    setPutText(e.target.value);
  };

  const putIdHandler = (id) => {
    console.log("작동함");
    setPutId(id);
    setPutInput(false);
  };

  const putHandler = () => {
    axios
      .put(`http://localhost:3001/posting/${putId}`, {
        id: putId,
        text: putText,
      })
      .then(() => {
        setPutInput(true);
        window.location.reload();
      });
  };

  const cancelHandler = () => {
    setPutInput(true);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>투두 앱</h1>
      <TodoBox>
        <TodoCreate onClick={createHandler}>할 일 추가하기</TodoCreate>
        {popup && (
          <CreateBox>
            <h1>할 일</h1>
            <Input onChange={inputHandler} />
            <Button onClick={addHandler}>추가하기</Button>
          </CreateBox>
        )}
        {putInput ? (
          list.map((ele, idx) => {
            return (
              <Todo key={idx}>
                {ele.text}
                <span
                  onClick={() => putIdHandler(ele.id)}
                  style={{
                    position: "absolute",
                    right: "45px",
                    fontSize: "16px",
                  }}
                >
                  수정
                </span>
                <span
                  onClick={() => deleteHandler(ele.id)}
                  style={{
                    position: "absolute",
                    right: "20px",
                    fontSize: "16px",
                  }}
                >
                  X
                </span>
              </Todo>
            );
          })
        ) : (
          <PutBox>
            <input
              onChange={putTextHandler}
              style={{ width: "300px", height: "80px", marginTop: "20px" }}
            />
            <div>
              <button
                onClick={putHandler}
                style={{ width: "60px", marginTop: "35px" }}
              >
                수정
              </button>
              <button
                onClick={cancelHandler}
                style={{ width: "60px", marginTop: "35px" }}
              >
                취소
              </button>
            </div>
          </PutBox>
        )}
      </TodoBox>
    </div>
  );
}

export default App;
