import { FaBars, FaBell, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
 
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton
} from "@clerk/clerk-react";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  return (
    <header

      style={{
        height: "72px",
        background: "#111827",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        borderBottom: "1px solid #1f2937",
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

      {/* CENTER SEARCH */}
      <div
        className="hidden md:flex items-center bg-[#1f2937] px-3 py-1.5 rounded-lg w-[300px]"
      >
        <FaSearch />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-white ml-2 w-full"
        />
      </div>


      {/* RIGHT */}
      <div >
        
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

      </div>
    </header>
  );
};

export default Header;
