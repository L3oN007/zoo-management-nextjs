// import { BillboardForm } from "./components/billboard-form";

const ManageStaffPage = async ({
    params
}: {
    params: { staffId: string }
}) => {

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <p>123</p>
                {/* <BillboardForm initialData={billboard} /> */}
            </div>
        </div>
    );
}

export default ManageStaffPage;