// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";
import post from "./post";
import user from "./user";
import comment from "./comment";
import postedBy from "./postedBy";
// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: "default",
  types: schemaTypes.concat([post, user, comment, postedBy]),
});
