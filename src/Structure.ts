export type Query<Selections extends SelectionSet<any> = SelectionSet<any>> = {
  type: "Query";
  selectionSet: Selections;
};

export type SelectionSet<Selections extends Selection[] = Selection[]> = {
  type: "SelectionSet";
  selections: Selections;
};

export type Selection = Field<any, any>;

export type Field<
  Name extends string,
  Set extends SelectionSet = SelectionSet<[]>
> = {
  type: "Field";
  name: Name;
  selectionSet: Set;
};
