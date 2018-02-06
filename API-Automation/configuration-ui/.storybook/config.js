import {configure} from "@kadira/storybook";

import { disable } from 'react-komposer';

import "antd/lib/index.css";

disable();

function loadStories() {
    require('../src/app/components/.stories/common/sidebar.js');
    require('../src/app/components/.stories/api/api_content/api_content.js');
}

configure(loadStories, module);