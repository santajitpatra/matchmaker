"use server";

import { driver } from "@/db";
import { Neo4jUser } from "@/types";
import exp from "constants";

export const getUserById = async (id: string) => {
  const result = await driver.executeQuery(
    `MATCH (u: User { applicationId: $applicationId }) RETURN u`,
    {
      applicationId: id,
    }
  );
  const user = result.records.map((record) => record.get("u").properties);
  if (user.length === 0) {
    return null;
  }
  return user[0] as Neo4jUser;
};

export const createUser = async (user: Neo4jUser) => {
const { applicationId, given_name, family_name, email, picture } = user;

await driver.executeQuery(
  `CREATE (u: User {
    applicationId: $applicationId,
    given_name: $given_name,
    family_name: $family_name,
    email: $email,
    picture: $picture
  })`,
  {
    applicationId,
    given_name,
    family_name,
    email,
    picture,
  }
);
};