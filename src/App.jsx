import { useEffect, useState } from "react";
import { useTg } from "./hooks/useTg";
import { Route, Routes } from "react-router-dom";
import ProductsPage from "./components/ProductsPage";
import OrderPage from "./components/OrderPage";
import MobileBar from "./components/MobileBar";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const { tg } = useTg();
  const [addedItems, setAddedItems] = useState([]);
  const [fakeLoad, setFakeLoad] = useState(true);

  useEffect(() => {
    tg.ready();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFakeLoad(false);
    }, 1200);
  }, [fakeLoad])

  return (
    <div className="App">
      {fakeLoad ? <LoadingScreen /> : <></>}
      <main>
        <div className="container">
          <Routes>
            <Route
              index
              element={
                <ProductsPage
                  addedItems={addedItems}
                  setAddedItems={setAddedItems}
                />
              }
            />
            <Route
              path="/order"
              element={<OrderPage addedItems={addedItems} />}
            />
          </Routes>
          <MobileBar />
        </div>
      </main>
    </div>
  );
}

export default App;
