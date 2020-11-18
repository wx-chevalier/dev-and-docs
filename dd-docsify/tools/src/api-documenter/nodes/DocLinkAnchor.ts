// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import {
  DocNode,
  DocNodeContainer,
  IDocNodeContainerParameters
} from '@microsoft/tsdoc';
import { CustomDocNodeKind } from './CustomDocNodeKind';

/**
 * Constructor parameters for {@link DocEmphasisSpan}.
 */
export interface IDocLinkAnchorParameters extends IDocNodeContainerParameters {
  id: string;
}

/**
 * Represents a span of text that is styled with CommonMark emphasis (italics), strong emphasis (boldface),
 * or both.
 */
export class DocLinkAnchor extends DocNodeContainer {
  public readonly id: string;

  public constructor(parameters: IDocLinkAnchorParameters) {
    super(parameters);
    this.id = parameters.id;
  }

  /** @override */
  public get kind(): string {
    return CustomDocNodeKind.LinkAnchor;
  }
}
