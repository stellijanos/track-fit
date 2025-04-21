export interface ApiResponse<K extends string, T> {
    message: string,
    data: {
        total?: string;
    } & {
        [key in K]: T;
    };
}
