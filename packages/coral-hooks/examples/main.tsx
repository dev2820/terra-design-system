import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { TabsExample, GroupExample, CheckboxExample, SliderExample, tabItems } from "./patterns";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main>
      <h1>Coral Hooks 구현 실험</h1>
      {(["hooks", "parts"] as const).map((api) => (
        <section key={api}>
          <h2>{api === "hooks" ? "훅 직접 사용" : "JSX Parts 사용"}</h2>
          <h3>Tabs</h3>
          <TabsExample api={api} items={tabItems} defaultValue="a" />
          <h3>ToggleGroup</h3>
          <GroupExample api={api} multiple />
          <h3>Checkbox</h3>
          <div data-example="native-checkbox">
            <form>
              <CheckboxExample api={api} name="notifications" />
              <button type="reset">초기화</button>
            </form>
          </div>
          <div data-example="custom-checkbox">
            <form>
              <CheckboxExample api={api} custom name="notifications" indeterminate />
              <button type="reset">초기화</button>
            </form>
          </div>
          <h3>Slider</h3>
          <div data-example="native-slider">
            <form>
              <SliderExample api={api} name="price" defaultValue={[20]} />
              <button type="reset">초기화</button>
            </form>
          </div>
          <div data-example="custom-slider">
            <form>
              <SliderExample api={api} custom name="price" defaultValue={[20, 80]} />
              <button type="reset">초기화</button>
            </form>
          </div>
        </section>
      ))}
    </main>
  </StrictMode>,
);
