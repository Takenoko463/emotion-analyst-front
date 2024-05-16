import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // required for chart.js v3+

const App = () => {
  const [word, setWord] = useState('悲しい');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState('');

  // 英語の感情ラベルと対応する日本語ラベルのマッピング
  const emotionLabels = {
    aware: "哀れ",
    shape: "恥",
    anger: "怒り",
    unpleasant: "不快",
    fear: "恐れ",
    surprise: "驚き",
    love: "愛",
    excitement: "興奮",
    cheap: "動じない",
    pleasant: "快い",
  };

  // 感情に対応する色のマッピング
  const emotionColors = {
    aware: "#A9A9A9",       // ダークグレー
    shape: "#FFB6C1",       // ライトピンク
    anger: "#FF0000",       // 赤
    unpleasant: "#808080",  // グレー
    fear: "#8B0000",        // ダークレッド
    surprise: "#FFFF00",    // 黄色
    love: "#FF69B4",        // ホットピンク
    excitement: "#FFA500",  // オレンジ
    cheap: "#00FF00",       // ライムグリーン
    pleasant: "#00BFFF"     // ディープスカイブルー
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://emotion-analyst-api-image-jjgaumsera-an.a.run.app/emotion/${word}`);
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
  const emotions = data.emotions.reduce((acc, emotion) => {
    const key = Object.keys(emotion)[0];
    const value = Object.values(emotion)[0];
    acc.labels.push(emotionLabels[key] || key); // 日本語ラベルを使用
    acc.data.push(value);
    acc.colors.push(emotionColors[key] || '#000000'); // 対応する色を使用、デフォルトは黒
    return acc;
  }, { labels: [], data: [], colors: [] });

  const chartData = {
    labels: emotions.labels,
    datasets: [
      {
        data: emotions.data,
        backgroundColor: emotions.colors,
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false, // Aspect ratioを無効にする
  };

  // すべての値が0かどうかをチェック
  const allValuesAreZero = emotions.data.every(value => value === 0);
  
  return (
    <div>
      <h1>Emotion Analysis</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleInputChange} 
          placeholder="Enter a word" 
        />
        <button type="submit">Analyze</button>
      </form>
      <h2>Word: {data.word}</h2>
      <h3>Emotions</h3>
      {allValuesAreZero ? (
        <div>感情を特定できません</div>
      ) : (
        <div style={{ width: '300px', height: '300px' }}> {/* グラフのサイズを設定 */}
          <Pie data={{
            labels: emotions.labels,
            datasets: [
              {
                data: emotions.data,
                backgroundColor: emotions.colors,
              },
            ],
          }} options={{ maintainAspectRatio: false }} />
        </div>
      )}
    </div>
  );
};

export default App;
