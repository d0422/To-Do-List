import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";
import styled from "styled-components";
const Button = styled.div`
  cursor: pointer;
  background-color: #0984e3;
  border-radius: 10px;
  color: white;
  border-width: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-style: solid;
`;
const Li = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
  justify-content: space-evenly;
`;
const Span = styled.span`
  font-size: 40px;
`;
const BtnBox = styled.div`
  display: flex;
`;
function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (newCategory: IToDo["category"]) => {
    setToDos((oldToDos) => {
      const targetPosition = oldToDos.findIndex((toDo) => toDo.id === id);
      oldToDos = [
        ...oldToDos.slice(0, targetPosition),
        { text, id, category: newCategory },
        ...oldToDos.slice(targetPosition + 1),
      ];
      console.log(oldToDos);
      return oldToDos;
    });
  };
  const del = () => {
    setToDos((old) => {
      const position = old.findIndex((toDo) => toDo.id === id);
      old = [...old.slice(0, position), ...old.slice(position + 1)];
      window.localStorage.setItem("items", JSON.stringify(old));
      return old;
    });
  };
  return (
    <>
      <Li>
        <Span>{text}</Span>
        <BtnBox>
          {category !== "Doing" && (
            <Button
              onClick={() => {
                onClick("Doing");
              }}
            >
              Doing
            </Button>
          )}
          {category !== "TODO" && (
            <Button
              onClick={() => {
                onClick("TODO");
              }}
            >
              TODO
            </Button>
          )}
          {category !== "Done" && (
            <Button
              onClick={() => {
                onClick("Done");
              }}
            >
              Done
            </Button>
          )}
          <Button
            onClick={() => {
              del();
            }}
          >
            X
          </Button>
        </BtnBox>
      </Li>
    </>
  );
}
export default ToDo;
