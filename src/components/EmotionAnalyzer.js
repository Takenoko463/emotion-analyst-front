import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css"; // BootstrapのCSSをインポート
import Button from "react-bootstrap/Button"; // React BootstrapのButtonコンポーネントをインポート
import "chart.js/auto"; // required for chart.js v3+
import "./EmotionAnalyzer.css"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const EmotionAnalyzer = () => {
  const [word, setWord] = useState("悲しい");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState("");

  // 英語の感情ラベルと対応する日本語ラベルのマッピング
  const emotionLabels = {
    aware: "哀れ",
    shame: "恥",
    anger: "怒り",
    unpleasant: "不快",
    fear: "恐れ",
    surprise: "驚き",
    love: "愛",
    excitement: "興奮",
    calm: "安堵",
    pleasant: "快い",
  };

  // 感情に対応する色のマッピング
  const emotionColors = {
    aware: "#A9A9A9", // ダークグレー
    shame: "#FFB6C1", // ライトピンク
    anger: "#FF0000", // 赤
    unpleasant: "#808080", // グレー
    fear: "#8B0000", // ダークレッド
    surprise: "#FFFF00", // 黄色
    love: "#FF69B4", // ホットピンク
    excitement: "#FFA500", // オレンジ
    calm: "#00FF00", // ライムグリーン
    pleasant: "#00BFFF", // ディープスカイブルー
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://emotion-analyst-api-image-jjgaumsera-an.a.run.app/emotion/${word}`
        );
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [word]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setWord(inputValue);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // グラフデータの準備
  const emotions = data.emotions.reduce(
    (acc, emotion) => {
      const key = Object.keys(emotion)[0];
      const value = Object.values(emotion)[0];
      acc.labels.push(emotionLabels[key] || key); // 日本語ラベルを使用
      acc.data.push(value);
      acc.colors.push(emotionColors[key] || "#000000"); // 対応する色を使用、デフォルトは黒
      return acc;
    },
    { labels: [], data: [], colors: [] }
  );

  // すべての値が0かどうかをチェック
  const allValuesAreZero = emotions.data.every((value) => value === 0);

  return (
    <div className="EmotionAnalyzer my-2">
      <Row>
        <h1 className="my-5 text-center">Emotion Analysis</h1>
      </Row>
      <Row>
        <Col md="4" className="my-3">
          <Form onSubmit={handleSubmit} id="form">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label as="h4">分析する文章</Form.Label>
              <Form.Control as="textarea" rows={3} value={inputValue} onChange={handleInputChange} placeholder="文章を入力してください" />
            </Form.Group>

            <Button variant="primary" type="submit">
              分析スタート!
            </Button>
          </Form>
        </Col>
        <Col md="6" className="mx-auto my-3" id="graph">
          <h2>Word: <strong class="shake">{data.word}</strong></h2>
          <h3>Emotions</h3>
          {allValuesAreZero ? (
            <div>感情を特定できません</div>
          ) : (
            <div>
              {" "}
              {/* グラフのサイズを設定 */}
              <Pie
                data={{
                  labels: emotions.labels,
                  datasets: [
                    {
                      data: emotions.data,
                      backgroundColor: emotions.colors,
                    },
                  ],
                }}
                options={{ maintainAspectRatio: true }}
              />
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};
export default EmotionAnalyzer;
