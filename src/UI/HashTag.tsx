import { FC } from "react";
import styled from "styled-components";

interface HashTagProp {
  title: string;
}

const Tag = styled.div`
  padding: 4px 10px;
  border-radius: 5px;
  background-color: #19191b;
  color: white;
  list-style-type: none;
  display: inline-block;
`;

const HashTag: FC<HashTagProp> = ({ title }) => {
  return <Tag className="tag">#{title}</Tag>;
};

export default HashTag;
