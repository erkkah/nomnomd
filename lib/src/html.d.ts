export interface WrapOptions {
    title?: string;
    header?: string;
    footer?: string;
    themeCSS?: string;
    codeTheme?: string;
    script?: string;
}
export declare function wrapContent(content: string, options?: WrapOptions): string;
export declare const reloadScript: string;
