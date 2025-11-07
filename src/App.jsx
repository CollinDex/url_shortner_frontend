import { useState } from "react";
import { shortenUrl } from "./api";

export default function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setShortUrl("");

    try {
      const data = await shortenUrl(url);
      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 font-sans">
      <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a long URL"
          className="border p-2 rounded w-80"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>

      {shortUrl && (
        <div className="mt-4 p-2 border bg-green-100 rounded">
          <p>
            Shortened URL:{" "}
            <a href={shortUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
              {shortUrl}
            </a>
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-2 border bg-red-100 rounded text-red-600">{error}</div>
      )}
    </div>
  );
}