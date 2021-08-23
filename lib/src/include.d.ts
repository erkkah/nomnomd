import MarkdownIt from "markdown-it";
export declare type MarkdownFactory = () => MarkdownIt;
export declare function makeInclude(factory: MarkdownFactory): MarkdownIt.PluginSimple;
