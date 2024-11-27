# ${"packageName"}

[![JSR Scope](https://jsr.io/badges/${"packageScope"})](https://jsr.io/${"packageScope})
[![JSR](https://jsr.io/badges/${"packageScope"}/${"packageName"})](https://jsr.io/${"packageScope"}/${"packageName"})
[![JSR Score](https://jsr.io/badges/${"packageScope"}/${"packageName"}/score)](https://jsr.io/${"packageScope"}/${"packageName"})

# Usage

<!-- usage -->

Using it with Deno

```
curl -fsSL https://deno.land/install.sh | sh

deno run jsr:${"packageScope"}/${"packageName"}
```

Using it from PATH

```sh-session
$ ${"packageName"}
```

Using it as dependecy

```
import ${"packageName"} from "${"packageScope"}/${"packageName"}";

console.log(${"packageName"}())
```

<!-- usagestop -->

# Setup

<!-- setup -->

Globally with Deno

```sh
echo "Run without installing it"
deno run jsr:${"packageScope"}/${"packageName"}

echo "Install with permission checks"
deno install -g -n ${"packageName"} jsr:${"packageScope"}/${"packageName"}

echo "Install allowing net"
deno install -g -n ${"packageName"} --allow-net jsr:${"packageScope"}/${"packageName"}

echo "Uninstall"
deno uninstall -g ${"packageName"}
```

Locally as dependency

```sh
deno add jsr:${"packageScope"}/${"packageName"}
npx jsr add ${"packageScope"}/${"packageName"}
yarn dlx jsr add ${"packageScope"}/${"packageName"}
pnpm dlx jsr add ${"packageScope"}/${"packageName"}
bunx jsr add ${"packageScope"}/${"packageName"}
```

<!-- setupstop -->
