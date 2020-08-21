import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'jest-fetch-mock';

enzyme.configure({ adapter: new Adapter() });
fetchMock.enableMocks();
