import "server-only";
import neo4j from "neo4j-driver";

// URI examples: 'neo4j://localhost', 'neo4j+s://xxx.databases.neo4j.io'
const URI = process.env.NEO4J_URI as string;
const USER = process.env.NEO4J_USERNAME as string;
const PASSWORD = process.env.NEO4J_PASSWORD as string;

export const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
