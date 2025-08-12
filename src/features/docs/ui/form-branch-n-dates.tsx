import { ButtonKit } from "@/shared/ui/button-kit";
import { CalendarKit } from "@/shared/ui/calendar-kit/calendarKit";
import { SelectKit } from "@/shared/ui/select-kit";
import { useContext } from "react";
import { FormBranchNDatesContext } from "./form-branch-n-dates-context";

export function FormBranchNDates({

    docName,
    branches,
    isPending,
    getDocs,
    children,
}: {

    docName: string,
    branches: {
        id: number,
        branch: string,
    }[] | undefined,
    isPending: boolean,
    getDocs: (formDocs: { branchId: number, dateStart: string, dateEnd: string }) => void,
    children: React.ReactNode,
}) {

    const context = useContext(FormBranchNDatesContext);
    if (!context) {
        throw new Error('FormBranchNDatesContext without Provider');
    }
    const { selectedBranchId, setSelectedBranchId, dateStart, setDateStart, dateEnd, setDateEnd, lastBranchId, setLastBranchId } = context;

    const getDocsForm = () => {
        if (!(selectedBranchId && dateStart && dateEnd)) return;
        setLastBranchId(selectedBranchId);
        getDocs({ branchId: selectedBranchId, dateStart: String(dateStart), dateEnd: String(dateEnd) });
    }

    return (
        <>
            <div className='flex flex-col gap-[10px]'>
                <h3 className="text-left">{docName}</h3>

                <div className="flex flex-row gap-10 justify-start">
                    <p
                        className={`w-[200px] content-center text-left`}
                    >
                        Выберите филиал:
                    </p>
                    <SelectKit
                        placeholder='Выберите филиал'
                        width="500px"
                        selectedId={selectedBranchId}
                        updateId={(event) => {
                            const newId = Number(event)
                            setSelectedBranchId(newId);
                        }}
                        options={branches ?? []}
                        getValue={(val) => val.branch}
                        getId={val => val.id}
                    />
                </div>

                <div className="flex justify-between">
                    <div className="flex gap-10 justify-start">
                        <p
                            className={`w-[200px] content-center text-left`}
                        >
                            Укажите диапазон дат:
                        </p>
                        <CalendarKit
                            value={dateStart}
                            width='230px'
                            updateValue={event => setDateStart(event)}
                            placeholder='dd.mm.yyyy'
                        />
                        <CalendarKit
                            value={dateEnd}
                            width='230px'
                            updateValue={event => setDateEnd(event)}
                            placeholder='dd.mm.yyyy'
                        />
                        <ButtonKit
                            status={isPending ? 'loading' : 'default'}
                            onClick={getDocsForm}
                            colorType='primary'
                        ><p>Найти</p></ButtonKit>
                    </div>
                </div>

            </div>
            {selectedBranchId === lastBranchId && children}
        </>
    );
}