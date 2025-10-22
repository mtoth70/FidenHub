import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const session = await getServerSession(authOptions);
