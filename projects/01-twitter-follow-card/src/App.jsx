import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard.jsx";

const users = [
  {
    userName: "germanevangelisti",
    name: "German Evangelisti",
    isFollowing: false,
  },

  {
    userName: "Geraperez10",
    name: "Gerardo Perez",
    isFollowing: true,
  },

  {
    userName: "StephenCurry30",
    name: "Stephen Curry",
    isFollowing: false,
  },
];

export function App() {
  return (
    <section className="App">
      {users.map(({ userName, name, isFollowing }) => (
        <TwitterFollowCard
          key={userName}
          userName={userName}
          initialIsFollowing={isFollowing}
        >
          {name}
        </TwitterFollowCard>
      ))}
    </section>
  );
}
