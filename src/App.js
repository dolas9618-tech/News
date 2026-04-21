import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PostList from "./components/PostList";
import PostDetailPage from "./components/PostDetailPage";
import Categories from "./components/Categories";

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;