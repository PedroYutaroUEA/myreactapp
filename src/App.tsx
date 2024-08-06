import { Body } from "./components/Body";
import { DialogComponent } from "./components/DialogComponent";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="bg-zinc-800 h-screen flex flex-col justify-start items-center overflow-hidden">
      <Header label="Wellcome :3" link="https://github.com/YUT4R0"/>
      <Body />
      <footer className="w-scree justify-center items-center flex my-5">
        <DialogComponent />
      </footer>
    </div>
  );
}

export default App;
