import { observable, computed, action } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import * as RD from 'react-dom';

class Counter {
  @observable name = 'A counter';
  @observable value = 1;
  @action increment() {
    this.value += 1;
  }
  @action decrement() {
    this.value -= 1;
  }
}

class AppState {
  @observable counterList: Counter[] = [];
  @action add() {
    let c = new Counter();
    this.counterList.push(c);
    c.name = 'Counter ' + this.counterList.length;
  }
  @action removeLast() {
    this.counterList.pop();
  }
}

@observer
class AppView extends React.Component<{ app: AppState }> {
  render() {
    console.log('Re-rendering app');
    return (
      <div>
        <p>Welcome to the counter app</p>
        {this.props.app.counterList.map(counter => (
          <CounterView
            key={counter.name}
            name={counter.name}
            value={counter.value}
            increment={() => counter.increment()}
          />
        ))}
        <p>
          <button onClick={() => this.props.app.add()}>Add counter</button>
          <button onClick={() => this.props.app.removeLast()}>Remove counter</button>
        </p>
      </div>
    );
  }
}

class CounterView extends React.Component<{ value: number; name: string; increment: () => void }> {
  render() {
    console.log('Rendering individual counter', this.props.name);
    return (
      <div>
        <span>{this.props.name} = </span>
        <span>{this.props.value}</span>{" "}
        <button onClick={this.props.increment}>Increment</button>
      </div>
    );
  }
}

RD.render(<AppView app={new AppState()} />, document.getElementById('app'));
