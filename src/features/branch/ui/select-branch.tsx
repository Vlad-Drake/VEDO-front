import { SelectKit } from "@/shared/ui/selectKit";
import { SkeletonKit } from "@/shared/ui/skeleton-kit";
import { useNavigate, href } from 'react-router-dom';

export function SelectBranch({
    selectedBranchId,
    setSelectedBranchId,
    branches,
    isPending,
}: {
    selectedBranchId: number | null,
    setSelectedBranchId: (val: number | null) => void,
    branches?: {
        id: number;
        branch: string;
    }[],
    isPending: boolean,
}) {
    const navigate = useNavigate();
    const setURL = (value: string) => {
        navigate(href("/branches/:branch", { branch: value }));
    }

    return (
        <div className="flex flex-row gap-10 justify-start">
            <p
                className={`w-[200px] content-center text-left`}
            >
                Выберите филиал:
            </p>
            {branches && <SelectKit
                placeholder='Выберите филиал'
                width="500px"
                selectedId={selectedBranchId}
                updateId={(event) => {
                    const newId = Number(event)
                    setSelectedBranchId(newId);
                }}
                updateName={(event) => setURL(String(event))}
                options={(branches ?? [])}
                getValue={val => val.branch}
            />}
            {isPending && <SkeletonKit type='rect' />}
        </div>
    );
}