import Minia, { render, withState } from "../src";

const list = [
  "List item 1",
  "Another list item"
];

const state = {
  foo: 55,
  showSecret: false,
};

const reducers = {
  updateFoo: state => foo => Object.assign({}, state, { foo }),
  updateShowSecret: state => () => Object.assign({}, state, { showSecret: !state.showSecret }),
};

const Secret = () => <h2>This is the secret heading!</h2>;

const App = withState(state, reducers)(({ children, title, updateFoo, updateShowSecret, foo, showSecret }) => {
  return (
    <div className="minia-app">
      <h2
        onMouseOut={e => e.target.classList.remove("red")} 
        onMouseOver={e => e.target.classList.add("red")}
      >
        Minia is a really small, minimal React clone.
      </h2>
      <p>We hope you like it. foo: {foo}</p>
      <ul>
        {list.map(x => <li>{x}</li>)}
      </ul>
      <button onClick={() => updateFoo(foo + 1)}>Test state</button>
      <button onClick={() => updateShowSecret()}>Toggle Secret</button>
      { showSecret ? (
        <Secret />
      ) : null}
    </div>
  );
});

render(<App testProp={12} />, document.getElementById("app"));
