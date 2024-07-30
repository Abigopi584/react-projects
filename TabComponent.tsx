import * as React from "react";
import "./Tab.css";
interface ITabs {
  title: string;
  content:  React.ReactChild | React.ReactChild[] | string;
}

const Tab1Content = () => <p>This is Tab1 content</p>;
const Tab2Content = () => <p>This is Tab2 content</p>

export const tabs = [
  {
    title: "Details",
    content: <Tab1Content />
  },
  {
    title: "More Information",
    content: <Tab2Content />
  }
]


export const TabComponent = ({tabs}) => {

  const initialvalues = (tabs || []).map((tab, index) => tab?.title === "Details");
  const [isActive, setIsActive] = React.useState<boolean[]>(initialvalues);

  const handleOnClick = (index) => {
    setIsActive((prevStateOfTabs) => ((prevStateOfTabs || [])?.map((tab, tabIdx) => tabIdx === index)));
  }

  const activeIndex = React.useMemo(() => (isActive || [])?.indexOf(true),[isActive]);

  return (
    <div>
      <ul className="tabs" role="tab">
        {
          tabs?.map((tab, idx) =>
            <li>
              <button
                role="tab"
                key={`${tab?.title}_${idx}`}
                className={isActive[idx] ?  "tab-button-active":"tab-button"}
                onClick={() => handleOnClick(idx)}
              >
                {tab?.title}
              </button>
            </li>
          )
        }
      </ul>
      <div className={"displayActiveContent"}>
        {activeIndex !== -1 && !!tabs[activeIndex]  && tabs[activeIndex]?.content}
      </div>
    </div>
  )

}
