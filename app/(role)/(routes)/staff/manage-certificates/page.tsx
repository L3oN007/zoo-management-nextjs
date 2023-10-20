import React, { useState } from 'react';
import { ManageCertificateClient } from './components/client';

import axios from 'axios';
import { format, set } from 'date-fns';
import { Button } from '@/components/ui/button';
import ErrorPage from '@/app/error/page';
import agent from '@/app/api/agent';

const ManageCertificatePage = async () => {
  const certiurl = process.env.NEXT_PUBLIC_API_LOAD_CERTIFICATE;
  const empCertiUrl = process.env.NEXT_PUBLIC_API_LOAD_EMPLOYEECERTIFICATE;

  try {
    const responseCerti = await axios.get(certiurl!);
    const responseEmpCerti = await axios.get(empCertiUrl!);
    var certificates = responseCerti.data;
    var empCertificates = responseEmpCerti.data;

    if (certificates === null) {
      return (
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <p>Certificate not found.</p>
          </div>
        </div>
      );
    }

    if (empCertificates === null) {
      return (
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <p>Employee Certificate not found.</p>
          </div>
        </div>
      );
    }
    return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <ManageCertificateClient data={certificates} empCer={empCertificates} />
        </div>
      </div>
    );
  } catch (error) {
    return <ErrorPage />;
  }
};

export default ManageCertificatePage;
