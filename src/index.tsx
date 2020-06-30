import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import * as RD from "react-dom";

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

  @computed get count() {
    return this.counterList.length;
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
        <p>
          Total counters <Computation compute={() => this.props.app.count} />, total count{" "}
          <Computation compute={() => this.props.app.sum} />
        </p>
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
class Computation extends React.Component<{ compute: () => any }> {
  render() {
    return <>{this.props.compute()}</>;
  }
}

RD.render(<AppView app={new AppState()} />, document.getElementById("app"));
