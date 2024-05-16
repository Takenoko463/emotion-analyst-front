import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // required for chart.js v3+

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://emotion-analyst-api-image-jjgaumsera-an.a.run.app/emotion/悲しい');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    acc.labels.push(key);
    acc.data.push(value);
    return acc;
  }, { labels: [], data: [] });

  const chartData = {
    labels: emotions.labels,
    datasets: [
      {
        data: emotions.data,
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#FF6384', '#36A2EB', '#FFCE56',
          '#FF6384', '#36A2EB', '#FFCE56', '#36A2EB'
        ],
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false, // Aspect ratioを無効にする
  };

  return (
    <div>
      <h1>Word: {data.word}</h1>
      <h2>Emotions</h2>
      <div style={{ width: '300px', height: '300px' }}> {/* グラフのサイズを設定 */}
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default App;
