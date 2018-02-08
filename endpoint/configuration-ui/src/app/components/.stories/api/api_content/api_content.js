/**
 * Created by apple on 16/5/9.
 */
import React from "react";
import {storiesOf, action} from "@kadira/storybook";
import {SingleApiDocComponent} from "../../../api/api_content/single_api_doc/single_api_doc";


storiesOf('APIContent', module)
    .add('singleApiDoc', () => (<SingleApiDocComponent></SingleApiDocComponent>));