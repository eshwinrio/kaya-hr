import { Decimal as GQLDecimal } from "@prisma/client/runtime/library";
import { GraphQLScalarType } from "graphql";

export const ISODate = new GraphQLScalarType<Date, string>({
  name: "ISODate",
  description: "Date in ISO format",
  parseValue(value) {
    if (value instanceof Date) {
      return value;
    }
    if (typeof value === "string") {
      return new Date(value);
    }
    return new Date(String(value));
  },
  serialize(value) {
    if (!(value instanceof Date)) {
      throw new Error(`Value is not an instance of Date: ${value}`);
    }
    return value.toISOString();
  },
  parseLiteral(ast) {
    if (ast.kind === "StringValue") {
      return new Date(ast.value);
    }
    throw new Error(`Value is not a string: ${ast.kind}`);
  },
});

export const Decimal = new GraphQLScalarType<GQLDecimal, number>({
  name: "Decimal",
  description: "Decimal scalar type",
  parseValue(value) {
    if (value instanceof GQLDecimal) {
      return value;
    }
    return new GQLDecimal(value as any);
  },
  serialize(value) {
    if (!(value instanceof GQLDecimal)) {
      throw new Error(`Value is not an instance of Decimal: ${value}`);
    }
    return (value as GQLDecimal).toNumber();
  },
  parseLiteral(ast) {
    if (ast.kind === "IntValue" || ast.kind === "FloatValue" || ast.kind === "StringValue") {
      return new GQLDecimal(ast.value);
    }
    throw new Error(`Value is not an int: ${ast.kind}`);
  },
});
