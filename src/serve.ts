import { createReadStream } from "fs";
import { stat, watch } from "fs/promises";
import { createServer } from "http";

import mime from "mime";
import { join } from "path/posix";

export function serve(root: string, port: number, fallback?: string) {
    let updated = Date.now();

    (async () => {
        const watcher = watch(root, {recursive: true});
        for await (const _ of watcher) {
            updated = Date.now();
        }
    })();

    const server = createServer(async (req, res) => {
        const url = new URL(req.url ?? "", `http://${req.headers.host}`);

        if (url.searchParams.has("lastUpdated")) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(
                JSON.stringify({
                    updated,
                })
            );
            return;
        }

        const [file, redirect] = await pathToFile(
            join(root, url.pathname),
            fallback
        );

        if (redirect) {
            res.writeHead(302, {"Location": file});
            res.end("");
            return;
        }

        if (!file) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Not found");
            return;
        }

        const input = createReadStream(file);
        input.on("open", () => {
            const mime = getMIME(file);
            res.writeHead(200, { "Content-Type": mime });
            input.pipe(res);
        });

        input.on("error", (err) => {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end(err.message);
        });
    });

    server.listen(port);
}

function getMIME(path: string): string {
    return mime.getType(path) ?? "binary/octetstream";
}

async function pathToFile(
    path: string,
    fallback?: string
): Promise<[string | undefined, boolean]> {
    try {
        const stats = await stat(path);
        if (!stats) {
            return [undefined, false];
        }
        if (stats.isDirectory()) {
            return pathToFile(join(path, "index.html"), fallback);
        }
        if (stats.isFile()) {
            return [path, false];
        }
        return [undefined, false];
    } catch (err) {
        if (path.endsWith("/index.html") && !!fallback) {
            return [fallback, true];
        }
        return [undefined, false];
    }
}
