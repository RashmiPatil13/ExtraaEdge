export default function Header({ toggleDark }) {
  return (
    <div className="header">
      <h2>Manager Panel</h2>
      <div>
        <button onClick={toggleDark}>🌙</button>
        <button>Logout</button>
      </div>
    </div>
  );
}
