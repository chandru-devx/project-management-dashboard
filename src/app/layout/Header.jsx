import { FaBars, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton
} from "@clerk/clerk-react";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const isDark = document.documentElement.classList.contains("dark");

  return (
    <header
      style={{
        height: "72px",
        background: isDark ? "#111827" : "#ffffff",
        color: isDark ? "white" : "#111827",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        borderBottom: isDark ? "1px solid #1f2937" : "1px solid #e5e7eb",
      }}
    >
      {/* LEFT */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <FaBars
          size={20}
          style={{ cursor: "pointer" }}
          onClick={toggleSidebar}
        />
        <h3>Dashboard</h3>
      </div>

      {/* SEARCH */}
      <div
        className="hidden md:flex items-center px-3 py-1.5 rounded-lg w-[300px]"
        style={{
          background: isDark ? "#1f2937" : "#f3f4f6",
        }}
      >
        <FaSearch />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none ml-2 w-full"
          style={{
            color: isDark ? "white" : "#111827",
          }}
        />
      </div>

      {/* RIGHT */}
      <div>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Login
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/login" />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
