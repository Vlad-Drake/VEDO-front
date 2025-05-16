import { ButtonKit } from '@/shared/ui/buttonKit/buttonKit';
import { SelectRadioKit } from '@/shared/ui/selectRadioKit/selectRadioKit';
import { TextInputKit } from '@/shared/ui/textInputKit/textInputKit';
import { NotificationKit } from '@/shared/ui/notificationKit/notificationKit';

import { useState } from 'react';

function Home() {
    function test() {
        console.log('Hi!')
    }
    const [testInput, setTestInput] = useState('');
    return (
        <div>
            <div>Home</div>
            <ButtonKit
                btnContent={<p>Кнопка</p>}
                btnStatus='default'
                btnClick={test}
                btnType='primary'
            />
            <SelectRadioKit
                isError={false}
                selected={null}
                options={[{ id: '1', name: '1' }, { id: '2', name: '2' }]}
            />
            <TextInputKit 
                password={false}
                validate={true}
                value={testInput}
                updateValue={(value) => setTestInput(value)}
            />
            <NotificationKit
                type='error'
            >
                {'Ошибка'}
            </NotificationKit>
        </div>
        
    );
}

export const Component = Home;