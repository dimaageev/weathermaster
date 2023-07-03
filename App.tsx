import { HomeScreen } from "@screens/index";
import { Loader } from "@src/components";
import { saveLoaderRef } from "@src/utils/refs/loader";

export default function App() {
  return (
    <>
      <HomeScreen />
      <Loader ref={saveLoaderRef} />
    </>
  );
}
