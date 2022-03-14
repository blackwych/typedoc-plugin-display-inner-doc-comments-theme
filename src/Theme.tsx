import { DefaultTheme, DefaultThemeRenderContext } from 'typedoc';

import { decorateContext } from './decorator';

class Theme extends DefaultTheme {
  static themeName = 'display-inner-doc-comments';

  protected context?: DefaultThemeRenderContext;

  override getRenderContext(): DefaultThemeRenderContext {
    const RenderContext = decorateContext(DefaultThemeRenderContext);
    this.context ||= new RenderContext(this, this.application.options);
    return this.context;
  }
}

export default Theme;
