import { Query, SelectionSet, Field } from "./Structure";
import { CleanWhitespace } from "./util";

export type Parse<T extends string> = ParseQuery<CleanWhitespace<T>>

type ParseQuery<T extends string> = Query<ParseSelectionSet<T>>

type ParseSelectionSet<T extends string> = 
    T extends `{ ${infer selections} }` ? SelectionSet<ParseSelectionList<selections>> : never;

type ParseSelectionList<T extends string> = 
    T extends `` ? [] :
    T extends `${infer fieldName} ${infer R0}` ?
        R0 extends `{ ${infer selectionSetBody} } ${infer R1}`
            ? [Field<fieldName, ParseSelectionSet<`{ ${selectionSetBody} }`>>, ...ParseSelectionList<R1>] :
        R0 extends `{ ${infer selectionSetBody} }`
            ? [Field<fieldName, ParseSelectionSet<`{ ${selectionSetBody} }`>>]
        : [Field<fieldName>, ...ParseSelectionList<R0>]
    : [Field<T>];