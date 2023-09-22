import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options"; 

const BASE_URL = "http://localhost:5000";
async function refreshToken(refreshToken: string) {
  const res = await fetch(BASE_URL + "/auth/refreshToken", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: refreshToken,
    }),
  });
  const data = await res.json();
  console.log({ data });

  return data.accessToken;
}

export async function AuthGetApi(url: string) {
  const session = await getServerSession(options);
  console.log("before: ", session?.user.accessToken);

  let res = await fetch(BASE_URL + url, {
    method: "GET",
    headers: {
      Authorization: `bearer ${session?.user.accessToken}`,
    },
  });

  if (res.status == 401) {
    if (session) session.user.accessToken = await refreshToken(session?.user.refreshToken ?? "");
    console.log("after: ", session?.user.accessToken);

    res = await fetch(BASE_URL + url, {
      method: "GET",
      headers: {
        Authorization: `bearer ${session?.user.accessToken}`,
      },
    });
    return await res.json();
  }

  return await res.json();
}
