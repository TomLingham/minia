import * as Minia from "./Minia";
export { render } from "./render";

export const withState = (state, reducers) => Component => props => {
  const Wrapper = p => <Component {...p} />;
  const candidate = <Wrapper />;

  candidate.setState(state);

  for (let [name, fun] of Object.entries(reducers)) {
    reducers[name] = action => {
      const nextState = fun(candidate.getState())(action);
      candidate.setState(nextState);
      candidate.mergeProps(nextState);
      candidate.forceUpdate();
    }
  }

  candidate.mergeProps(Object.assign({}, props, state, reducers));

  return candidate;
};

export default Minia;