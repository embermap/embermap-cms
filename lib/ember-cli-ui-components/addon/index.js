import Styled from './mixins/styled';
import StyleGroup from './lib/style-group';

let group = (args) => {
  return new StyleGroup(args);
};

export { Styled, StyleGroup, group };
