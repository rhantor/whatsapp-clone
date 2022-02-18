import { useEffect, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import User from "./User";

const UsersSec = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const userRef = collection(db, "users");
    // create query object
    const q = query(userRef, where("uid", "not-in", [currentUser.uid]));
    // execute query
    const unsub = onSnapshot(q, (querySnap) => {
      let users = [];
      querySnap.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });
    return () => unsub;
  }, [currentUser.uid]);

  return (
    <div className="users">
      {users.map((user) => (
        <User key={user.uid} user={user} />
      ))}
    </div>
  );
};

export default UsersSec;
