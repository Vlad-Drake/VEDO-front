import { ButtonKit } from "@/shared/ui/buttonKit/buttonKit";
import { TextInputKit } from "@/shared/ui/textInputKit/textInputKit";
import { useState } from "react";

type RegularApproversForm = {
    pref: string,
    email: string,
}

const initialRegularApprovers = {
    pref: '',
    email: '',
}

export function RegularApproversForm({
    createRegularApprover,
}: {
    createRegularApprover: (data: {
        pref: string,
        email: string,
    }) => void,
}) {

    const [form, setForm] = useState<RegularApproversForm>(initialRegularApprovers);

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            if (form) {
                createRegularApprover({
                    pref: form.pref,
                    email: form.email
                });
                setForm(initialRegularApprovers);
            }
        }} className='flex flex-col gap-[15px]'>
            <TextInputKit
                value={form.pref}
                width={'100%'}
                placeholder='Префикс'
                updateValue={e => setForm({ ...form, pref: e })}
                blured={() => console.log()}
                focused={() => console.log()}
                error={''}
            />
            <TextInputKit
                value={form.email}
                width={'100%'}
                placeholder='login@slata.com'
                name='email'
                updateValue={e => setForm({ ...form, email: e })}
                blured={() => console.log()}
                focused={() => console.log()}
                error={''}
            />
            <ButtonKit
                type='submit'
                btnStatus='default'
                btnClick={() => { }}
                btnWidth='100%'
                btnType='primary'
                btnContent='Создать'
            />
        </form>
    );
}