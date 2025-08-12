import { ButtonKit } from "@/shared/ui/button-kit";
import { TextInputKit } from "@/shared/ui/text-input-kit";
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
                onBlur={() => console.log()}
                onFocus={() => console.log()}
                error={''}
            />
            <TextInputKit
                value={form.email}
                width={'100%'}
                placeholder='login@slata.com'
                name='email'
                updateValue={e => setForm({ ...form, email: e })}
                onBlur={() => console.log()}
                onFocus={() => console.log()}
                error={''}
            />
            <ButtonKit
                type='submit'
                status='default'
                onClick={() => { }}
                width='100%'
                colorType='primary'
            >Создать</ButtonKit>
        </form>
    );
}