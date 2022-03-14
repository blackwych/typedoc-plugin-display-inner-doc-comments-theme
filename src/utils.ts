import {
  ArrayType,
  ConditionalType,
  DeclarationReflection,
  DefaultThemeRenderContext,
  IndexedAccessType,
  IntersectionType,
  JSX,
  MappedType,
  NamedTupleMember,
  OptionalType,
  PredicateType,
  QueryType,
  ReferenceType,
  ReflectionType,
  RestType,
  TupleType,
  Type,
  TypeOperatorType,
  TypeVisitor,
  UnionType,
} from 'typedoc';

const extractInnerDeclarations = (type?: Type): DeclarationReflection[] => {
  if (!type) return [];

  const extracted: DeclarationReflection[] = [];

  const visitor: TypeVisitor = {
    reflection: (t: ReflectionType) => extracted.push(t.declaration),

    conditional: (t: ConditionalType) => [
      t.checkType,
      t.extendsType,
      t.falseType,
    ].forEach((t2) => t2.visit(visitor)),

    indexedAccess: (t: IndexedAccessType) => [
      t.indexType,
      t.objectType,
    ].forEach((t2) => t2.visit(visitor)),

    mapped: (t: MappedType) => [
      t.nameType, t.parameterType, t.templateType,
    ].forEach((t2) => t2?.visit(visitor)),

    intersection: (t: IntersectionType) => t.types.forEach((t2) => t2.visit(visitor)),
    reference: (t: ReferenceType) => t.typeArguments?.forEach((t2) => t2.visit(visitor)),

    array: (t: ArrayType) => t.elementType.visit(visitor),
    optional: (t: OptionalType) => t.elementType.visit(visitor),
    predicate: (t: PredicateType) => t.targetType?.visit(visitor),
    query: (t: QueryType) => t.queryType.visit(visitor),
    rest: (t: RestType) => t.elementType.visit(visitor),
    tuple: (t: TupleType) => t.elements.forEach((t2) => t2.visit(visitor)),
    'named-tuple-member': (t: NamedTupleMember) => t.element.visit(visitor),
    typeOperator: (t: TypeOperatorType) => t.target.visit(visitor),
    union: (t: UnionType) => t.types.forEach((t2) => t2.visit(visitor)),

    'template-literal': () => {},
    inferred: () => {},
    intrinsic: () => {},
    literal: () => {},
    unknown: () => {},
  };

  type.visit(visitor);

  return extracted;
};

const parametersFromType = (
  context: DefaultThemeRenderContext,
  type?: Type,
): JSX.Children[] | false => {
  const declarations = extractInnerDeclarations(type);
  return declarations && declarations.map(context.parameter);
};

export { extractInnerDeclarations, parametersFromType };
