import { strings } from "@angular-devkit/core";
import {
  apply,
  applyTemplates,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  Tree,
  url,
} from "@angular-devkit/schematics";

function generateFiles(schema: any): Rule {
  const path = schema.appPath + "/";       // + schema.name + "/";

  return (tree: Tree, context: SchematicContext) => {
    const templateSource = apply(url("./files"), [
      applyTemplates({
        ...strings,
        ...schema,
      }),
      move(path),
    ]);

    return chain([mergeWith(templateSource)])(tree, context);
  };
}

export default function (schema: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([generateFiles(schema)])(tree, context);
  };
}
