import _ from 'lodash';
import { DeclarationReflection, DefaultThemeRenderContext, JSX } from 'typedoc';

import { parametersFromType } from '../utils';

type Props = {
  context: DefaultThemeRenderContext,
  model: DeclarationReflection,
  original: JSX.Element,
};

const Parameter = ({ context, model, original }: Props): JSX.Element => {
  const result = _.clone(original);

  if (model.indexSignature) {
    // [**ul**] => [_, **fragment**, _] => [**li**] => [_, _, **HERE**]
    _.setWith(
      result,
      'children[0].children[1].children[0].children[2]',
      parametersFromType(context, model.indexSignature.type),
      _.clone,
    );
  }

  model.children?.forEach((item, i) => {
    if (!item.signatures && item.type) {
      // [**ul**] => [_, _, [..., **fragment**, ...]] => [**li**] => [h5, _, _, **HERE**]
      _.set(
        result,
        `children[0].children[2][${i}].children[0].children[3]`,
        parametersFromType(context, item.type),
      );
    }
  });

  return result;
};

export default Parameter;
