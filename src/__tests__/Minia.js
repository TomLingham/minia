import Minia from "..";

describe("Minia", () => {
  test("el", () => {
    expect(<div />).toEqual({
      $$typeof: Minia.$$typeof,
      type: 'div',
      props: {},
    });
  });

  test("nested el", () => {
    expect(<div><span /></div>).toEqual({
      $$typeof: Minia.$$typeof,
      type: 'div',
      props: {
        children: {
          $$typeof: Minia.$$typeof,
          type: 'span',
          props: {},
        },
      },
    });
  });

  test("nested els", () => {
    expect(
      <div>
        <span>foo</span>
        <span>bar</span>
      </div>
    ).toEqual({
      $$typeof: Minia.$$typeof,
      type: 'div',
      props: {
        children: [{
          $$typeof: Minia.$$typeof,
          type: 'span',
          props: {
            children: "foo",
          },
        }, {
          $$typeof: Minia.$$typeof,
          type: 'span',
          props: {
            children: "bar",
          },
        }],
      },
    });
  });

  test("props", () => {
    expect(<div foo="bar" baz={5} />).toEqual({
      $$typeof: Minia.$$typeof,
      type: 'div',
      props: { foo: "bar", baz: 5 },
    });
  });

  test("nested component", () => {
    const Comp = () => <span>I'm nested</span>;
    expect(<span><Comp /></span>).toEqual({
      $$typeof: Minia.$$typeof,
      type: 'span',
      props: {
        children: {
          $$typeof: Minia.$$typeof,
          type: Comp,
          props: {},
        }
      }
    });
  });
});