import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categories, categoryState, toDoSelector } from "../atoms";
import CreateNewCategories from "./CreateNewCategories";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;
const TodoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;
const Title = styled.h1`
  font-size: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0984e3;
`;
const Btn = styled.div`
  cursor: pointer;
  background-color: #0984e3;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border-style: solid;

  padding: 10px;
  border-width: 1px;
`;
const Select = styled.select`
  font-size: 30px;
`;
const Todolist = () => {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value);
  };
  const [pluscat, setPluscat] = useState(false);
  const options = useRecoilValue(categories);
  return (
    <div>
      <Container>
        <Title>To Dos</Title>
        <Btn
          onClick={() => {
            setPluscat((prev) => !prev);
          }}
        >
          Add Cat
        </Btn>
      </Container>
      {pluscat ? <CreateNewCategories></CreateNewCategories> : ""}
      <Container>
        <form>
          <Select value={category} onInput={onInput}>
            {options.map((option) => (
              <option value={option}>{option}</option>
            ))}
          </Select>
        </form>
        <CreateToDo></CreateToDo>
      </Container>

      <TodoContainer>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </TodoContainer>
    </div>
  );
};
// function Todolist() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<IFormData>({
//     defaultValues: {
//       email: "@naver.com",
//     },
//   });
//   type IFormData = {
//     errors: {
//       email: {
//         message: string;
//       };
//       password: {
//         message: string;
//       };
//       chkpassword: {
//         message: string;
//       };
//     };
//     email: string;
//     password: string;
//     chkpassword: string;
//   };
//   const onValid = (data: IFormData) => {
//     if (data.chkpassword !== data.password) {
//       setError(
//         "chkpassword",
//         { message: "??????????????? ????????????!" },
//         { shouldFocus: true }
//       );
//     }
//   };
//   return (
//     <div>
//       <form onSubmit={handleSubmit(onValid)}>
//         <input
//           {...register("email", {
//             required: true,
//             validate: (value) =>
//               value.includes("rlfehd") ? "rlfehd??? ????????? ??? ????????????." : true,
//             pattern: {
//               value: /^[A-Za-z0-9._%+-]+@naver.com$/,
//               message: "????????? email?????????.",
//             },
//           })}
//           placeholder="Email"
//         />
//         <span>{errors?.email?.message}</span>
//         <input
//           {...register("password", {
//             required: true,
//             minLength: {
//               value: 8,
//               message: "8?????? ????????? password ??????!",
//             },
//           })}
//           placeholder="password"
//         />
//         <span>{errors?.password?.message}</span>
//         <input
//           {...register("chkpassword", {
//             required: true,
//             minLength: {
//               value: 8,
//               message: "8?????? ????????? password ??????!",
//             },
//           })}
//           placeholder="password"
//         />
//         <span>{errors?.chkpassword?.message}</span>
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }

export default Todolist;
