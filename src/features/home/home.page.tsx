import { ButtonKit } from '@/shared/ui/buttonKit/buttonKit';
import { SelectRadioKit } from '@/shared/ui/selectRadioKit/selectRadioKit';
import { InputKit } from '@/shared/ui/inputKit/inputKit';


import { useState } from 'react';

function Home() {
    function test() {
        console.log('Hi!')
    }
    const [testInput, setTestInput] = useState('');
    return (
        <>
            <div>Home</div>
            <ButtonKit
                btnContent='Кнопка'
                btnStatus='default'
                btnClick={test}
            />
            <SelectRadioKit
                isError={false}
                selected={null}
                options={[{ id: '1', name: '1' }, { id: '2', name: '2' }]}
            />
            <InputKit 
                password={false}
                validate={true}
                value={testInput}
                updateValue={(value) => setTestInput(value)}
            />
        </>
        
    );
}

export const Component = Home;