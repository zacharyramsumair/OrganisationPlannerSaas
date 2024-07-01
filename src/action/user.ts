"use server";

import connectMongoDB from "@/lib/mongodb";
import { User } from "@/models/user";

import { getSession } from "@/lib/getSession";


const fetchAllUsers = async () => {
  await connectMongoDB();
  const users = await User.find({});
  return users;
};


const getCurrentUser = async () => {

const session = await getSession();
// console.log("real session", session)

const user = session?.user;
if(user){

    await connectMongoDB();
    const currentUser = await User.findOne({email:session?.user?.email});
    return JSON.parse(JSON.stringify(currentUser));
}else{
    return false
}
  };

export { fetchAllUsers, getCurrentUser };
