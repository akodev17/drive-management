import Header from "@/components/shared/Header";
import { db } from "@/lib/firebase";
import { auth } from "@clerk/nextjs/server";
import { collection, getDocs, query, where } from "firebase/firestore";
const getFolders = async (uid: string, type: "files" | "folders") => {
  let types: any[] = [];
  const q = query(
    collection(db, type),
    where("uid", "==", uid),
    where("IsArchive", "==", false)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    types.push({ id: doc.id, ...doc.data() });
  });

  return types;
};

const Home = async () => {
  const { userId } = auth();

  const folders = await getFolders(userId!, "folders");
  const files = await getFolders(userId!, "files");

  
  return (
    <>
      <div>
        <Header label={"My Drive"} isHome/>
      </div>
    </>
  );
};

export default Home;
