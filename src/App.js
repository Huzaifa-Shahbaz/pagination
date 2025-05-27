import { useEffect, useState } from "react";
import "./styles.css";

const ProductCard = ({ title, image }) => {
  return (
    <div className="product-card">
      <figure>
        <img src={image} alt={title} />
      </figure>
      <h4>{title}</h4>
    </div>
  );
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchData = async () => {
    const response = await fetch("https://dummyjson.com/products?limit=200");
    const jsonData = await response.json();
    setProducts(jsonData.products);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const productsPerPage = 10;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePrevPage = () => setCurrentPage((prev) => prev - 1);
  const handlePaginationClick = (n) => setCurrentPage(n);

  const paginationButtons = Array.from({ length: totalPages }, (_, i) => i + 1);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToShow = products.slice(startIndex, endIndex);

  return (
    <div className="App">
      <h3>Products</h3>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        {paginationButtons?.map((n, index) => {
          return (
            <button
              key={n}
              onClick={() => handlePaginationClick(n)}
              style={
                currentPage === index + 1
                  ? {
                      fontWeight: "bold",
                      backgroundColor: "blue",
                      color: "white",
                    }
                  : {}
              }
            >
              {n}
            </button>
          );
        })}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <div className="products-container">
        {productsToShow.map((prod) => {
          return (
            <ProductCard
              key={prod.id}
              title={prod.title}
              image={prod.thumbnail}
            />
          );
        })}
      </div>
    </div>
  );
}
