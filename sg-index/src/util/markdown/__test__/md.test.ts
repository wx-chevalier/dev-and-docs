import { LinkType } from './../../../shared/types';
import {
  simpleTitle,
  titleWithYear,
  titleWithYearAndType,
  titleWithType
} from './cases';
import { extractInfoFromTitle } from '../md';

test('simpleTitle', () => {
  expect(extractInfoFromTitle(simpleTitle)).toEqual({
    year: '未知',
    title: 'I am title',
    type: LinkType.Article
  });
});

test('titleWithYear', () => {
  expect(extractInfoFromTitle(titleWithYear)).toEqual({
    year: '2017',
    title: 'I am title',
    type: LinkType.Article
  });
});

test('titleWithType', () => {
  expect(extractInfoFromTitle(titleWithType)).toEqual({
    year: '未知',
    title: 'I am title',
    type: LinkType.Book
  });
});

test('titleWithYearAndType', () => {
  expect(extractInfoFromTitle(titleWithYearAndType)).toEqual({
    year: '2017',
    title: 'I am title',
    type: LinkType.Book
  });
});
