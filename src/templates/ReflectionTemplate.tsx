import _ from 'lodash';
import {
  ContainerReflection,
  DeclarationReflection,
  DefaultThemeRenderContext,
  JSX,
} from 'typedoc';

import { parametersFromType } from '../utils';

type Props = {
  context: DefaultThemeRenderContext,
  model: ContainerReflection,
  original: JSX.Element,
};

const ReflectionTemplate = ({ context, model, original }: Props): JSX.Element => {
  const result = _.clone(original);

  if (model instanceof DeclarationReflection && model.indexSignature) {
    // [_, _, **fragment**, _, _] => [_, _, _, _, **section**] => [h3, div, _, **HERE**]
    _.setWith(
      result,
      'children[2].children[4].children[3]',
      parametersFromType(context, model.indexSignature.type),
      _.clone,
    );
  }

  return result;
};

export default ReflectionTemplate;
