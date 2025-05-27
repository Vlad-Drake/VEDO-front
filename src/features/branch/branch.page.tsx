import { useState, useEffect } from 'react';
import { useLoadingPage } from '@/shared/model/loadingPage';
import { SelectRadioKit, type SelectRadioModel } from '@/shared/ui/selectRadioKit/selectRadioKit';
import { useJobTitles } from "@/shared/model/useJobTitles";

function Branch() {
    const { loadingPage, loading, error, done } = useLoadingPage();
    const [branch, setBranch] = useState<string>('');
    const [jobTitleOptions, setJobTitleOptions] = useState<SelectRadioModel[]>([]);
    const {
        jobTitles,
        data,
        isPending: isPendingJT,
        errorMessage: errorMessageJT,
    } = useJobTitles();

    useEffect(() => {
        loading();
        jobTitles({ dummy: "" });
    }, []);
    
    useEffect(() => {
        
        if(errorMessageJT) {
          console.log('get data', errorMessageJT);
    
          error(errorMessageJT);
        } else if (data) {
          setJobTitleOptions(
            data.data.map((jT, index) => ({
              id: String(index + 1),
              name: jT,
            })),
          );
          done();
        }
    }, [data, errorMessageJT]);

    const setBranchT = (value: string) => {
        setBranch(value);
    }

    return (
        <div className='gap-[35px] content'>
            <h1 className="text-center">Управление филиалами</h1>

            <div className="flex flex-row gap-10 justify-start">
                <p
                    className={`w-[200px] content-center text-left`}
                >
                    Выберите филиал:
                </p>
                <SelectRadioKit
                    placeholder='Выберите филиал'
                    width="500px"
                    selectedId={branch}
                    updateId={(event) => setBranchT(event)}
                    blured={(event) => setBranchT(event)}
                    options={jobTitleOptions ?? []}
                />
            </div>
            <div className='border-t-2 border-dashed'></div>
            <div className='flex flex-col'>
                <h2 className="text-left">Подписанты</h2>
                <div>
                    
                </div>
            </div>
        </div>
    );
}

export const Component = Branch;
