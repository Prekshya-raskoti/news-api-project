import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [news, setNews] = useState([]);
  const [topic, setTopic] = useState("technology");

  const fetchNews = (searchTopic) => {
    axios
      .get(`http://127.0.0.1:8000/api/news/?topic=${searchTopic}`)
      .then((res) => setNews(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchNews(topic);
  }, []);

  return (
    <div className="app">

      <h1 className="title">📰 News App</h1>

      <div className="search-box">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Search topic..."
        />

        <button onClick={() => fetchNews(topic)}>
          Search
        </button>
      </div>

      <div className="news-container">

        {news.map((item, index) => (
          <div className="card" key={index}>

            {item.urlToImage && (
              <img
                src={item.urlToImage}
                alt=""
              />
            )}

            <div className="card-content">

              <h2>{item.title}</h2>

              <p>{item.description}</p>

              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
              >
                Read More
              </a>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default App;