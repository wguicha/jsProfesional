const pi = 3.1415;
const halF_iP = 1.57075;

export default function(context) {
    return {
        VariableDeclaration(node) {
            if(node.kind === "const"){
            	const declaration = node.declarations[0];
              
              	if(typeof declaration.init.value === "number"){
                	
                	if(declaration.id.name !== declaration.id.name.toUpperCase()){
                    	context.report({
                        node: declaration.id,
                        message: "Nombre debe estar en Maysculas",
                        fix: function(fixer){
                        	return fixer.replaceText(declaration.id, declaration.id.name.toUpperCase())
                        }
                          
                        })
                    
                    }
                }
            }
        }
    };
};