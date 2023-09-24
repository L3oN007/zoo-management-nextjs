// import { BillboardForm } from "./components/billboard-form";

const ManageStaffPage = async ({ params }: { params: { staffId: string } }) => {
    const staff = await fetch(`https://648867740e2469c038fda6cc.mockapi.io/staff`).then((res) =>
        res.json()
    );

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <p>Staff Data: {JSON.stringify(staff)}</p>
                {/* <BillboardForm initialData={billboard} /> */}
            </div>
        </div>
    );
};

export default ManageStaffPage;
