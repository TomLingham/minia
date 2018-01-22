import { $$typeof } from "./Minia";

const handlers = new Map();

export const isMiniaComponent = component =>
  component && component.$$typeof === $$typeof;

export const isFunctionalComponent = component =>
  isMiniaComponent(component) && typeof component.type === "function";

export const isHtmlComponent = component =>
  isMiniaComponent(component) && typeof component.type === "string";

function miniaEventHandler(event) {
  if (!handlers.has(event.type)) return;
  handlers.get(event.type)
    .forEach(({ element, handler }) => {
      if (event.target === element) handler(event)
    })
}

const registerEventHandler = (type, element, handler) => {
  if (!handlers.has(type)) handlers.set(type, []);
  handlers.get(type).push({ element, handler});
}

const miniaEvents = new Map();
miniaEvents.set("onClick", "click");
miniaEvents.set("onMouseOver", "mouseover");
miniaEvents.set("onMouseOut", "mouseout");

export function createNode(component) {
  if (typeof component === "string" || typeof component === "number") {
    return document.createTextNode(component);
  }

  if (Array.isArray(component)) {
    const node = document.createDocumentFragment();
    for (let childComponent of component) {
      node.appendChild(createNode(childComponent));
    }
    return node;
  }

  if (isFunctionalComponent(component)) {
    const node = createNode(component.type(component.props));
    component.setNode(node);
    return node;
  }

  if (isHtmlComponent(component)) {
    const node = document.createElement(component.type);
    component.setNode(node);
    for (let [propName, propValue] of Object.entries(component.props)) {
      if (propName === "children") continue;
      if (miniaEvents.has(propName)) {
        registerEventHandler(miniaEvents.get(propName), node, propValue);
        continue;
      }
      node[propName] = propValue;
    }
    node.appendChild(createNode(component.props.children));
    return node;
  }

  return document.createDocumentFragment();
}

export function render(comp, node) {
  for (let [, eventName] of miniaEvents) {
    document.addEventListener(eventName, miniaEventHandler);
  }

  node.appendChild(createNode(comp));
}