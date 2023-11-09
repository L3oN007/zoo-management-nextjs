'use client'
import { useSession } from 'next-auth/react';
import { ProfileForm } from './profile-form';
import axios from '@/lib/axios';

// export default async function SettingsProfilePage() {
//   var session = useSession();
//   var url = process.env.NEXT_PUBLIC_API_GET_STAFF + `?id=${session.data?.user.employeeId}`;
//   var response = await axios.get(url);
//   let empData = response.data;
//   return (
//     <div className="space-y-6">
//       <ProfileForm initialData={empData} />
//     </div>
//   );
// }
// eslint-disable-next-line @next/next/no-async-client-component
const SettingsProfilePage = async () => {
  // Construct the URL using the staffId from the params object

  const url = process.env.NEXT_PUBLIC_API_GET_STAFF;
  // const url = "http://localhost:5000/api/Employees/staff/resource-id?id="
  const session  = useSession();
  console.log("aaaaaaaaa");
  
  console.log(session.data?.user.employeeId);
  
  var response = await axios.get(url + `?id=${session.data?.user.employeeId}`);
  let empData = response.data;
  return (
    <div className="space-y-6">
      <ProfileForm initialData={empData} />
    </div>
  );
};

export default SettingsProfilePage;
