import styled from "styled-components";
import * as process from "process";
import { useCourseProgram } from "@/hooks/useCourseProgram";
import { useContext, useEffect } from "react";
import { EscolaLMSContext } from "@escolalms/sdk/lib/react/context";
import { useWrapper } from "@/hooks/useWrapper";

const GamePlayerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GameStyled = styled.iframe`
  width: 288px;
  height: 512px;
  border-radius: 25px;
`;

interface GamePlayerProps {
  value: string;
  json: any;
}

export function GamePlayer({ value, json }: GamePlayerProps) {
  const { program, fetchProgram } = useContext(EscolaLMSContext);
  const { onCompleteTopic } = useCourseProgram({ program: program.value! });

  useWrapper({ onMeetObjective: onCompleteTopic });

  useEffect(() => {}, []);

  return (
    <GamePlayerContainer>
      <GameStyled title="game" src={"game/index.html"} />
    </GamePlayerContainer>
  );
}
