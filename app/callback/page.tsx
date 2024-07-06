import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { createUser, getUserById } from "../neo4j.action";

export default async function CallbackPage() {
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return redirect(
      "/api/auth/login?post_login_redirect_url=http://localhost:3000/callback"
    );
  }

  const user = await getUser();

  if (!user) {
    return redirect(
      "/api/auth/login?post_login_redirect_url=http://localhost:3000/callback"
    );
  }

  // check if user is already in the database
  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    // if not, create a new user
    await createUser({
      applicationId: user.id,
      given_name: user.given_name!,
      family_name: user.family_name ?? undefined,
      email: user.email!,
      picture: user.picture ?? undefined,
    });
  }

  return redirect("/");
}
