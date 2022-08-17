import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoState } from "../atoms";
import styled from "styled-components";
interface IForm {
  toDo: string;
}
const I = styled.input`
  font-size: 20px;
  border-radius: 10px;
`;
function CreateToDo() {
  const category = useRecoilValue(categoryState);
  const [ToDos, setToDos] = useRecoilState(toDoState);
  const { handleSubmit, register, setValue } = useForm<IForm>();
  const onsubmit = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  const Btn = styled.button`
    cursor: pointer;
    background-color: #0984e3;
    color: white;
    display: flex;
    border-color: #0984e3;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border-style: solid;
    padding: 10px;
    border-width: 1px;
  `;
  const Form = styled.form`
    display: flex;
  `;
  window.localStorage.setItem("items", JSON.stringify(ToDos));
  return (
    <Form onSubmit={handleSubmit(onsubmit)}>
      <I
        {...register("toDo", {
          required: "todo 를 적어주세요",
        })}
        placeholder="Wirte a todo"
      />
      <Btn>Add</Btn>
    </Form>
  );
}
export default CreateToDo;
