import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import * as RD from "react-dom";
import { render } from "../dist/src.fc45d0fd";

class Counter {
  @observable name = "A counter";
  @observable value = 1;
  @action increment() {
    this.value += 1;
  }
  @action decrement() {
    this.value -= 1;
  }

  @computed get report() {
    return this.name + " = " + this.value;
  }
}

class AppState {
  @observable counterList: Counter[] = [];
  @action add() {
    let c = new Counter();
    this.counterList.push(c);
    c.name = "Counter " + this.counterList.length;
  }
  @action removeLast() {
    this.counterList.pop();
  }

  @computed get sum() {
    return this.counterList.map((c) => c.value).reduce((a, b) => a + b, 0);
  }

  @computed get report() {
    return `Total counters ${this.counterList.length}, total sum ${this.sum}`;
  }
}

@observer
class AppView extends React.Component<{ app: AppState }> {
  render() {
    console.log("Re-rendering app");
    return (
      <div>
        <p>Welcome to the counter app</p>
        {this.props.app.counterList.map((counter) => (
          <CounterView key={counter.name} counter={counter} />
        ))}
        <CounterReport report={() => this.props.app.report} />
        <p>
          <button onClick={() => this.props.app.add()}>Add counter</button>
          <button onClick={() => this.props.app.removeLast()}>Remove counter</button>
        </p>
      </div>
    );
  }
}

@observer
class CounterView extends React.Component<{ counter: Counter }> {
  render() {
    let c = this.props.counter;
    console.log("Rendering individual counter", c.name);
    return (
      <div>
        <span>{c.report}</span> <button onClick={() => c.increment()}>Increment</button>
      </div>
    );
  }
}

@observer
class CounterReport extends React.Component<{ report: () => string }> {
  render() {
    return <p>{this.props.report()}</p>;
  }
}

RD.render(<AppView app={new AppState()} />, document.getElementById("app"));
