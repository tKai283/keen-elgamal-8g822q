import React, { useState } from "react";
import LevelSelect from "./components/LevelSelect";
import QuestionCount from "./components/QuestionCount";
import TimeSelect from "./components/TimeSelect";
import WaitScreen from "./components/WaitScreen";
import Quiz from "./components/Quiz";

export default function App() {
  const [page, setPage] = useState("level");
  const [level, setLevel] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [timeLimit, setTimeLimit] = useState(30);

  return (
    <>
      {page === "level" && (
        <LevelSelect
          onSelect={(lvl) => {
            setLevel(lvl);
            setPage("count");
          }}
        />
      )}

      {page === "count" && (
        <QuestionCount
          onSelect={(count) => {
            setQuestionCount(count);
            setPage("time");
          }}
          onBack={() => setPage("level")}
        />
      )}

      {page === "time" && (
        <TimeSelect
          onSelect={(time) => {
            setTimeLimit(time);
            setPage("wait");
          }}
          onBack={() => setPage("count")}
        />
      )}

      {page === "wait" && (
        <WaitScreen
          level={level}
          questionCount={questionCount}
          timeLimit={timeLimit}
          onStart={() => setPage("quiz")}
          onBack={() => setPage("time")}
        />
      )}

      {page === "quiz" && (
        <Quiz
          level={level}
          questionCount={questionCount}
          timeLimit={timeLimit}
          onBack={() => setPage("level")}
        />
      )}
    </>
  );
}
