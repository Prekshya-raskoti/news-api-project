import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [news, setNews] = useState([]);
  const [topic, setTopic] = useState("technology");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const [page, setPage] = useState(1);

  // ---------------- FETCH NEWS ----------------
  const fetchNews = (searchTopic) => {

    setLoading(true);

    axios
      .get(`http://127.0.0.1:8000/api/news/?topic=${searchTopic}`)
      .then((res) => {
        setNews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // ---------------- FAVORITES ----------------
  const addToFavorites = (article) => {

    const exists = favorites.find((f) => f.url === article.url);
    if (exists) return;

    const updatedFavorites = [...favorites, article];

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );
  };

  // ---------------- LOAD NEWS ON START ----------------
  useEffect(() => {
    fetchNews(topic);
  }, []);

  // ---------------- PAGINATION LOGIC ----------------
  const articlesPerPage = 6;

  const startIndex = (page - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;

  const displayedNews = news.slice(startIndex, endIndex);

  const totalPages = Math.ceil(news.length / articlesPerPage);

  // ---------------- CATEGORIES ----------------
  const categories = [
    "technology",
    "sports",
    "business",
    "health",
    "science",
    "bitcoin"
  ];

  return (
    <div className={darkMode ? "app dark" : "app"}>

      {/* TOP BAR */}
      <div className="top-bar">
        <p>❤️ Favorites: {favorites.length}</p>

        <h1>📰 News App</h1>

        <button
          className="dark-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* SEARCH */}
      <div className="search-box">
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Search topic..."
        />

        <button
          onClick={() => {
            setPage(1);
            fetchNews(topic);
          }}
        >
          Search
        </button>
      </div>

      {/* CATEGORIES */}
      <div className="categories">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => {
              setTopic(cat);
              setPage(1);
              fetchNews(cat);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {loading ? (
        <h2 className="loading">Loading news...</h2>
      ) : (
        <div className="news-container">

          {displayedNews.map((item, index) => (
            <div className="card" key={index}>

              {item.urlToImage && (
                <img src={item.urlToImage} alt="" />
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

                <button
                  className="fav-btn"
                  onClick={() => addToFavorites(item)}
                >
                  ❤️ Save
                </button>
              </div>
            </div>
          ))}

        </div>
      )}

      {/* PAGINATION */}
      <div className="pagination">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default App;