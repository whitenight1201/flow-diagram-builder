import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <div className="flex flex-col h-screen w-full bg-gray-100">
      <div className="w-full h-[10%] px-16">
        <Header />
      </div>
      <Main />
    </div>
  );
}

export default App;
