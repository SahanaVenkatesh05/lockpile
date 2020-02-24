import React from 'react';
import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';
import LockerCard from '../src/components/lockerCard/lockerCard';

export default {
  title: 'Welcome',
};

export const toStorybook = () => <Welcome showApp={linkTo('Button')} />;

toStorybook.story = {
  name: 'to Storybook',
};
export const LOCKER = () => <LockerCard />;

toStorybook.story = {
  name: 'to Storybook1',
};
