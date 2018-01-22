export const $$typeof = Symbol("minia.el");
export const $$update = Symbol("minia.update")
import { isFunctionalComponent, createNode } from "./render";

function MiniaNode(type, props) {
  this.$$typeof = $$typeof;
  this.type = type
  this.props = props;
}

MiniaNode.prototype.setNode = function(node) {
  this.node = node;
}

MiniaNode.prototype.setState = function(state) {
  this.state = state;
}

MiniaNode.prototype.getState = function(state) {
  return this.state;
}

MiniaNode.prototype.forceUpdate = function() {
  this.node.replaceWith(createNode(this));
}

MiniaNode.prototype.mergeProps = function(newProps) {
  this.props = Object.assign(this.props, newProps);
}

export const el = (type, props, ...children) => {
  props = Object.assign({ children }, props);

  return new MiniaNode(type, props);
}