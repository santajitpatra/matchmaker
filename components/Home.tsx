"use client";

import { Neo4jUser } from "@/types";
import * as React from "react";
import TinderCard from "react-tinder-card";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface HomePageClientComponentProps {
  currentUser: Neo4jUser;
  users: Neo4jUser[];
}

export const HomePageClientComponent: React.FC<
  HomePageClientComponentProps
> = ({ currentUser, users }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div>
        <div>
          <h2 className="text-4xl">
            Hello {currentUser.given_name} {currentUser.family_name}
          </h2>
        </div>
        <div className="mt-4 relative">
          {users.map((user) => (
            <TinderCard className="absolute" key={user.applicationId}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {user.given_name} {user.family_name}
                  </CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </CardHeader>
              </Card>
            </TinderCard>
          ))}
        </div>
      </div>
    </div>
  );
};
