import App from './App';
import { shallow } from 'enzyme'

/**
 * Factory function to create a ShallowWrapper for App component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @param {object} state - Initial state for the setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
    const wrapper = shallow(<App {...props} />);
    if (state) wrapper.setState(state);
    return wrapper;
}

/**
 * Returns ShallowWrapper containing node(s) with the given data-test value
 * @param {ShallowWrapper} wrapper - Enzyme ShallowWrapper to find within
 * @param {string} value - Value of data-test attribute for search
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, value) => wrapper.find(`[data-test='${value}']`);

it("renders without crashing", () => {
    const wrapper = setup();
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.length).toBe(1);
})

it('should render a increment button', () => {
    const wrapper = setup();
    const button = findByTestAttr(wrapper, 'increment-button');
    expect(button.length).toBe(1);
})

it('should display counter value in h1', () => {
    const wrapper = setup();
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.length).toBe(1);
})

test('counter should start with 0', () => {
    const wrapper = setup();
    const initialState = wrapper.state().counter;
    expect(initialState).toBe(0);
})

test('clicking button should increment counter display', () => {
    const counter = 7;
    const wrapper = setup(null, { counter });

    // find button and simulate click
    const button = findByTestAttr(wrapper, 'increment-button');
    button.simulate('click')
    wrapper.update();

    // find display and check value
    const counterDisplay = findByTestAttr(wrapper, 'counter-display');
    expect(counterDisplay.text()).toContain(counter + 1);
})