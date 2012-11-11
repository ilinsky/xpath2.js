function cXPath2EvaluationContext() {

};

cXPath2EvaluationContext.prototype.item		= null;	// item()? context item
cXPath2EvaluationContext.prototype.position	= null;	// numeric()? context position
cXPath2EvaluationContext.prototype.size		= null;	// numeric()? context length
//
cXPath2EvaluationContext.prototype.staticContext	= null;	// XPath2StaticContext
cXPath2EvaluationContext.prototype.dynamicContext	= null;	// XPath2DynamicContext