import {
  chain,
  Rule,
  schematic,
  SchematicContext,
  Tree,
} from "@angular-devkit/schematics";

import { NormalSchema } from "./schemas";

export default function (schema: NormalSchema): Rule {

  return (_tree: Tree, context: SchematicContext) => {
    const moduleSchematics: Rule[] = [];

    ['src', 'app', 'api', 'config', 'page'].forEach((moduleName) => {
      if (schema.modules.includes(moduleName)) {
        moduleSchematics.push(schematic(`normal-${moduleName}`, schema));
      }
    });

    context.logger.info(moduleSchematics.length.toString());

    return chain(moduleSchematics);
  };
 
}
