import { useState } from 'react';
import { ListCheckboxKit } from '@/shared/ui/listCheckboxKit/listCheckboxKit';
import { useJobTitles } from '@/shared/model/use-job-titles';
import { useBranchWithState } from './use-branch';
import { SelectRadioKit } from '@/shared/ui/selectRadioKit/selectRadioKit';
import { TextInputKit } from '@/shared/ui/textInputKit/textInputKit';
import { ButtonKit } from '@/shared/ui/buttonKit/buttonKit';

function groupChangeApprover() {
    const [selectedJobTitleId, setSelectedJobTitleId] = useState<number | null>(null);
    const [email, setEmail] = useState<string>('');
    const branches = useBranchWithState();
    const jobTitles = useJobTitles();

    return (
        <div className='gap-[35px] content'>
            <h1 className="text-center">Групповое изменение подписанта</h1>

            <div className="flex gap-[35px] justify-center">
                <div className="flex flex-col gap-[10px] justify-start">
                    <p
                        className={`w-[200px] content-center text-left`}
                    >
                        1. Выберите филиалы:
                    </p>
                    <ListCheckboxKit
                        options={branches.branches}
                        update={event => branches.setBranches(event)}
                        width='400px'
                        height='500px'
                    />
                </div>
                <div className="flex flex-col gap-[10px]">
                    <p
                        className={`w-[200px] content-center text-left`}
                    >
                        2. Укажите должность:
                    </p>

                    <SelectRadioKit
                        selectedId={selectedJobTitleId}
                        options={(jobTitles.jobTitles.data?.list ?? []).map(item => ({
                            id: item.id,
                            name: item.jobTitle,
                        }))}
                        updateId={event => setSelectedJobTitleId(Number(event))}
                        width='350px'
                    />

                    <p
                        className={`w-[200px] content-center text-left`}
                    >
                        3. Укажите почту:
                    </p>
                    <TextInputKit
                        value={email}
                        updateValue={(event) => setEmail(event)}
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

export const Component = groupChangeApprover