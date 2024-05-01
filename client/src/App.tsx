import Barchart from "./Components/BarChart";
import CategoryWiseChart from "./Components/CategoryWiseChart";
import LineGraph from "./Components/LineGraph";
import TopBarChart from "./Components/TopBarChart";
import TopChart from "./Components/TopChart";
import VulnerableChart from "./Components/VulnerableChart";

function App() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <p className="text-5xl"></p>
      <TopChart />
      <TopBarChart />
      {/* <Barchart /> */}
      <LineGraph />
      <CategoryWiseChart />
      <VulnerableChart />
      <Barchart />
    </div>
  );
}

export default App;
