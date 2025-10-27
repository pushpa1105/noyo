// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useAuth } from "@/hooks";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Wishlist() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      alert("Please login first to view your wishlist.");
      navigate("/auth");
    } else {
      const savedWishlist = JSON.parse(localStorage.getItem("wishlist")!) || [];
      setWishlistItems(savedWishlist);
    }
  }, [currentUser, navigate]);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-medium text-center text-pink-500 mb-6">
        Your Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center text-black max-w-md mx-auto">
          <p className="mb-4 text-lg">
            This wishlist is empty.
          </p>
          <p className="mb-6">
            You don't have any products in the wishlist yet. You will find a lot of interesting products on our "Shop" page.
          </p>
          <Link
            to="/"
            className="inline-block bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
          >
            Return to Store
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-4">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b border-gray-200 pb-2"
            >
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
