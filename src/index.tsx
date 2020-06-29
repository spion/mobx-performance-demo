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
    this.counterList.push(new Counter());
  }
  @action removeLast() {
    this.counterList.pop();
  }
}

@observer
class AppView extends React.Component<{ app: AppState }> {
  render() {
    return (
      <div>
        <p>Welcome to the counter app</p>
        {this.props.app.counterList.map(counter => (
          <CounterView
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
    return (
      <div>
        <span>Counter: {this.props.name} =</span>
        <span>{this.props.value}</span>
        <button onClick={this.props.increment}>Increment</button>
      </div>
    );
  }
}

RD.render(<AppView app={new AppState()} />, document.getElementById('app'));
