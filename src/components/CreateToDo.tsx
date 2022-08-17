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
  window.localStorage.setItem("items", JSON.stringify(ToDos));
  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <I
        {...register("toDo", {
          required: "todo 를 적어주세요",
        })}
        placeholder="Wirte a todo"
      />
    </form>
  );
}
export default CreateToDo;
