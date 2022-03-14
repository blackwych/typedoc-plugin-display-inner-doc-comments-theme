import _ from 'lodash';
import { DefaultThemeRenderContext, JSX, SignatureReflection } from 'typedoc';

import { parametersFromType } from '../utils';

type Props = {
  context: DefaultThemeRenderContext,
  signature: SignatureReflection,
  original: JSX.Element,
};

const MemberSignatureBody = ({ context, signature, original }: Props): JSX.Element => {
  const result = _.clone(original);

  if (signature.parameters && signature.parameters.length > 0) {
    signature.parameters.forEach((item, i) => {
      // [_, _, _, **fragment**, _] =>  [h4, **ul**] => [[..., **li, ...]] => [h5, _, **HERE**]
      _.setWith(
        result,
        `children[3].children[1].children[0][${i}].children[2]`,
        parametersFromType(context, item.type),
        _.clone,
      );
    });
  }

  return result;
};

export default MemberSignatureBody;
