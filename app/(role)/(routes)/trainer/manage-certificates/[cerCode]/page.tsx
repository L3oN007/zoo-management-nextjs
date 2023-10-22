import axios from 'axios';
import { ManageCertificateForm } from './components/manage-certificate-form';

const ManageCertificatePage = async ({ params }: { params: { cerCode: string } }) => {
  const url = process.env.NEXT_PUBLIC_API_GET_EMPLOYEECERTIFICATE + `${params.cerCode}`;

  try {
    const response = await axios.get(url);
    let certiData = response.data;

    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageCertificateForm initialData={certiData} />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageCertificateForm initialData={null} />
        </div>
      </div>
    );
  }
};

export default ManageCertificatePage;
