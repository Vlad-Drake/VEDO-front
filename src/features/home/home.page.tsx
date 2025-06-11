/*import { ButtonKit } from '@/shared/ui/buttonKit/buttonKit';
import { SelectRadioKit } from '@/shared/ui/selectRadioKit/selectRadioKit';
import { TextInputKit } from '@/shared/ui/textInputKit/textInputKit';
import { NotificationKit } from '@/shared/ui/notificationKit/notificationKit';*/
import { useLoadingPage } from '@/shared/model/loadingPage';
//import { useState } from 'react';
/*import { CalendarKit } from '@/shared/ui/calendarKit/calendarKit';
import { SelectCheckboxKit } from '@/shared/ui/selectCheckboxKit/selectCheckboxKit';
import { CheckboxKit } from '@/shared/ui/checkboxKit/checkboxKit';*/

function Home() {
    const { done } = useLoadingPage();
    done();
    /*function test() {
        console.log('Hi!')
    }
    const [testInput, setTestInput] = useState('');
    const [testDate, setTestDate] = useState<Date | null>(null);
    const [testselectCheckbox] = useState([
        { id: '1', name: "t1", checked: false },
        { id: '2', name: "t2", checked: true },
        { id: '3', name: "t3", checked: false },
    ]);
    const [checkTest, setCheckTest] = useState(false);*/
    return (
        <div className='flex flex-col gap-[20px] mx-[50px]'>
            <h1 className='text-center'>ВЭДО - внутренний электронный документооборот</h1>
            <p>Документы хранящиеся в ВЭДО используются для контроля за движением товара, готовой продукции, денежных средств, отражения результатов ревизии.</p>

            {/*
            <ButtonKit
                btnContent={<p>Кнопка</p>}
                btnStatus='default'
                btnClick={test}
                btnType='primary'
            />
            <SelectRadioKit
                selectedId={null}
                options={[{ id: '1', name: '1' }, { id: '2', name: '2' }]}
            />
            <TextInputKit
                password={false}
                value={testInput}
                updateValue={(value) => setTestInput(value)}
            />
            <NotificationKit
                type='error'
            >
                {'Ошибка'}
            </NotificationKit>
            <CalendarKit
                value={testDate}
                updateValue={event => setTestDate(event)}
                placeholder='dd.mm.yyyy'
            />
            <SelectCheckboxKit
                options={testselectCheckbox}

                update = {(event) => console.log(event)}
                    />
            <CheckboxKit
                checked={checkTest}
                onClick={() => setCheckTest(prev => !prev)}
            />
            */}
        </div>

    );
}

export const Component = Home;
