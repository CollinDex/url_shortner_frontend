import { useState } from "react";
import { shortenUrl, getInfo } from "./api";

export default function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");
    setInfo(null);

    try {
      const data = await shortenUrl(url);
      setShortUrl(`http://localhost:8000/api/v1/${data.shortUrl}`);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleInfo = async () => {
    const code = shortUrl.split("/").pop();
    const data = await getInfo(code);
    setInfo(data);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 font-inter">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 text-center transition-all duration-300">
        <h1 className="text-3xl font-bold text-blue-700 mb-3">🔗 URL Shortener</h1>
        <p className="text-gray-500 mb-6 text-sm">
          Paste your long URL below and get a short link instantly.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all ${
              loading && "opacity-70 cursor-not-allowed"
            }`}
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-700 mb-2">
              ✅ Shortened URL:
              <br />
              <a
                href={shortUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 font-medium underline break-all"
              >
                {shortUrl}
              </a>
            </p>
            <button
              onClick={handleInfo}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              View Details
            </button>
          </div>
        )}

        {info && (
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4 text-left shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              URL Details
            </h2>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Original URL:</span>{" "}
              <a
                href={info.originalUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline break-all"
              >
                {info.originalUrl}
              </a>
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Visits:</span> {info.visits}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              <span className="font-medium">Created At:</span>{" "}
              {new Date(info.createdAt).toLocaleString()}
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg text-sm">
            ⚠️ {error}
          </div>
        )}
      </div>
    </div>
  );
}
