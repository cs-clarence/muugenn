import React from "react";
import SiteLogo from "./site-logo.svg";
import { debounce } from "lodash";
// import AccountLogo from "./account-logo.svg";

type Props = {};
type State = {
  lastScrollPosition: number;
  componentDynamicClass: string;
};

class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // bind 'this' to methods permanently
    this.handleScroll = this.handleScroll.bind(this);

    // setup state
    this.state = {
      lastScrollPosition: window.scrollY,
      componentDynamicClass: "opacity-100",
    };
  }
  componentDidMount() {
    // setup event listeners
    window.addEventListener("scroll", debounce(this.handleScroll, 50));
  }
  render() {
    return (
      <header
        className={`h-14 bg-blue-300 dark:bg-gray-700 sticky top-0 z-50 
        grid-flow-col-dense transition-opacity duration-150 
        ${this.state.componentDynamicClass}`}
      >
        <div className="mx-auto container flex-row flex h-full items-center">
          <img src={SiteLogo} className="h-full p-2" alt="site logo" />
          <p className="font-bold px-2 text-xl">MUUGENN</p>
        </div>
      </header>
    );
  }
  // private handlers
  private handleScroll() {
    if (this.state.lastScrollPosition < window.scrollY) {
      // console.log("up");
      this.setState({
        componentDynamicClass: "opacity-50",
      });
    } else {
      // console.log("down");
      this.setState({
        componentDynamicClass: "opacity-100",
      });
    }
    this.setState({
      lastScrollPosition: window.scrollY,
    });
  }
}

export { Header as default };
