'use client';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Copy, Edit, Grid, Plus, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import axios from 'axios';
import { url } from 'inspector';
import { toast } from 'react-hot-toast';
import { AlertModal } from '@/components/modals/alert-modal';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ManageTicketClientProps {
  data: Ticket[];
}

export const ManageTicketClient: FC<ManageTicketClientProps> = ({ data }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [deletedID, setDeletedID] = useState('');
  const params = useParams();
  const urlDelete = process.env.NEXT_PUBLIC_API_DELETE_TICKET;
  const [searchTerm, setSearchTerm] = useState('');

  const statuses = [
    {
      value: '0',
      label: 'All',
      icon: CheckCircledIcon
    },
    {
      value: '1',
      label: 'Child',
      icon: CheckCircledIcon
    },
    {
      value: '2',
      label: 'Adult',
      icon: CrossCircledIcon
    }
  ];

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(urlDelete! + `${deletedID}`);
      router.refresh();
      router.push(`/admin/manage-tickets`);
      toast.success('Ticket deleted.');
    } catch (error: any) {
      toast.error('Fail to delete.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  const [selectedStatus, setSelectedStatus] = useState('All');
  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };
  // Filter the data based on the selected status
  const filteredData = data.filter((ticket) => {
    // if(selectedStatus==='0')return true;
    // return ticket.type === statuses.find(status => status.value === selectedStatus)?.label;
    const statusFilter =
      selectedStatus === 'All' || ticket.type === statuses.find((status) => status.label === selectedStatus)?.label;

    // Apply the search filter
    const searchFilter = searchTerm === '' || ticket.ticketId.toLowerCase().includes(searchTerm.toLowerCase());
    return statusFilter && searchFilter;
  });

   function currencyFormat(amount: number) {
    return (amount / 1000).toFixed(3)
}



  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Tickets (${data.length})`} description="Manage Tickets information in the zoo" />
        <Button onClick={() => router.push('/admin/manage-tickets/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <div className="flex items-center">
        <Input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by ID"
          className="mr-2 h-10 w-[150px] lg:w-[250px]"
        />
        <div className="w-[100px] ">
        <Select
          value={selectedStatus}
          onValueChange={(e) => setSelectedStatus(e.toString())}
        >
          <SelectTrigger>
            <SelectValue>{statuses.find((status) => status.value === selectedStatus)?.label}</SelectValue>
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {statuses.map((status) => (
                <SelectItem key={status.value} value={status?.label}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        </div>
      </div>

      <Separator />

      <div className="grid grid-cols-4 gap-2 ">
        {filteredData.map((ticket) => (
          <>
            <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
            <Card key={ticket.ticketId}>
              <CardHeader>
                <CardDescription>
                  <Avatar style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AvatarImage style={{ width: '50%', alignItems: 'center' }} src={ticket.image} />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                </CardDescription>
                <CardTitle>{ticket.ticketId}</CardTitle>
                <CardDescription>{ticket.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Type: <span style={{ fontWeight: 'bold', color: '#E98244' }}>{ticket.type}</span>
                </p>
                <p>
                  Unit price: <span style={{ fontWeight: 'bold', color: '#E98244' }}>{currencyFormat(ticket.unitPrice)}₫</span>
                </p>
              </CardContent>
              <CardFooter style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                <Button onClick={() => router.push(`/admin/manage-tickets/${ticket.ticketId}`)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Update
                </Button>
                <Button
                  className="ml-2"
                  onClick={() => {
                    setOpen(true);
                    setDeletedID(ticket.ticketId);
                  }}
                >
                  <Trash className="mr-2 h-4 w-4" /> Delete
                </Button>
              </CardFooter>
            </Card>
          </>
        ))}
      </div>
    </>
  );
};
