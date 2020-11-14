import { Parse } from "./Parser";
import { Field, Query, SelectionSet, Selection } from "./Structure";
import { Merge } from "./util";

export type Handle<Schema, Query extends string> = HandleQuery<
  Schema,
  Parse<Query>
>;

type HandleQuery<Schema, Node extends Query> = HandleSelectionSet<
  Schema,
  Node["selectionSet"]
>;

type HandleSelectionSet<
  Schema,
  Node extends SelectionSet
> = Node extends SelectionSet<infer selections>
  ? Merge<UnionToIntersection<UnwrapArray<HandleSelectionList<Schema, selections>>>>
  : never;

type HandleSelectionList<Schema, Node extends Selection[]> = Node extends []
  ? {}
  : {
      [Index in keyof Node]: 
        Node[Index] extends Field<any, any>
          ? HandleField<Schema, Node[Index]>
          : never
      ;
    };

type HandleField<Schema, Node extends Field<any, any>> = Node extends Field<
  infer Name,
  infer Set
>
  ? Name extends keyof Schema
    ? Set extends SelectionSet<[]>
      ? PairToObject<[Name, Schema[Name]]>
      : PairToObject<[Name, HandleSelectionSet<Schema[Name], Set>]>
    : `${Name} not found on schema`
  : never;

type PairToObject<T extends readonly [string, any]> = T extends readonly [string, any] ?
    {
        [k in T[0]]: T[1]
    }
: never

type UnwrapArray<T extends Array<any>> = T extends Array<infer U> ? U : never;

type ToUnaryFunctionUnion<U> = U extends any ? (arg: U) => void : never;
type UnionToIntersection<U> = ToUnaryFunctionUnion<U> extends (
  arg: infer I
) => void
  ? I
  : never;