// src/components/Quiz.jsx
import React, { useState, useEffect, useRef } from "react";
import Timer from "./Timer";
import Lives from "./Lives";
import Enemy from "./Enemy";
import Explosion from "./Explosion";
import Result from "./Result";
import LoadingScreen from "./LoadingScreen";
import ConfirmGiveUp from "./ConfirmGiveUp";
import Background from "./Background"; // ← 深海背景
import "../styles.css";

// === 全問題リスト ===
const allQuestions = [
  { level: "easy", kanji: "山", reading: "やま" },
  { level: "easy", kanji: "川", reading: "かわ" },
  { level: "easy", kanji: "空", reading: "そら" },
  { level: "easy", kanji: "海", reading: "うみ" },
  { level: "easy", kanji: "清水", reading: "しみず、きよみず" },
  { level: "normal", kanji: "起死回生", reading: "きしかいせい" },
  { level: "normal", kanji: "更新", reading: "こうしん" },
  { level: "normal", kanji: "再開", reading: "さいかい" },
  { level: "normal", kanji: "検索", reading: "けんさく" },
  { level: "hard", kanji: "齟齬", reading: "そご" },
  { level: "hard", kanji: "灰汁", reading: "あく" },
  { level: "hard", kanji: "鰊", reading: "にしん" },
  { level: "hard", kanji: "信頼", reading: "しんらい" },
  { level: "expert", kanji: "魑魅魍魎", reading: "ちみもうりょう" },
  { level: "expert", kanji: "時化", reading: "しけ" },
  { level: "expert", kanji: "忌み", reading: "いみ" },
  { level: "expert", kanji: "御御御付け", reading: "おみおつけ" },
];

// === シャッフル関数 ===
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// === メインコンポーネント ===
export default function Quiz({ level, questionCount, timeLimit, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(null);
  const [answer, setAnswer] = useState("");
  const [lives, setLives] = useState(3);
  const [result, setResult] = useState("");
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [exploding, setExploding] = useState(false);
  const [skipUsed, setSkipUsed] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef(null);
  const paused = showConfirm; // ← あきらめ中は時間停止

  // 初期化
  useEffect(() => {
    const filtered = allQuestions.filter((q) => q.level === level);
    setQuestions(shuffle(filtered).slice(0, questionCount));
  }, [level, questionCount]);

  useEffect(() => {
    if (questions.length > 0 && !current) nextQuestion();
  }, [questions]);

  // タイマー管理
  useEffect(() => {
    if (!current || paused) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [current, paused]);

  const nextQuestion = () => {
    clearInterval(timerRef.current);
    if (questions.length === 0) {
      setResult("🎉 全問正解！おめでとう 🎉");
      setCurrent(null);
      return;
    }
    const [q, ...rest] = questions;
    setQuestions(rest);
    setCurrent(q);
    setAnswer("");
    setResult("");
    setTimeLeft(timeLimit);
  };

  const checkAnswer = () => {
    if (!current) return;
    const ans = answer.trim();
    const readings = current.reading
      .replace(/、/g, ",")
      .split(",")
      .map((r) => r.trim());

    if (readings.includes(ans)) {
      setResult("✅ 正解！");
      setTimeout(nextQuestion, 1200);
    } else if (
      readings.some(
        (r) =>
          ans.length === r.length &&
          [...ans].filter((c, i) => c !== r[i]).length === 1
      )
    ) {
      setResult("🩷 おしい！もう少し！");
      setAnswer("");
    } else {
      setResult("❌ 間違い！もう一度！");
      setAnswer("");
    }
  };

  const handleTimeout = () => {
    setExploding(true);
    setTimeout(() => {
      setExploding(false);
      loseLife("時間切れ！");
    }, 800);
  };

  const loseLife = (msg = "不正解…") => {
    const newLives = lives - 1;
    setLives(newLives);
    setResult(`❌ ${msg}（残り${newLives}機）`);
    if (newLives <= 0) {
      setResult("💀 GAME OVER 💀");
      setCurrent(null);
    } else {
      setTimeout(nextQuestion, 1500);
    }
  };

  const skipQuestion = () => {
    if (skipUsed || !current) return;
    setSkipUsed(true);
    nextQuestion();
  };

  const handleGiveUp = () => {
    clearInterval(timerRef.current);
    setShowConfirm(true);
  };

  const confirmGiveUp = (choice) => {
    if (choice === "yes") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onBack();
      }, 1500);
    } else {
      setShowConfirm(false);
      // タイマー再開
      setTimeout(() => {
        if (current) {
          setTimeLeft((prev) => prev);
        }
      }, 500);
    }
  };

  if (loading) return <LoadingScreen message="終了しています..." />;
  if (showConfirm) return <ConfirmGiveUp onConfirm={confirmGiveUp} />;

  if (!current)
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>{result || "ゲーム終了！"}</h2>
        <button onClick={onBack} style={{ marginTop: "20px" }}>
          ← 最初に戻る
        </button>
      </div>
    );

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <Background /> {/* 深海背景 */}
      <div className="lives-container">
        <Lives lives={lives} />
      </div>
      <Enemy visible={level === "easy"} />
      <Timer timeLeft={timeLeft} />
      <div
        style={{
          fontSize: "80px",
          margin: "60px 0",
          fontWeight: "bold",
          textShadow: "3px 3px 8px rgba(0,0,0,0.3)",
        }}
      >
        {current.kanji}
      </div>
      <input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="ひらがなで答えてね"
        style={{
          fontSize: "26px",
          padding: "12px 24px",
          borderRadius: "10px",
          border: "2px solid #555",
          width: "60%",
          textAlign: "center",
        }}
      />
      <div>
        <button
          onClick={checkAnswer}
          style={{
            fontSize: "22px",
            padding: "10px 30px",
            margin: "15px",
            borderRadius: "10px",
            background: "linear-gradient(90deg, #ff9966, #ff5e62)",
            color: "white",
            fontWeight: "bold",
          }}
        >
          答える
        </button>

        <button
          onClick={skipQuestion}
          disabled={skipUsed}
          style={{
            fontSize: "18px",
            padding: "8px 20px",
            margin: "10px",
            borderRadius: "8px",
            opacity: skipUsed ? 0.5 : 1,
          }}
        >
          問題を入れ替える（1回のみ）
        </button>

        <button
          onClick={handleGiveUp}
          style={{
            fontSize: "18px",
            padding: "8px 20px",
            margin: "10px",
            borderRadius: "8px",
            background: "#ccc",
          }}
        >
          あきらめる
        </button>
      </div>
      <Result message={result} />
      {exploding && <Explosion />}
    </div>
  );
}
