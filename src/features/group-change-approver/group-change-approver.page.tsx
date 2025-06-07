import { ListCheckboxKit } from '@/shared/ui/listCheckboxKit/listCheckboxKit';
import { useBranchWithState } from './use-branch';

function groupChangeApprover() {

    const branches = useBranchWithState();

    return (
        <div className='gap-[35px] content'>
            <h1 className="text-center">Групповое изменение подписанта</h1>

            <div className="flex flex-col gap-[10px] justify-start">
                <p
                    className={`w-[200px] content-center text-left`}
                >
                    Выберите филиал:
                </p>
                <ListCheckboxKit
                    options={branches.branches}
                    update={event => branches.setBranches(event)}
                    width='500px'
                />
            </div>
        </div>
    );
}

export const Component = groupChangeApprover