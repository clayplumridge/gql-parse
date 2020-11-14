import { Handle } from "./Handler";
import { Parse } from "./Parser";

type TestSchema = {
  me: {
    id: string;
    firstName: string;
    lastName: string;
    birthday: {
      month: number;
      day: number;
    };
  };

  you: {
    id: string;
  };
};

type testQuery = `{
    me {
        id
    }
    you {
        id
    }
}`;

type testParse = Parse<testQuery>;
type testEval = Handle<TestSchema, testQuery>;
