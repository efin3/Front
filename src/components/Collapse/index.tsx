import React, { ReactNode, useState } from "react";
import styled from "styled-components";
import { Checkbox } from "@escolalms/components/lib/components/atoms/Option/Checkbox";

type Props = {
  title: string;
  children: ReactNode;
  active?: boolean;
};

const CollapseStyled = styled.div`
  padding: 15px;
  background-color: ${({ theme }) =>
    theme.mode === "dark" ? theme.gray1 : theme.gray5};
  .collapse-title {
  }
  .collapse-content {
    padding: 0 30px;
    padding-top: 22px;
    margin-top: 16px;
    border-top: 1px solid ${({ theme }) => theme.gray1};
    @media (max-width: 991px) {
      padding: 30px 0 0 0;
    }
  }
`;

const Collapse: React.FC<Props> = ({ title, children, active }) => {
  const [isOpened, setIsOpened] = useState(active || false);
  return (
    <CollapseStyled>
      <div className="collapse-title">
        <Checkbox
          name={title}
          label={<strong>{title}</strong>}
          checked={active || isOpened}
          onChange={() => setIsOpened(!isOpened)}
        />
      </div>
      {isOpened && <div className="collapse-content">{children}</div>}
    </CollapseStyled>
  );
};

export default Collapse;
