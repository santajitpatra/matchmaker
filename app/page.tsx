import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { getUserById, getUsersWithNoConnection } from "./neo4j.action";
import { HomePageClientComponent } from "@/components/Home";

const Home = async() => {
  const {isAuthenticated, getUser} = getKindeServerSession();

  if (!(await isAuthenticated())) {
    return redirect("/api/auth/login?post_login_redirect_url=http://localhost:3000/callback");
  }

  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login?post_login_redirect_url=http://localhost:3000/callback");
  }

  const  usersWithNoConnections = await getUsersWithNoConnection(user.id);
  const currentUser = await getUserById(user.id);

  return <main>
    {currentUser && <HomePageClientComponent currentUser={currentUser} users={usersWithNoConnections} />}
  </main>;
};

export default Home;
