import {
  ContainerReflection,
  DefaultThemeRenderContext,
  DeclarationReflection,
  JSX,
  PageEvent,
  SignatureReflection,
} from 'typedoc';

import MemberDeclaration from './partials/MemberDeclaration';
import MemberSignatureBody from './partials/MemberSignatureBody';
import Parameter from './partials/Parameter';
import ReflectionTemplate from './templates/ReflectionTemplate';

type Ctor = typeof DefaultThemeRenderContext;

const decorateContext = (ctor: Ctor): Ctor => (
  class extends ctor {
    constructor(...args: ConstructorParameters<Ctor>) {
      super(...args);

      // We want to overwrite members using `this` and `super`,
      // yet they're not methods but properties.
      // So we have to overwrite them in the constructor.

      const backup = {
        memberDeclaration: this.memberDeclaration,
        memberSignatureBody: this.memberSignatureBody,
        parameter: this.parameter,
        reflectionTemplate: this.reflectionTemplate,
      };

      this.memberDeclaration = (model: DeclarationReflection): JSX.Element => {
        const original = backup.memberDeclaration(model);
        return <MemberDeclaration context={this} model={model} original={original} />;
      };

      this.memberSignatureBody = (
        signature: SignatureReflection,
        options: { hideSources?: boolean } = {},
      ): JSX.Element => {
        const original = backup.memberSignatureBody(signature, options);
        return <MemberSignatureBody context={this} signature={signature} original={original} />;
      };

      this.parameter = (model: DeclarationReflection): JSX.Element => {
        const original = backup.parameter(model);
        return <Parameter context={this} model={model} original={original} />;
      };

      this.reflectionTemplate = (pageEvent: PageEvent<ContainerReflection>): JSX.Element => {
        const original = backup.reflectionTemplate(pageEvent);
        return <ReflectionTemplate context={this} model={pageEvent.model} original={original} />;
      };
    }
  }
);

export { decorateContext }; // eslint-disable-line import/prefer-default-export
