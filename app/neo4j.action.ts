"use server";

import { driver } from "@/db";
import { Neo4jUser } from "@/types";
import exp from "constants";
import { get } from "http";

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

export const getUsersWithNoConnection = async (id: string) => {
  const result = await driver.executeQuery(
    `MATCH (cu: User { applicationId: $applicationId })
    MATCH (ou: User) WHERE NOT (cu)-[:LIKE|:DISLIKE]->(ou) AND cu <> ou RETURN ou`,
    {
      applicationId: id,
    }
  );

  const users = result.records.map((record) => record.get("ou").properties);
  return users as Neo4jUser[];
};
