// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import { ApiDocumenterCommandLine } from './cli/ApiDocumenterCommandLine';

const parser: ApiDocumenterCommandLine = new ApiDocumenterCommandLine();

parser.execute().catch(console.error); // CommandLineParser.execute() should never reject the promise
