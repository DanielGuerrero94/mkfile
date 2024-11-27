const getOrderedKeys = (
  template: string,
  values: Record<string, string>,
): string[] => {
  const valueKeys = Object.keys(values);
  const keys = template.matchAll(/\${"(?<key>.*?)"}/g).map((match) =>
    match.groups?.key
  );
  const orderedKeys: string[] = [];
  for (const key of keys) {
    if (!key) throw new Error("Wrong tempalte syntax");
    orderedKeys.push(key);
    if (!valueKeys.includes(key)) {
      throw new Error(`Missing keys for template you should call
type Keys = ${orderedKeys.map(v => `"${v}"`).join("|")} 
filteTemplate<Keys>(src, dest, values)
`);
    }
  }

  return orderedKeys;
};

const fileTemplate = async <T extends string>(
  src: string,
  dest: string,
  values: Record<T, string>,
) => {
  const template = await Deno.readTextFile(src);
  const keys = getOrderedKeys(template, values);

  /* Breaks on multiple keys
  const stringValues: Record<string, string> = {};
  for (const key of keys) {
    stringValues[key] = values[key as T]
  }

  const strings = template.split(/\${.*}/g);
  const string = String.raw(
    { raw: strings },
    ...Object.values(stringValues),
  );
  */
  let string = template
  for (const key of keys) {
    const regex = new RegExp(`\\$\\{"${key}"}`, 'g')
    string = string.replaceAll(regex, values[key as T])
  }
  await Deno.writeTextFile(dest, string);
  return string;
};

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const author = "Daniel Guerrero"
  const authorEmail = "daniel.622.guerrero@gmail.com"
  const packageScope = "@dannyden"  
  const packageName = "mkfile"  

  await fileTemplate("./templates/mod.tt.ts", "./deno-create/mod.ts", {});
  await fileTemplate("./templates/mod_test.tt.ts", "./deno-create/mod_test.ts", {});

  type LicenseKeys = "author" | "authorEmail"
  await fileTemplate<LicenseKeys>("./templates/LICENSE.tt.md", "./deno-create/LICENSE.md", {
    author,
    authorEmail,
  });

  type ReadmeKeys = "packageName" | "packageScope"
  await fileTemplate<ReadmeKeys>("./templates/README.tt.md", "./deno-create/README.md", {
    packageName,
    packageScope,
  });

  type DenoKeys = "packageScope" | "packageName" 
  await fileTemplate<DenoKeys>("./templates/deno.tt.json", "./deno-create/deno.json", {
    packageName,
    packageScope,
  });
}
