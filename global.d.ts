declare const __DEVELOPMENT__: boolean;
declare const __PRODUCTION__: boolean;

declare module "*.scss" {
    const styles: { [className: string]: string };
    export default styles;
}
