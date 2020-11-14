type _<T> = T;
export type Merge<T> = _<{ [k in keyof T]: T[k] }>;

export type CleanWhitespace<T extends string> =
    T extends `${infer start}  ${infer end}` ? CleanWhitespace<`${start} ${end}`> :
    T extends `${infer start}\t${infer end}` ? CleanWhitespace<`${start} ${end}`> :
    T extends `${infer start}\n${infer end}` ? CleanWhitespace<`${start} ${end}`> :
    T extends ` ${infer body}` ? CleanWhitespace<body> :
    T extends `\t${infer body}` ? CleanWhitespace<body> :
    T extends `\n${infer body}` ? CleanWhitespace<body> :
    T;