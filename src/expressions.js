//
var cAdditiveExpr = require('./expressions/arithmetic/AdditiveExpr');
var cMultiplicativeExpr = require('./expressions/arithmetic/MultiplicativeExpr');
var cUnaryExpr = require('./expressions/arithmetic/UnaryExpr');
//
var cComparisonExpr = require('./expressions/comparison/ComparisonExpr');
//
var cForExpr = require('./expressions/for/ForExpr');
//
var cIfExpr = require('./expressions/if/IfExpr');
//
var cAndExpr = require('./expressions/logical/AndExpr');
var cOrExpr = require('./expressions/logical/OrExpr');
//
var cKindTest = require('./expressions/path/tests/KindTest');
var cNameTest = require('./expressions/path/tests/NameTest');
//
var cStepExpr = require('./expressions/path/StepExpr');
var cAxisStep = require('./expressions/path/AxisStep');
var cPathExpr = require('./expressions/path/PathExpr');
//
var cContextItemExpr = require('./ContextItemExpr');
var cFilterExpr = require('./FilterExpr');
var cFunctionCall = require('./FunctionCall');
var cLiteral = require('./Literal');
var cNumericLiteral = require('./NumericLiteral');
var cParenthesizedExpr = require('./ParenthesizedExpr');
var cStringLiteral = require('./StringLiteral');
var cVarRef = require('./VarRef');
//
var cQuantifiedExpr = require('./expressions/quantified/QuantifiedExpr');
//
var cIntersectExceptExpr = require('./IntersectExceptExpr');
var cRangeExpr = require('./RangeExpr');
var cUnionExpr = require('./UnionExpr');
//
var cAtomicType = require('./AtomicType');
var cItemType = require('./ItemType');
var cSequenceType = require('./SequenceType');
var cSingleType = require('./SingleType');
//
var cCastableExpr = require('./CastableExpr');
var cCastExpr = require('./CastExpr');
var cInstanceofExpr = require('./InstanceofExpr');
var cTreatExpr = require('./TreatExpr');
//
var cExpr = require('./expressions/Expr');
//
module.exports = {
  AdditiveExpr: cAdditiveExpr,
  MultiplicativeExpr: cMultiplicativeExpr,
  UnaryExpr: cUnaryExpr,
  //
  ComparisonExpr: cComparisonExpr,
  //
  ForExpr: cForExpr,
  //
  IfExpr: cIfExpr,
  //
  AndExpr: cAndExpr,
  OrExpr: cOrExpr,
  //
  KindTest: cKindTest,
  NameTest: cNameTest,
  //
  StepExpr: cStepExpr,
  AxisStep: cAxisStep,
  PathExpr: cPathExpr,
  //
  ContextItemExpr: cContextItemExpr,
  FilterExpr: cFilterExpr,
  FunctionCall: cFunctionCall,
  Literal: cLiteral,
  NumericLiteral: cNumericLiteral,
  ParenthesizedExpr: cParenthesizedExpr,
  StringLiteral: cStringLiteral,
  VarRef: cVarRef,
  //
  QuantifiedExpr: cQuantifiedExpr,
  //
  IntersectExceptExpr: cIntersectExceptExpr,
  RangeExpr: cRangeExpr,
  UnionExpr: cUnionExpr,
  //
  AtomicType: cAtomicType,
  ItemType: cItemType,
  SequenceType: cSequenceType,
  SingleType: cSingleType,
  //
  CastableExpr: cCastableExpr,
  CastExpr: cCastExpr,
  InstanceofExpr: cInstanceofExpr,
  TreatExpr: cTreatExpr,
  //
  Expr: cExpr
};
