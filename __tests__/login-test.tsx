import * as React from 'react';
import renderer from 'react-test-renderer';

import Login from "@/app/login";

it(`renders correctly`, () => {
    const log = renderer.create(<Login></Login>).toJSON()
    expect(log).toMatchSnapshot()
})