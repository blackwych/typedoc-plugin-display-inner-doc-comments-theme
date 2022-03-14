import _ from 'lodash';
import { DeclarationReflection, DefaultThemeRenderContext, JSX } from 'typedoc';

import { extractInnerDeclarations } from '../utils';

type Props = {
  context: DefaultThemeRenderContext,
  model: DeclarationReflection,
  original: JSX.Element,
};

const MemberDeclaration = ({ context, model, original }: Props): JSX.Element => {
  const result = _.clone(original);
  const declarations = extractInnerDeclarations(model.type);

  // [div, _, _, _, **HERE**]
  _.setWith(result, 'children[4]', !!declarations.length && (
    <div class="tsd-type-declaration">
      <h4>Type declaration</h4>
      {declarations.map(context.parameter)}
    </div>
  ), _.clone);

  return result;
};

export default MemberDeclaration;
