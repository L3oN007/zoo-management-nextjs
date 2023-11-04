import axios from 'axios';
import { ManageCertificateForm } from './components/manage-certificate-form';
import { ManageCertificateClient } from '../components/client';
import { ManageEmpCertificateClient } from '../components/viewClient';

const ManageCertificatePage = async ({ params }: { params: { cerCode: string } }) => {
  const url = process.env.NEXT_PUBLIC_API_GET_CERTIFICATE + `${params.cerCode}`;
  const viewCert= process.env.NEXT_PUBLIC_API_LOAD_CERTIFICATE || '';
  const empCertificate = process.env.NEXT_PUBLIC_API_LOAD_EMPLOYEECERTIFICATE || '';
  try {
    
    if(params.cerCode === 'view'){
      const response = await axios.get(viewCert);
      let certificate = response.data;
      return (
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageCertificateClient data={certificate} />
          </div>
        </div>
      );
    }
    if(params.cerCode === 'empCertificate'){
      const response = await axios.get(empCertificate);
      let employeeCertificate = response.data;
      return (
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageEmpCertificateClient data={employeeCertificate}  />
          </div>
        </div>
      );
    }
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
