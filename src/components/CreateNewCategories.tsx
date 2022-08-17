import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { categories } from "../atoms";
import styled from "styled-components";
interface Icate {
  categories: string;
}
const I = styled.input`
  font-size: 35px;
  border-radius: 10px;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
`;
const CreateNewCategories = () => {
  const { register, handleSubmit, setValue } = useForm<Icate>();
  const [Rcategories, setRcategories] = useRecoilState(categories);
  const submit = ({ categories }: Icate) => {
    setRcategories((origin) => {
      origin = [...origin, categories];
      return origin;
    });
    setValue("categories", "");
  };
  return (
    <Container>
      <form onSubmit={handleSubmit(submit)}>
        <I
          {...register("categories", {
            required: "카테고리를 적어주세요",
          })}
          placeholder="카테고리 추가하기"
        ></I>
      </form>
    </Container>
  );
};

export default CreateNewCategories;
