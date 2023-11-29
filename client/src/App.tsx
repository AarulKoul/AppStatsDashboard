import CategoryWiseChart from "./Components/CategoryWiseChart";
import LineGraph from "./Components/LineGraph";
import TopChart from "./Components/TopChart";
import VulnerableChart from "./Components/VulnerableChart";

function App() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <p className="text-5xl"></p>
      <TopChart />
      {/* <Barchart /> */}
      <LineGraph />
      <CategoryWiseChart />
      <VulnerableChart />
    </div>
  );
}

export default App;
