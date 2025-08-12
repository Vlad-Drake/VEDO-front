import { ListCheckboxKit } from '@/shared/ui/listCheckboxKit/listCheckboxKit';
import { useJobTitles } from '@/shared/model/use-job-titles';
import { TextInputKit } from '@/shared/ui/text-input-kit';
import { ButtonKit } from '@/shared/ui/button-kit';
import { SelectKit } from '@/shared/ui/select-kit';
import { useGroupChangeForm } from './use-group-change-form';
import { useBranchProcess } from './use-branch-process';
import { SkeletonKit } from '@/shared/ui/skeleton-kit';

function GroupChangeApprover() {
    const jobTitles = useJobTitles();
    const branchesCache = useBranchProcess();
    const form = useGroupChangeForm(branchesCache.branches);

    return (
        <div className='gap-[35px] content'>
            <h2 className="text-center">Групповое изменение подписанта</h2>

            <div className="flex gap-[35px] justify-center">
                <div className="flex flex-col gap-[10px] justify-start">
                    <p
                        className={`w-[200px] content-center text-left`}
                    >
                        1. Выберите филиалы:
                    </p>
                    {form.branches &&
                        <ListCheckboxKit
                            options={form.branches}
                            update={event => form.setBranchesState(event)}
                            width='400px'
                            height='500px'
                            isLoading={branchesCache.isPending}
                            getId={val => val.id}
                            getValue={val => val.name}
                            getCheck={val => val.checked}
                        />}
                </div>
                <div className="flex flex-col gap-[10px]">
                    <p className={`w-[200px] content-center text-left`}>
                        2. Укажите должность:
                    </p>

                    {!jobTitles.jobTitles.isPending &&
                        <SelectKit
                            selectedId={form.selectedJobTitleId}
                            options={jobTitles.jobTitles.data?.list ?? []}
                            updateId={event => form.setSelectedJobTitleId(Number(event))}
                            width='350px'
                            getValue={val => val.jobTitle}
                            getId={val => val.id}
                        />}
                    {jobTitles.jobTitles.isPending &&
                        <SkeletonKit type='rect' />
                    }

                    <p className={`w-[200px] content-center text-left`}>
                        3. Укажите почту:
                    </p>
                    <TextInputKit
                        value={form.email}
                        updateValue={(event) => form.setEmail(event)}
                        width='350px'
                        placeholder='Укажите почту'
                    />

                    <ButtonKit
                        btnContent={'Изменить'}
                        btnStatus='default'
                        btnClick={() => console.log('edit')}
                        btnWidth='350px'
                        btnType='primary'
                    />
                </div>
            </div>

        </div>
    );
}

export const Component = GroupChangeApprover