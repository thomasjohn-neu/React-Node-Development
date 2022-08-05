import "./style.css";
function Logout({ onLogout }) {
    return (
        <nav className="user-navbar">
            <ul>
                <button onClick={(e) => {
                    e.preventDefault();
                    onLogout();
                }} className="logout-btn">Logout</button>
            </ul>
        </nav>
    );
};

export default Logout;

