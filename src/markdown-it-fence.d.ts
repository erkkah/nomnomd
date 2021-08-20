/// <reference types="markdown-it"/>

declare module "markdown-it-fence" {

    interface IOptions {
        marker?: string;
        render?: markdownit["renderer"]["renderToken"];
    }

    function mdf(md: markdownit, name: string, options: IOptions): markdownit.PluginSimple;

    export = mdf;
}
