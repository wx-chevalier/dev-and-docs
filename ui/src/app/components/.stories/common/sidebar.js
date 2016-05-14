/**
 * Created by apple on 16/4/25.
 */
import React from "react";
import {storiesOf, action} from "@kadira/storybook";

import {SideBarComponent} from "../../common/sidebar/sidebar";



storiesOf('SideBar', module)
    .add('sideBar', () => (
        <SideBarComponent></SideBarComponent>
    ));