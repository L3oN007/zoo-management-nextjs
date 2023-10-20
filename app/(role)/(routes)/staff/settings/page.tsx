import { useSession } from 'next-auth/react';
import { ProfileForm } from './profile-form';
import axios from '@/lib/axios';

// export default async function SettingsProfilePage() {
//   var session = useSession();
//   var url = process.env.NEXT_PUBLIC_API_GET_STAFF + `?id=${session.data?.user.employeeId}`;
//   var response = await axios.get(url);
//   let staffData = response.data;
//   return (
//     <div className="space-y-6">
//       <ProfileForm initialData={staffData} />
//     </div>
//   );
// }
const SettingsProfilePage = async () => {
  // Construct the URL using the staffId from the params object

  // var url = process.env.NEXT_PUBLIC_API_GET_STAFF;
  // var response = await axios.get(url);
  // let staffData = response.data;
  return (
    <div className="space-y-6">
      <ProfileForm initialData={null} />
    </div>
  );
};

export default SettingsProfilePage;
